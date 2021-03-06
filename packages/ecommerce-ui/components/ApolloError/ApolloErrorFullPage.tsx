import { ApolloError } from '@graphcommerce/graphql'
import { FullPageMessage, FullPageMessageProps } from '@graphcommerce/next-ui'
import { AlertProps } from '@mui/material'
import { ApolloErrorAlert } from './ApolloErrorAlert'

export type ApolloErrorFullPageProps = {
  error?: ApolloError
  graphqlErrorAlertProps?: Omit<AlertProps, 'severity'>
  networkErrorAlertProps?: Omit<AlertProps, 'severity'>
} & Omit<FullPageMessageProps, 'title' | 'description'>

export function ApolloErrorFullPage(props: ApolloErrorFullPageProps) {
  const {
    error,
    graphqlErrorAlertProps,
    networkErrorAlertProps,
    children,
    ...fullPageMessageProps
  } = props

  const singleError = error?.graphQLErrors.length === 1

  return (
    <FullPageMessage
      title={singleError ? error?.graphQLErrors[0].message : 'Several errors occured'}
      {...fullPageMessageProps}
    >
      {singleError ? children : <ApolloErrorAlert error={error} />}
    </FullPageMessage>
  )
}
