import { Phase } from '@reachdigital/magento-graphql'
import { SetRequired } from 'type-fest'
import { HistoryStateQuery } from './HistoryState.gql'
import { historyStateVar } from './typePolicies'
import { UiFC } from './types'

const phases: Phase[] = ['LOADING', 'LOCATION_CHANGED', 'REGISTERED', 'FINISHED']

export const routeUi: { [index: string]: UiFC } = {}

export function afterPhase(after: Phase) {
  return phases.indexOf(historyStateVar().phase) >= phases.indexOf(after)
}

export function untillPhase(before: Phase) {
  return phases.indexOf(historyStateVar().phase) <= phases.indexOf(before)
}

export function updateHistory(incomming: Partial<HistoryStateQuery['historyState']>) {
  return historyStateVar({
    ...historyStateVar(),
    ...incomming,
  })
}

export function getPage(idx?: number) {
  const history = historyStateVar()
  const currIdx = idx ?? history.idx
  return history.pages?.[currIdx]
}

export function getFromIdx() {
  const history = historyStateVar()
  return history?.direction === 'FORWARD' ? history.idx - 1 : history.idx + 1
}

// To close all overlays in one go, we find the first page that doesn't require the background to be holded.
export function getUpPage(idx: number) {
  const history = historyStateVar()
  const upPages = history.pages
    .slice(0, idx)
    .filter((page) => routeUi[page.href]?.holdBackground === false)
  return upPages?.[upPages.length - 1]
}

export function getUpIdx(idx: number) {
  const upPage = getUpPage(idx)
  if (!upPage) return 0
  return historyStateVar().pages.indexOf(upPage)
}

export function updatePage(
  incomming: Omit<Partial<HistoryStateQuery['historyState']>, 'pages'>,
  page: Partial<HistoryStateQuery['historyState']['pages'][0]>,
  pageIdx?: number,
) {
  const actual = historyStateVar()
  const historyState = { ...actual, ...incomming }

  const idx = pageIdx ?? actual.idx
  const pages = [...historyState.pages]
  pages[idx] = {
    ...{ x: 0, y: 0 },
    ...historyState.pages[idx],
    ...page,
  }

  return historyStateVar({ ...historyState, pages })
}

export function addPage(
  incomming: Omit<Partial<HistoryStateQuery['historyState']>, 'pages'>,
  page: SetRequired<Partial<HistoryStateQuery['historyState']['pages'][0]>, 'href' | 'as'>,
  pageIdx: number,
) {
  return historyStateVar({
    ...historyStateVar(),
    ...incomming,
    pages: [...historyStateVar().pages.slice(0, pageIdx), { x: 0, y: 0, title: '', ...page }],
  })
}

export function registerRouteUi(route: string, ui: UiFC) {
  routeUi[route] = ui
}