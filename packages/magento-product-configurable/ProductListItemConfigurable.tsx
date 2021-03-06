import {
  ProductListItem,
  OverlayAreaKeys,
  ProductListItemProps,
  isFilterTypeEqual,
  useProductListParamsContext,
} from '@graphcommerce/magento-product'
import React from 'react'
import { ProductListItemConfigurableFragment } from './ProductListItemConfigurable.gql'
import { SwatchList } from './SwatchList'

export type ProductListItemConfigurableActionProps = ProductListItemConfigurableFragment & {
  variant?: NonNullable<ProductListItemConfigurableFragment['variants']>[0]
}

export type ProdustListItemConfigurableProps = ProductListItemConfigurableFragment &
  ProductListItemProps & {
    Actions?: React.VFC<ProductListItemConfigurableActionProps>
    swatchLocations?: Record<OverlayAreaKeys, string[]>
  }

export function ProductListItemConfigurable(props: ProdustListItemConfigurableProps) {
  const {
    Actions,
    variants,
    configurable_options,
    children,
    swatchLocations = { bottomLeft: [], bottomRight: [], topLeft: [], topRight: [] },
    bottomLeft,
    bottomRight,
    topLeft,
    topRight,
    ...configurableProduct
  } = props
  const { params } = useProductListParamsContext()

  const options: [string, string[]][] =
    configurable_options
      ?.filter(
        (option) =>
          option?.attribute_code &&
          params.filters[option.attribute_code] &&
          isFilterTypeEqual(params.filters[option.attribute_code]),
      )
      .map((option) => {
        const filter = params.filters[option?.attribute_code ?? '']
        return [option?.attribute_code ?? '', (filter?.in as string[]) ?? []]
      }) ?? []

  const selected = {}

  options.forEach(([attr, values]) => {
    if (!selected[attr]) selected[attr] = values
  })

  const matchingVariants = variants?.filter(
    (variant) =>
      variant?.attributes?.filter(
        (attribute) =>
          selected[attribute?.code ?? ''] !== undefined &&
          selected[attribute?.code ?? ''].includes(String(attribute?.uid)),
      ).length,
  )

  const productProps = matchingVariants?.[0]?.product
    ? { ...configurableProduct, ...matchingVariants?.[0]?.product }
    : configurableProduct

  return (
    <ProductListItem
      {...productProps}
      topLeft={
        <>
          {topLeft}
          <SwatchList
            attributes={swatchLocations.topLeft}
            configurable_options={configurable_options}
          />
        </>
      }
      topRight={
        <>
          {topRight}
          <SwatchList
            attributes={swatchLocations.topRight}
            configurable_options={configurable_options}
          />
        </>
      }
      bottomLeft={
        <>
          {bottomLeft}
          <SwatchList
            attributes={swatchLocations.bottomLeft}
            configurable_options={configurable_options}
          />
        </>
      }
      bottomRight={
        <>
          {bottomRight}
          <SwatchList
            attributes={swatchLocations.bottomRight}
            configurable_options={configurable_options}
          />
        </>
      }
    >
      {Actions && <Actions {...configurableProduct} variant={matchingVariants?.[0]} />}
      {children}
    </ProductListItem>
  )
}
