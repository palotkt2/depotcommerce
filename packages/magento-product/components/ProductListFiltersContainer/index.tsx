import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import {
  iconChevronLeft,
  iconChevronRight,
  responsiveVal,
  SvgIcon,
  useScrollY,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Box, styled, SxProps, Theme } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

const MotionDiv = styled(m.div)({})

export type ProductListFiltersContainerProps = { children: React.ReactNode; sx?: SxProps<Theme> }

type OwnerState = {
  isSticky: boolean
}
const name = 'ProductListFiltersContainer' as const
const parts = [
  'wrapper',
  'container',
  'shadow',
  'containerSticky',
  'scroller',
  'scrollerSticky',
  'sliderPrev',
  'sliderNext',
] as const

const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export default function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children } = props
  const scrollY = useScrollY()

  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<number>(100)
  const [spacing, setSpacing] = useState<number>(20)

  const scrollHalfway = startPosition + spacing

  const wrapperRef = useRef<HTMLDivElement>(null)
  const classes = withState({ isSticky })

  // Measure the sizing of the wrapping container
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (window.scrollY > 100) return
      const offset = wrapperRef.current?.getBoundingClientRect()?.top ?? 0
      const elemHeigh = entry.contentRect.height
      const nextOffset =
        (
          wrapperRef.current?.parentElement?.nextElementSibling as HTMLElement | null
        )?.getBoundingClientRect()?.top ?? 0
      const modifier = 5

      setSpacing((nextOffset - elemHeigh - offset + 20) * modifier)
      setStartPosition(offset)
    })
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onCheckStickyChange = (v: number) => {
      if (isSticky && v <= scrollHalfway) {
        setIsSticky(false)
      }
      if (!isSticky && v > scrollHalfway) {
        setIsSticky(true)
      }
    }
    onCheckStickyChange(scrollY.get())
    return scrollY.onChange(onCheckStickyChange)
  }, [isSticky, scrollHalfway, scrollY])

  const opacity = useTransform(scrollY, [startPosition, startPosition + spacing], [0, 1])

  return (
    <MotionDiv
      className={classes.wrapper}
      ref={wrapperRef}
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        height: responsiveVal(44, 52),
        marginBottom: theme.spacings.sm,
        position: 'sticky',
        top: theme.page.vertical,
        zIndex: 9,
        margin: '0 auto',
        maxWidth: `calc(100% - 96px - ${theme.spacings.sm} * 2)`,
        [theme.breakpoints.down('md')]: {
          textAlign: 'center',
          maxWidth: 'unset',
          margin: `0 calc(${theme.page.horizontal} * -1)`,
        },
      })}
    >
      <ScrollerProvider scrollSnapAlign='none'>
        <ScrollerButton
          direction='left'
          className={classes.sliderPrev}
          size='small'
          sx={{ position: 'absolute', top: 2, left: 2, zIndex: 10 }}
        >
          <SvgIcon src={iconChevronLeft} />
        </ScrollerButton>
        <Box
          className={classes.container}
          sx={(theme) => ({
            position: 'relative',
            maxWidth: '100%',
            padding: '6px',
            paddingLeft: 0,
            paddingRight: 0,
            [theme.breakpoints.up('md')]: {
              background: theme.palette.background.default,
              borderRadius: '99em',
            },
          })}
        >
          <Scroller
            className={classes.scroller}
            hideScrollbar
            sx={(theme) => ({
              paddingLeft: theme.page.horizontal,
              paddingRight: theme.page.horizontal,
              paddingBottom: 1,
              [theme.breakpoints.up('md')]: {
                borderRadius: '99em',
                paddingLeft: '6px',
                paddingRight: '6px',
              },
              columnGap: '6px',
              gridAutoColumns: 'min-content',
            })}
          >
            {children}
          </Scroller>
          <MotionDiv
            className={classes.shadow}
            style={{ opacity }}
            sx={(theme) => ({
              pointerEvents: 'none',
              zindex: '-1',
              borderRadius: '99em',
              position: 'absolute',
              height: '100%',
              width: '100%',
              top: 0,
              boxShadow: theme.shadows[6],
              [theme.breakpoints.down('md')]: {
                boxShadow: 'none !important',
              },
            })}
          />
        </Box>
        <ScrollerButton
          direction='right'
          className={classes.sliderNext}
          size='small'
          sx={{ position: 'absolute', top: 2, right: 2, zIndex: 10 }}
        >
          <SvgIcon src={iconChevronRight} />
        </ScrollerButton>
      </ScrollerProvider>
    </MotionDiv>
  )
}
