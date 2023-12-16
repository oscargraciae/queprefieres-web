// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../lib/db'
import { wouldYouRatherQuestions } from '../../questions-mock'

// type Data = {
//   name: string
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const mocks = wouldYouRatherQuestions

  for (const mock of mocks) {
    await db.question.create({
      data: {
        question: mock.pregunta,
        option_a: mock.opcion_a,
        option_b: mock.opcion_b,
        option_a_votes: 0,
        option_b_votes: 0,
        category: mock.categories as any,
        deckId: 'clbvhrtva0000rmdsi0o3eu01',
        slug: createSlug(mock.pregunta)
      }
    })
  }

  res.status(200).json({ mocks, length: mocks.length })
}

function createSlug(title: string) {
  return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}
