import { useQuery } from '@apollo/client'
import { Button, Link, makeStyles, Theme } from '@material-ui/core'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import SignInFormInline from '@reachdigital/magento-customer/SignInFormInline'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import GuestEmailForm from './GuestEmailForm'

const useStyles = makeStyles((theme: Theme) => ({
  forgotPass: {
    color: theme.palette.secondary.main,
  },
}))

export default function EmailForm() {
  const [expand, setExpand] = useState(false)
  const classes = useFormStyles()
  const localClasses = useStyles()
  const { data: cartQuery } = useQuery(ClientCartDocument)
  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const { data: customerQuery } = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })
  const { data: emailQuery } = useQuery(IsEmailAvailableDocument, {
    fetchPolicy: 'cache-only',
    variables: { email: cartQuery?.cart?.email ?? '' },
  })

  const isCustomer = tokenQuery?.customerToken
  const canSignIn =
    Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid) ||
    emailQuery?.isEmailAvailable?.is_email_available === false

  return (
    <>
      {tokenQuery?.customerToken?.valid || (
        <AnimatedRow className={clsx(classes.form, classes.formContained)}>
          <AnimatePresence initial={false} key='GuestAndSignInForm'>
            {!isCustomer && (
              <AnimatedRow key='guest-email-form'>
                <div className={classes.formRow}>
                  <GuestEmailForm
                    key='GuestEmailForm'
                    signInAdornment={
                      <Button
                        color='secondary'
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => setExpand(!expand)}
                      >
                        {expand ? 'Close' : 'Sign In'}
                      </Button>
                    }
                  />
                </div>
              </AnimatedRow>
            )}
            {!isCustomer && expand && <AnimatedRow key='sign-up' />}
            {canSignIn && expand && (
              <AnimatedRow key='sign-in'>
                <div className={classes.formRow}>
                  <SignInFormInline email={cartQuery?.cart?.email ?? ''} />
                </div>
                <PageLink href='/account/forgot-password' key='forgot-password'>
                  <Link className={localClasses.forgotPass}>Forgot password?</Link>
                </PageLink>
              </AnimatedRow>
            )}

            <ul className={classes.steps} key='steps'>
              <li>E-mail address of existing customers will be recognized, sign in is optional.</li>
              <li>Fill in password fields to create an account.</li>
              <li>Leave passwords fields empty to order as guest.</li>
            </ul>
          </AnimatePresence>
        </AnimatedRow>
      )}
    </>
  )
}
