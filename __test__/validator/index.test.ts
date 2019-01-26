import { validate, ApiError } from '../../src'
import { SchemaLike, object, string } from 'joi'

it('validate should works well', async () => {
  const schema: SchemaLike = object().keys({
    name: string()
      .alphanum()
      .min(6)
      .required()
  })

  const testData = {
    name: 'test'
  }

  await expect(validate(testData, schema)).rejects.toThrow(
    new ApiError('INVALID_INPUT', 'INVALID_INPUT', 400, [
      '"name" length must be at least 6 characters long'
    ])
  )

  await expect(validate(testData, schema, false)).rejects.toThrow(
    new ApiError('INVALID_INPUT', 'INVALID_INPUT', 400, [])
  )
})
