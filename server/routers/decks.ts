import { router, procedure } from '../trpc'

export const decksRouter = router({
  getDecks: procedure
    .query(() => {
      return 'Hello World'
    }
  ),
  create: procedure
    .mutation(() => {
      return 'By World'
    }
  )
})