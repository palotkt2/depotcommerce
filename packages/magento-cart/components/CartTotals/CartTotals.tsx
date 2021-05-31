import { Divider, makeStyles, Theme } from '@material-ui/core'
import { Money } from '@reachdigital/magento-store'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { CartTotalsFragment } from './CartTotals.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    costsContainer: {
      borderRadius: 4,
      background: '#FFFADD',
      paddingBottom: theme.spacings.xs,
      paddingTop: `calc(${theme.spacings.xs} - 6px)`,
      paddingLeft: theme.spacings.sm,
      paddingRight: theme.spacings.sm,
      marginTop: theme.spacings.md,
    },
    costsDivider: {
      marginTop: theme.spacings.xs,
      marginBottom: `calc(${theme.spacings.xs} - 6px)`,
    },
    costsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      ...theme.typography.body1,
      '& > div': {
        paddingTop: 6,
      },
    },
    costsGrandTotal: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
    },
    costsDiscount: {
      fontWeight: 600,
    },
    costsDiscountSub: {
      color: theme.palette.primary.mutedText,
      ...theme.typography.body2,
    },
    costsTax: {
      ...theme.typography.body2,
      fontWeight: 600,
      color: theme.palette.primary.mutedText,
      paddingTop: 0,
      '& > div': {
        paddingTop: 5,
      },
    },
  }),
  { name: 'TotalCosts' },
)

export type CartTotalsProps = CartTotalsFragment

export default function CartTotals(props: CartTotalsProps) {
  const { shipping_addresses, prices } = props
  const shippingMethod = shipping_addresses?.[0]?.selected_shipping_method
  const classes = useStyles()

  if (!prices) return null

  return (
    <AnimatedRow className={classes.costsContainer} key='total-costs'>
      <AnimatePresence initial={false}>
        {prices?.subtotal_including_tax && (
          <AnimatedRow className={classes.costsRow} key='subtotal'>
            <div>Products</div>
            <div>
              <Money {...prices.subtotal_excluding_tax} />
            </div>
          </AnimatedRow>
        )}

        {prices.discounts && prices.discounts.length > 1 && (
          <AnimatedRow className={clsx(classes.costsRow, classes.costsDiscount)} key='discount'>
            <div>Product discount</div>
            <div>
              {'- '}
              <Money
                currency={prices.subtotal_with_discount_excluding_tax?.currency}
                value={
                  (prices.subtotal_excluding_tax?.value ?? 0) -
                  (prices.subtotal_with_discount_excluding_tax?.value ?? 0)
                }
              />
            </div>
          </AnimatedRow>
        )}

        {prices?.discounts?.map((discount) => (
          <AnimatedRow className={clsx(classes.costsRow, classes.costsDiscountSub)} key='discount'>
            <div>{discount?.label}</div>
            <div>
              {discount?.amount && (
                <Money {...discount.amount} value={(discount.amount.value ?? 0) * -1} />
              )}
            </div>
          </AnimatedRow>
        ))}

        {shippingMethod && (
          <AnimatedRow className={classes.costsRow} key='shippingMethod'>
            <div>
              {shippingMethod.carrier_title} {shippingMethod.method_title}
            </div>
            <div>
              <Money {...shippingMethod.amount} />
            </div>
          </AnimatedRow>
        )}

        <AnimatedRow key='divider'>
          <Divider className={classes.costsDivider} />
        </AnimatedRow>

        {prices?.grand_total && (
          <AnimatedRow
            className={clsx(classes.costsRow, classes.costsGrandTotal)}
            key='grand_total'
          >
            <div>
              Total {(!prices?.applied_taxes || prices?.applied_taxes.length < 1) && '(excl. VAT)'}
            </div>
            <div>
              <Money
                {...(!prices?.applied_taxes || prices.applied_taxes.length < 1
                  ? prices.subtotal_with_discount_excluding_tax
                  : prices.grand_total)}
              />
            </div>
          </AnimatedRow>
        )}

        {prices.applied_taxes?.map((tax) => (
          <AnimatedRow className={clsx(classes.costsRow, classes.costsTax)} key={tax?.label ?? ''}>
            <div>Including {tax?.label}</div>
            <div>
              <Money {...tax?.amount} />
            </div>
          </AnimatedRow>
        ))}
      </AnimatePresence>
    </AnimatedRow>
  )
}