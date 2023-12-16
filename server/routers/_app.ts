import { z } from 'zod'
import { router } from '../trpc'
import { questionsRouter } from './questions'
import { decksRouter } from './decks'

export const appRouter = router({
  question: questionsRouter,
  deck: decksRouter
})

export type appRouter = typeof appRouter