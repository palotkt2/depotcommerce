import { Link, Theme, Typography } from '@mui/material'
import { makeStyles } from '../../Styles/tssReact'
import PageLink from 'next/link'
import React from 'react'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

const useStyles = makeStyles({ name: 'BlogListItem' })((theme: Theme) => ({
  item: {
    display: 'grid',
    gridTemplateRows: `${responsiveVal(140, 220)} auto auto`,
    alignContent: 'start',
    color: theme.palette.text.primary,
    gap: theme.spacings.sm,
    marginBottom: theme.spacings.sm,
  },
  date: {
    display: 'inline-block',
    textDecoration: 'none',
    color: theme.palette.text.secondary,
  },
  asset: {
    display: 'grid',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
    '& img': {
      height: '100% !important',
      objectFit: 'cover',
    },
    '& p': {
      alignSelf: 'center',
      justifySelf: 'center',
    },
    background: theme.palette.background.paper,
  },
  title: {
    ...theme.typography.h3,
  },
}))

export type BlogListItemProps = UseStyles<typeof useStyles> & {
  asset: React.ReactNode
  url: string
  date: string
  locale: string
  title: string
}

export default function BlogListItem(props: BlogListItemProps) {
  const { asset, url, date, locale, title } = props
  const { classes } = useStyles(props)

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={classes.item}>
      <PageLink href={`/${url}`} passHref>
        <Link color='inherit' underline='hover'>
          <div className={classes.asset}>{asset}</div>
        </Link>
      </PageLink>

      <time className={classes.date} dateTime={date}>
        {formatter.format(new Date(date))}
      </time>

      <PageLink href={`/${url}`} passHref>
        <Link href={`/${url}`} className={classes.title} color='inherit' underline='hover'>
          <Typography component='h2' variant='h4' color='inherit'>
            {title}
          </Typography>
        </Link>
      </PageLink>
    </div>
  )
}
