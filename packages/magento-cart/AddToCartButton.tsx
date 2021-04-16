import { TypedDocumentNode, useQuery } from '@apollo/client'
import Checkmark from '@material-ui/icons/Check'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { ProductInterface } from '@reachdigital/magento-graphql'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import MessageSnackbar from '@reachdigital/next-ui/Snackbar/MessageSnackbar'
import { DeepPartial, UnpackNestedValue, useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
import useRequestCartId from './useRequestCartId'

export default function AddToCartButton<Q, V extends { cartId: string; [index: string]: unknown }>(
  props: Pick<ProductInterface, 'name'> & {
    mutation: TypedDocumentNode<Q, V>
    variables: Omit<V, 'cartId'>
    name: string
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, mutation, variables, ...buttonProps } = props

  const requestCartId = useRequestCartId()
  const form = useFormGqlMutation<Q, V>(mutation, {
    defaultValues: { ...variables } as UnpackNestedValue<DeepPartial<V>>,
    onBeforeSubmit: async (vars) => ({ ...vars, cartId: await requestCartId() }),
  })
  const { handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  return (
    <form onSubmit={submitHandler} noValidate>
      <Button
        type='submit'
        loading={formState.isSubmitting}
        color='primary'
        variant='contained'
        {...buttonProps}
      >
        Add to Cart
      </Button>

      <ApolloErrorAlert error={error} />

      <MessageSnackbar
        open={formState.isSubmitSuccessful && !error?.message}
        variant='pill'
        color='default'
        action={
          <PageLink href='/cart'>
            <Button
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={
                <PictureResponsiveNext
                  alt='desktop_chevron_right'
                  width={28}
                  height={28}
                  src='/icons/desktop_chevron_right_white.svg'
                  type='image/svg+xml'
                />
              }
            >
              View shopping cart
            </Button>
          </PageLink>
        }
      >
        <>
          <Checkmark />
          <strong>{name}</strong>&nbsp;has been added to your shopping cart!
        </>
      </MessageSnackbar>
    </form>
  )
}
