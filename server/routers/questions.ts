import { z } from 'zod';
import db from '../../lib/db'
import { QuestionService } from '../services/questions_service';
import { router, procedure } from '../trpc'

export const questionsRouter = router({
  getOne: procedure
    .input(z.object({
      slug: z.string().optional(),
    }))
    .query(async ({ input }) => {
      return await new QuestionService().getOne({ slug: input.slug })
    } 
  ),
  vote: procedure
    .input(z.object({
      id: z.string(),
      option: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { id } = input
        const questionService = new QuestionService()
        const isVoted = await questionService.vote({ questionId: id, option: input.option, userId: ctx.user!.id })
        
        return isVoted
      } catch (error) {
        throw error
      }
    }
  )
})