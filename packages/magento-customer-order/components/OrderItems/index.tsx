import {
  AnimatedRow,
  SectionContainer,
  responsiveVal,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Skeleton, Button, Box, SxProps, Theme } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { UseOrderCardItemImages } from '../../hooks/useOrderCardItemImages'
import OrderItem from '../OrderItem'
import { OrderItemsFragment } from './OrderItems.gql'

export type OrderItemsProps = OrderItemsFragment & {
  loading?: boolean
  images?: UseOrderCardItemImages
  sx?: SxProps<Theme>
}

const componentName = 'OrderItems' as const
const parts = ['root', 'orderItemsInnerContainer', 'skeletonOrderItem', 'viewAllButton'] as const
const { classes } = extendableComponent(componentName, parts)

export default function OrderItems(props: OrderItemsProps) {
  const { images, items, loading, sx = [] } = props
  const [expanded, setExpanded] = useState<boolean>(false)
  const maxItemsAboveFold = 4

  if (loading) {
    return (
      <SectionContainer
        labelLeft={<Trans>Ordered items</Trans>}
        /* endLabel='SHIPPED'*/
        className={classes.root}
        sx={[
          (theme) => ({
            marginTop: theme.spacings.md,
            marginBottom: theme.spacings.md,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          className={classes.orderItemsInnerContainer}
          sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.divider}` })}
        >
          <Box
            className={classes.skeletonOrderItem}
            sx={() => ({
              marginTop: theme.spacings.xxs,
              marginBottom: theme.spacings.xxs,
            })}
          >
            <Skeleton height={responsiveVal(70, 125)} />
          </Box>
          <Box
            className={classes.skeletonOrderItem}
            sx={() => ({
              marginTop: theme.spacings.xxs,
              marginBottom: theme.spacings.xxs,
            })}
          >
            <Skeleton height={responsiveVal(70, 125)} />
          </Box>
          <Box
            className={classes.skeletonOrderItem}
            sx={() => ({
              marginTop: theme.spacings.xxs,
              marginBottom: theme.spacings.xxs,
            })}
          >
            <Skeleton height={responsiveVal(70, 125)} />
          </Box>
        </Box>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer
      labelLeft={<Trans>Ordered items</Trans>}
      /* endLabel='SHIPPED'*/
      className={classes.root}
      sx={[
        (theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.md,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className={classes.orderItemsInnerContainer}
        sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.divider}` })}
      >
        <AnimatePresence initial={false}>
          {items?.slice(0, maxItemsAboveFold).map((orderItem) => (
            <AnimatedRow key={`orderItem-${orderItem?.id}`}>
              {orderItem && (
                <OrderItem {...orderItem} {...images?.[orderItem?.product_url_key ?? '']} />
              )}
            </AnimatedRow>
          ))}

          {expanded &&
            items
              ?.slice(maxItemsAboveFold, items?.length)
              .map((orderItem) => (
                <AnimatedRow key={`orderItem-${orderItem?.id}`}>
                  {orderItem && (
                    <OrderItem {...orderItem} {...images?.[orderItem?.product_url_key ?? '']} />
                  )}
                </AnimatedRow>
              ))}
        </AnimatePresence>
      </Box>

      {items && maxItemsAboveFold < items?.length && (
        <Box
          className={classes.viewAllButton}
          sx={(theme) => ({
            margin: `${theme.spacings.xs} auto 0 auto`,
            textAlign: 'center',
            '& a': { padding: 8 },
          })}
        >
          <Button variant='text' color='primary' onClick={() => setExpanded(!expanded)}>
            {expanded ? <Trans>View less items</Trans> : <Trans>View all items</Trans>}
          </Button>
        </Box>
      )}
    </SectionContainer>
  )
}
