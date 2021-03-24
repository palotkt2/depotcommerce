// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

import {
  ProductListItemSimpleFragment,
  ProductListItemSimpleFragmentDoc,
} from '../magento-product-simple/ProductListItemSimple.gql'
import {
  ProductListItemVirtualFragment,
  ProductListItemVirtualFragmentDoc,
} from '../magento-product-virtual/ProductListItemVirtual.gql'
import {
  ProductListItemFragmentDoc,
  ProductListItem_VirtualProduct_Fragment,
  ProductListItem_SimpleProduct_Fragment,
  ProductListItem_DownloadableProduct_Fragment,
  ProductListItem_BundleProduct_Fragment,
  ProductListItem_GroupedProduct_Fragment,
  ProductListItem_ConfigurableProduct_Fragment,
} from '../magento-product/ProductListItem/ProductListItem.gql'

import {
  ProductWeightFragmentDoc,
  ProductWeight_SimpleProduct_Fragment,
  ProductWeight_BundleProduct_Fragment,
  ProductWeight_GroupedProduct_Fragment,
  ProductWeight_ConfigurableProduct_Fragment,
} from '../magento-product/ProductWeight/ProductWeight.gql'

export const ProductPageGroupedQueryFragmentDoc: DocumentNode<
  ProductPageGroupedQueryFragment,
  unknown
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductPageGroupedQueryFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Query' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'typeProducts' },
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'url_key' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'urlKey' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'GroupedProduct' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ProductWeight' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'items' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'qty' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'product' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: '__typename' },
                                        },
                                        {
                                          kind: 'FragmentSpread',
                                          name: { kind: 'Name', value: 'ProductListItem' },
                                        },
                                        {
                                          kind: 'FragmentSpread',
                                          name: { kind: 'Name', value: 'ProductListItemSimple' },
                                        },
                                        {
                                          kind: 'FragmentSpread',
                                          name: { kind: 'Name', value: 'ProductListItemVirtual' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ProductWeightFragmentDoc.definitions,
    ...ProductListItemFragmentDoc.definitions,
    ...ProductListItemSimpleFragmentDoc.definitions,
    ...ProductListItemVirtualFragmentDoc.definitions,
  ],
}
export type ProductPageGroupedQueryFragment = {
  typeProducts?: Types.Maybe<{
    items?: Types.Maybe<
      Array<
        Types.Maybe<
          { __typename: 'GroupedProduct' } & {
            items?: Types.Maybe<
              Array<
                Types.Maybe<
                  Pick<Types.GroupedProductItem, 'position' | 'qty'> & {
                    product?: Types.Maybe<
                      | ({ __typename: 'VirtualProduct' } & Pick<Types.VirtualProduct, 'uid'> &
                          ProductListItem_VirtualProduct_Fragment &
                          ProductListItemVirtualFragment)
                      | ({ __typename: 'SimpleProduct' } & Pick<Types.SimpleProduct, 'uid'> &
                          ProductListItem_SimpleProduct_Fragment &
                          ProductListItemSimpleFragment)
                      | ({ __typename: 'DownloadableProduct' } & Pick<
                          Types.DownloadableProduct,
                          'uid'
                        > &
                          ProductListItem_DownloadableProduct_Fragment)
                      | ({ __typename: 'BundleProduct' } & Pick<Types.BundleProduct, 'uid'> &
                          ProductListItem_BundleProduct_Fragment)
                      | ({ __typename: 'GroupedProduct' } & Pick<Types.GroupedProduct, 'uid'> &
                          ProductListItem_GroupedProduct_Fragment)
                      | ({ __typename: 'ConfigurableProduct' } & Pick<
                          Types.ConfigurableProduct,
                          'uid'
                        > &
                          ProductListItem_ConfigurableProduct_Fragment)
                    >
                  }
                >
              >
            >
          } & ProductWeight_GroupedProduct_Fragment
        >
      >
    >
  }>
}