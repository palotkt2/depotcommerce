import { extendableComponent } from '@graphcommerce/next-ui'
import { SxProps, Theme, Typography } from '@mui/material'
import { ProductShortDescriptionFragment } from './ProductShortDescription.gql'

type ProductShortDescriptionProps = ProductShortDescriptionFragment & { sx?: SxProps<Theme> }

const { classes } = extendableComponent('ProductShortDescription', ['description'] as const)

export default function ProductShortDescription(props: ProductShortDescriptionProps) {
  const { short_description, sx = [] } = props

  return (
    <Typography
      variant='body1'
      component='div'
      className={classes.description}
      dangerouslySetInnerHTML={{ __html: short_description?.html ?? '' }}
      sx={[{ '& > p': { marginTop: 0 } }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  )
}
