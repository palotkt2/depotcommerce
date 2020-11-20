// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

import {
  ProductListItem_VirtualProduct_Fragment,
  ProductListItem_SimpleProduct_Fragment,
  ProductListItem_DownloadableProduct_Fragment,
  ProductListItem_BundleProduct_Fragment,
  ProductListItem_GroupedProduct_Fragment,
  ProductListItem_ConfigurableProduct_Fragment,
  ProductListItemFragmentDoc,
} from '../magento-product/ProductListItem.gql'

export const ProductListItemSimpleFragmentDoc: DocumentNode<
  ProductListItemSimpleFragment,
  unknown
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductListItemSimple' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'SimpleProduct' } },
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'ProductListItem' },
            directives: [],
          },
        ],
      },
    },
    ...ProductListItemFragmentDoc.definitions,
  ],
}
export type ProductListItemSimpleFragment = ProductListItem_SimpleProduct_Fragment