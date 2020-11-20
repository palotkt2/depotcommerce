// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const ShippingAddressFormDocument: DocumentNode<
  ShippingAddressFormMutation,
  ShippingAddressFormMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ShippingAddressForm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CartAddressInput' } },
          },
          directives: [],
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'customerNote' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          defaultValue: { kind: 'StringValue', value: 'joi', block: false },
          directives: [],
        },
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'setShippingAddressesOnCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'cart_id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'shipping_addresses' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'address' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'address' },
                                },
                              },
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'customer_notes' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'customerNote' },
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cart' },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                        arguments: [],
                        directives: [],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shipping_addresses' },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'firstname' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastname' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'company' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'postcode' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'street' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'code' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'region' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'code' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'region_id' },
                                    arguments: [],
                                    directives: [],
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'telephone' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customer_notes' },
                              arguments: [],
                              directives: [],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'selected_shipping_method' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'method_title' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'method_code' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'carrier_title' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'carrier_code' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'amount' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'currency' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'value' },
                                          arguments: [],
                                          directives: [],
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'available_shipping_methods' },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'amount' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'currency' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'value' },
                                          arguments: [],
                                          directives: [],
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'available' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'carrier_code' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'carrier_title' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'error_message' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'method_code' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'method_title' },
                                    arguments: [],
                                    directives: [],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'price_excl_tax' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'currency' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'value' },
                                          arguments: [],
                                          directives: [],
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'price_incl_tax' },
                                    arguments: [],
                                    directives: [],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'currency' },
                                          arguments: [],
                                          directives: [],
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'value' },
                                          arguments: [],
                                          directives: [],
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
  ],
}
export type ShippingAddressFormMutationVariables = Types.Exact<{
  cartId: Types.Scalars['String']
  address: Types.CartAddressInput
  customerNote?: Types.Maybe<Types.Scalars['String']>
}>

export type ShippingAddressFormMutation = {
  setShippingAddressesOnCart?: Types.Maybe<{
    cart: { __typename: 'Cart' } & Pick<Types.Cart, 'id'> & {
        shipping_addresses: Array<
          Types.Maybe<
            Pick<
              Types.ShippingCartAddress,
              | 'firstname'
              | 'lastname'
              | 'company'
              | 'city'
              | 'postcode'
              | 'street'
              | 'telephone'
              | 'customer_notes'
            > & {
              country: Pick<Types.CartAddressCountry, 'code' | 'label'>
              region?: Types.Maybe<Pick<Types.CartAddressRegion, 'code' | 'label' | 'region_id'>>
              selected_shipping_method?: Types.Maybe<
                Pick<
                  Types.SelectedShippingMethod,
                  'method_title' | 'method_code' | 'carrier_title' | 'carrier_code'
                > & { amount: Pick<Types.Money, 'currency' | 'value'> }
              >
              available_shipping_methods?: Types.Maybe<
                Array<
                  Types.Maybe<
                    Pick<
                      Types.AvailableShippingMethod,
                      | 'available'
                      | 'carrier_code'
                      | 'carrier_title'
                      | 'error_message'
                      | 'method_code'
                      | 'method_title'
                    > & {
                      amount: Pick<Types.Money, 'currency' | 'value'>
                      price_excl_tax: Pick<Types.Money, 'currency' | 'value'>
                      price_incl_tax: Pick<Types.Money, 'currency' | 'value'>
                    }
                  >
                >
              >
            }
          >
        >
      }
  }>
}