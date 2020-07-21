import React from 'react'
import ProductListItem from 'components/ProductListItems/ProductListItem'
import AddSimpleProductToCart from './AddSimpleProductToCart'

export default function ProductListItemSimple(props: GQLProductListItemSimpleFragment) {
  const { sku } = props
  return (
    <ProductListItem {...props}>
      <AddSimpleProductToCart sku={sku} />
    </ProductListItem>
  )
}
