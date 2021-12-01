import { SvgImage, responsiveVal, iconOrderBefore, SvgImageSimple } from '@graphcommerce/next-ui'
import { darken, lighten, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      alignItems: 'center',
      gridTemplate: `
        "image title"
        ". subtitle"
      `,
      gridTemplateColumns: `min-content auto`,
      columnGap: theme.spacings.xxs,
      marginTop: theme.spacings.xxs,
      background:
        theme.palette.type === 'light'
          ? darken(theme.palette.background.default, 0.01)
          : lighten(theme.palette.background.default, 0.2),
      padding: theme.spacings.xxs,
      borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),
    },
    text: {},
    image: {
      gridArea: 'image',
    },
    title: {
      gridArea: 'title',
      fontWeight: 600,
    },
    subtitle: {
      gridArea: 'subtitle',
      color: theme.palette.text.primary,
    },
  }),
  { name: 'ProductSidebarDelivery' },
)

export default function ProductSidebarDelivery() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SvgImageSimple className={classes.image} src={iconOrderBefore} size='small' />
      <Typography className={classes.title} variant='body2' component='div'>
        Order before 22:00
      </Typography>
      <Typography className={classes.subtitle} variant='body2' component='div'>
        Next day delivery - Shipping free
      </Typography>
    </div>
  )
}
