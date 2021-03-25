import { useMutation, useQuery } from '@apollo/client'
import { CircularProgress, TextField } from '@material-ui/core'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import SignInFormInline from '@reachdigital/magento-customer/SignInFormInline'
import useFormIsEmailAvailable from '@reachdigital/magento-customer/useFormIsEmailAvailable'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { emailPattern } from '@reachdigital/react-hook-form/validationPatterns'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { SetGuestEmailOnCartDocument } from './SetGuestEmailOnCart.gql'

export default function EmailForm() {
  const formClasses = useFormStyles()
  const [expand, setExpand] = useState(false)

  const { data: cartData } = useQuery(ClientCartDocument)
  const [setGuestEmailOnCart] = useMutation(SetGuestEmailOnCartDocument)
  const { mode, form, submit } = useFormIsEmailAvailable({ email: cartData?.cart?.email })
  const { formState, errors, register, required, watch, error, getValues } = form
  const { data: tokenData } = useQuery(CustomerTokenDocument)

  useEffect(() => {
    if (!cartData?.cart?.id) return

    // Customer isn't logged in, but we do have a valid email
    if (mode === 'signin' || mode === 'signup') {
      const { email } = getValues(['email'])
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      setGuestEmailOnCart({ variables: { email, cartId: cartData.cart.id } })
    }
  }, [mode, getValues, cartData?.cart?.id, setGuestEmailOnCart])

  let endAdornment: React.ReactNode = null

  if (mode === 'signin') {
    endAdornment = (
      <Button color='secondary' style={{ whiteSpace: 'nowrap' }} onClick={() => setExpand(!expand)}>
        {expand ? 'Close' : 'Sign In'}
      </Button>
    )
  }
  // if (mode === 'signup') {
  //   endAdornment = (
  //     <Button color='secondary' style={{ whiteSpace: 'nowrap' }} onClick={() => setExpand(!expand)}>
  //       {expand ? 'Close' : 'Sign Up'}
  //     </Button>
  //   )
  // }
  if (formState.isSubmitting) endAdornment = <CircularProgress />

  return (
    <div className={clsx(formClasses.form, formClasses.formContained)}>
      <AnimatePresence initial={false}>
        <AnimatedRow key='emailform'>
          <form noValidate onSubmit={submit}>
            <div className={formClasses.formRow}>
              <TextField
                variant='outlined'
                type='text'
                error={formState.isSubmitted && !!errors.email}
                helperText={formState.isSubmitted && errors.email?.message}
                id='email'
                name='email'
                label='Email'
                required={required.email}
                inputRef={register({
                  required: required.email,
                  pattern: { value: emailPattern, message: '' },
                })}
                InputProps={{ endAdornment, readOnly: mode === 'signedin' }}
              />
            </div>
            <ApolloErrorAlert error={error} />
          </form>
        </AnimatedRow>

        {mode === 'signin' && expand && (
          <AnimatedRow key='signin'>
            <SignInFormInline email={watch('email')} />
          </AnimatedRow>
        )}

        {/* {mode === 'signup' && (
          <AnimatedRow key='signup'>
            <>nog niks</>
          </AnimatedRow>
        )} */}

        {!tokenData?.customerToken && (
          <AnimatedRow key='helper-list'>
            <ul className={formClasses.helperList} key='steps'>
              <li>E-mail address of existing customers will be recognized, sign in is optional.</li>
              <li>Fill in password fields to create an account.</li>
              <li>Leave passwords fields empty to order as guest.</li>
            </ul>
          </AnimatedRow>
        )}
      </AnimatePresence>
    </div>
  )
}
