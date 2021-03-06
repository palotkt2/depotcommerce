import { Box, Link, LinkProps } from '@mui/material'
import PageLink, { LinkProps as PageLinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { extendableComponent } from '../Styles/extendableComponent'

const { classes, selectors } = extendableComponent('DesktopNavItem', ['root', 'line'] as const)

export type DesktopNavItemProps = LinkProps & Pick<PageLinkProps, 'href'>

export function DesktopNavItem(props: DesktopNavItemProps) {
  const { href, children, sx = [], ...linkProps } = props
  const active = useRouter().asPath.startsWith(href.toString())

  return (
    <PageLink href={href} passHref>
      <Link
        className={classes.root}
        variant='h6'
        color='text.primary'
        underline='none'
        {...linkProps}
        sx={[{ whiteSpace: 'nowrap', paddingTop: '6px' }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        {children}
        <Box
          component='span'
          className={classes.line}
          sx={{
            maxWidth: 40,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            height: 2,
            background: (theme) => theme.palette.primary.main,
            margin: '0 auto',
            marginTop: '6px',
            opacity: active ? 1 : 0,
          }}
        />
      </Link>
    </PageLink>
  )
}
DesktopNavItem.selectors = selectors
