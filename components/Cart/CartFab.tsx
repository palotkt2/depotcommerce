import { Badge, Fab, NoSsr } from '@material-ui/core'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import useNavigationSection from 'components/useNavigationSection'
import { useCartIdQuery, useGuestCartQuery } from 'generated/apollo'
import React from 'react'

export default function CartFab() {
  const { isInSection, toggleSection } = useNavigationSection('/cart')
  const { data: cartIdData } = useCartIdQuery()
  const { data: cartData } = useGuestCartQuery({
    variables: { cartId: cartIdData?.cartId || '' },
    fetchPolicy: 'cache-only',
  })

  const fab = (
    <Fab
      aria-label={isInSection ? 'Close Cart' : 'Open Cart'}
      size='medium'
      onClick={toggleSection}
    >
      <CartIcon fontSize='small' />
    </Fab>
  )

  return (
    <NoSsr fallback={fab}>
      <Badge
        badgeContent={cartData?.cart?.total_quantity || 0}
        color='primary'
        overlap='circle'
        variant='dot'
      >
        {fab}
      </Badge>
    </NoSsr>
  )
}
