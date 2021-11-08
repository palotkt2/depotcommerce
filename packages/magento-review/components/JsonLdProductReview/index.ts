import { Product } from 'schema-dts'
import { JsonLdProductReviewFragment } from './JsonLdProductReview.graphql'

export function jsonLdProductReview(props: JsonLdProductReviewFragment): Partial<Product> {
  const { reviews, review_count, rating_summary } = props

  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      reviewCount: review_count ?? undefined,
      ratingValue: rating_summary ? Math.max(rating_summary * 0.5 * 0.1, 1) : undefined,
    },
    review: reviews.items.map((review) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: Math.max((review?.average_rating || 1) * 0.5 * 0.1, 1),
      },
      name: review?.summary,
      author: {
        '@type': 'Person',
        name: review?.nickname,
      },
      datePublished: review?.created_at,
      reviewBody: review?.text,
    })),
  }
}
