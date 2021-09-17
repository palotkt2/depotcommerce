import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      alignItems: 'center',
      padding: `${theme.spacings.xxs} 0`,
    },
    secondary: {
      background: `${theme.palette.secondary.main}12`,
    },
    default: {
      background: '#f7f7f7',
    },
    contained: {
      padding: theme.spacings.sm,
      overflow: 'hidden',
      borderRadius: 6,
    },
  }),
  { name: 'Form' },
)

export type BaseFormProps = {
  contained?: boolean
  background?: 'secondary' | 'default'
  children: React.ReactNode
} & UseStyles<typeof useStyles>

export type FormFormProps = BaseFormProps & JSX.IntrinsicElements['form']

export const Form = React.forwardRef<HTMLFormElement, FormFormProps>((props, ref) => {
  const classes = useStyles(props)
  const { contained, background, ...formProps } = props

  return (
    <form ref={ref} {...formProps} className={clsx(classes.root, contained && classes.contained)} />
  )
})

export type DivFormProps = BaseFormProps & JSX.IntrinsicElements['div']

export const FormDiv = React.forwardRef<HTMLDivElement, DivFormProps>((props, ref) => {
  const classes = useStyles(props)
  const { contained, background = 'default', ...formProps } = props

  return (
    <div
      ref={ref}
      {...formProps}
      className={clsx(
        classes.root,
        contained && classes.contained,
        background === 'secondary' && contained && classes.secondary,
        background === 'default' && contained && classes.default,
      )}
    />
  )
})
