import db from "../../lib/db";

export class QuestionService {
  async getOne({ slug }: { slug?: string }) {
    let question = null

    if (slug) {
      question = await db.question.findUnique({ where: { slug }})
    } else {
      question = await this.getRandomQuestion()
    }

    let nextQuestion = await this.getRandomQuestion()

    while (nextQuestion && nextQuestion.id === question?.id) {
      nextQuestion = await this.getRandomQuestion()
    }

    return {
      question,
      nextQuestion: await this.getRandomQuestion()
    }
  }

  async getRandomQuestion() {
    const productsCount = await db.question.count();
    const skip = Math.floor(Math.random() * productsCount);
  
    return (await db.question.findMany({ skip, take: 1 })).at(0)
  }

  async vote({ questionId, option, userId }: { questionId: string; option: string, userId: string } ) {
    const currentQuestion = await db.question.findUnique({ where: { id: questionId }})

    await db.question.update({
      where: { id: questionId },
      data: {
        option_a_votes: {
          increment: option === currentQuestion?.option_a ? 1 : 0
        },
        option_b_votes: {
          increment: option === currentQuestion?.option_b ? 1 : 0
        }
      }
    })

    this.createUserVote({ userId, questionId, option })
  }

  async createUserVote({ userId, questionId, option }: { userId: string; questionId: string; option: string }) {
    return await db.questionVoted.create({
      data: {
        userId,
        questionId,
        option
      }
    })
  }

}
