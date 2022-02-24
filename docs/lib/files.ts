import fs from 'fs'
import path from 'path'
import { toVFile as vfile } from 'to-vfile'
import { matter } from 'vfile-matter'

export type MatterFields = {
  menu?: string
  order?: string
  metaTitle?: string
  metaDescription?: string
}

type BaseFields = {
  type: 'folder' | 'file'
  path: string
  name: string
  childNodes?: FileOrFolderNode[]
  matter?: MatterFields
}

export type FolderNode = BaseFields & { type?: 'folder' }
export type FileNode = BaseFields & { type?: 'file'; url: string; matter: MatterFields }

export type FileOrFolderNode = FolderNode | FileNode

function toUrl(p: string) {
  let url = p.replace('.mdx', '')
  url = url.replace('.md', '')
  url = url.endsWith('/') ? url.slice(0, -1) : url
  return url
}

async function dirTree(dir: string, root: string): Promise<FileOrFolderNode> {
  const stats = await fs.promises.lstat(dir)

  let name = path.basename(dir)
  name = name.replace('.mdx', '')
  name = name.replace('.md', '')
  name = name.replace(/-/g, ' ').replace(/^./, (x) => x.toUpperCase())

  const filePath = path.relative(root, dir)

  const info: Partial<FileOrFolderNode> = { path: filePath, name }

  if (stats.isDirectory()) {
    info.type = 'folder'
    info.childNodes = await Promise.all(
      (await fs.promises.readdir(dir)).map((child) => dirTree(`${dir}/${child}`, root)),
    )
  } else {
    info.type = 'file'
  }

  if (info.type === 'file') {
    info.url = toUrl(path.relative(root, dir))
    info.matter = matter(await vfile.read(dir)).data.matter as Record<string, string>
  }

  return info as FileOrFolderNode
}

// Replace the path of the parent with the path of the child having index.mdx as name and remove from children.
// Do this recursively for each child.
// Remove type from tree
function hoistIndex(tree: FileOrFolderNode): FileOrFolderNode {
  let newTree: FileOrFolderNode = tree

  if (newTree.type === 'folder') {
    const index = newTree.childNodes?.find(
      (child) =>
        child.path.endsWith('readme.mdx') ||
        (child.path.endsWith('readme.md') && child.type === 'file'),
    ) as FileNode | undefined

    if (index) {
      newTree = { ...index, name: tree.name, url: index.url.slice(0, -7) }
      newTree.childNodes = tree.childNodes?.filter((child) => child !== index)

      const order = index.matter?.order?.split(',').map((x) => x.trim())
      if (order) {
        newTree.childNodes = newTree.childNodes?.sort((a, b) => {
          const aPath = toUrl(a.path.split('/').pop() as string)
          const bPath = toUrl(b.path.split('/').pop() as string)
          return order.indexOf(aPath) === -1 ? 1 : order.indexOf(aPath) - order.indexOf(bPath)
        })
      }

      newTree.childNodes = newTree.childNodes?.map((child) => hoistIndex(child))
    }
  }
  return newTree
}

export async function getDirectoryTree(dir: string): Promise<false | FileNode> {
  const absDir = path.join(process.cwd(), dir)

  const tree = await dirTree(absDir, absDir)

  return hoistIndex(tree) as FileNode
}

export async function getDirectoryPaths(dir: string) {
  const menuData = await getDirectoryTree(dir)

  const paths: string[] = []
  const addPathsFromTree = (tree: FileOrFolderNode) => {
    if (tree.type === 'file') paths.push(tree.url)

    if (tree.childNodes?.length) {
      tree.childNodes.forEach((child) => addPathsFromTree(child))
    }
  }
  if (menuData) addPathsFromTree(menuData)

  return paths
}

/**
 * Recursively traverse the tree and return the aggregated path of of each node.
 *
 * Each URL segment should reference a path (except for the readme.md/readme.mdx file)
 */
export function urlToPath(url: string[], node: FileOrFolderNode): string | false {
  if (node.childNodes?.length) {
    const child = node.childNodes?.reduce<string | false>((prev, curr) => {
      if (prev) return prev
      const childPath = urlToPath(url, curr)
      return childPath ?? prev
    }, false)

    if (child) return child
  }

  if (node.type === 'file' && node.url === url.join('/')) return node.path

  return false
}

/** Get the contens of the requested file. */
export function getFileContents(dir: string, filePath: string) {
  const absDir = path.join(process.cwd(), dir, filePath)
  try {
    return fs.promises.readFile(absDir, 'utf8')
  } catch (e) {
    return false
  }
}

/**
 * Recursively traverse the tree and return the aggregated path of of each node.
 *
 * Each URL segment should reference a path (except for the readme.md/readme.mdx file)
 */
export function findByUrl(url: string[], node: FileOrFolderNode): FileNode | false {
  if (node.childNodes?.length) {
    const child = node.childNodes?.reduce<FileNode | false>((prev, curr) => {
      if (prev) return prev
      const childPath = findByUrl(url, curr)
      return childPath ?? prev
    }, false)

    if (child) return child
  }

  if (node.type === 'file' && node.url === url.join('/')) return node

  return false
}
