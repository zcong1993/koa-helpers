import { validate as joiValidate, SchemaLike, ValidationError } from 'joi'
import { invalidInputApiError } from '../error'

export const validate = async (
  data: any,
  schema: SchemaLike,
  exposeDetail: boolean = true
) => {
  try {
    await joiValidate(data, schema)
  } catch (err) {
    if (exposeDetail) {
      throw invalidInputApiError(
        (err as ValidationError).details.map(e => e.message)
      )
    }

    throw invalidInputApiError([])
  }
}
