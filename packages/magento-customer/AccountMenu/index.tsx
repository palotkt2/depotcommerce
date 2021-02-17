import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import AccountMenuItem from '../AccountMenuItem'
import { AccountMenuFragment } from './AccountMenu.gql'

export type AccountMenuProps = AccountMenuFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    accountMenuContainer: {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacings.md,
        marginBottom: theme.spacings.md,
      },
      marginTop: theme.spacings.lg,
      marginBottom: theme.spacings.lg,
    },
  }),
  { name: 'AccountMenu' },
)

export default function AccountMenu(props: AccountMenuProps) {
  const { reviews, orders } = props
  const hasReviews = (reviews.page_info.total_pages ?? 0) > 0
  const hasOrders = (orders?.page_info?.total_pages ?? 0) > 0
  const classes = useStyles()

  return (
    <div className={classes.accountMenuContainer}>
      <AccountMenuItem
        url='/account'
        label='Orders'
        startIconSrc='/icons/desktop_account_orders.svg'
        disabled={!hasOrders}
      />

      <AccountMenuItem
        url='/account'
        label='Personal information'
        startIconSrc='/icons/desktop_account_info.svg'
      />

      <AccountMenuItem
        url='/account'
        label='Addresses'
        startIconSrc='/icons/desktop_account_addresses.svg'
      />

      <AccountMenuItem
        url='/account'
        label='Reviews'
        startIconSrc='/icons/desktop_account_reviews.svg'
        disabled={!hasReviews}
      />

      <AccountMenuItem
        url='/account'
        label='Log out'
        startIconSrc='/icons/desktop_account_lock.svg'
      />
    </div>
  )
}
