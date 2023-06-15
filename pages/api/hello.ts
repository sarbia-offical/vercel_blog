// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { mock, Random } from "mockjs";
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(
    mock({
      'list|3': [
        {
          'id|+1': 1,
          'gender|1': [Random.boolean(),Random.boolean()],
          'name|1': [`${Random.cfirst()}${Random.clast()}`, `${Random.cfirst()}${Random.clast()}`],
          'address|1': [Random.county(true), Random.county(true), ]
        }
      ]
    })
  )
}
