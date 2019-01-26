import * as Koa from 'koa'

export class ApiError extends Error {
  public code: string
  public statusCode: number
  public messages: string[]

  constructor(
    message: string = 'INTERNAL_ERROR',
    code: string = 'INTERNAL_ERROR',
    statusCode: number = 500,
    messages: string[] = []
  ) {
    super(message)
    this.code = code
    this.statusCode = statusCode
    this.messages = messages
  }
}

export const invalidInputApiError = (messages: string[]): ApiError =>
  new ApiError('INVALID_INPUT', 'INVALID_INPUT', 400, messages)

export const unauthorizedApiError = new ApiError(
  'UNAUTHORIZED_ERROR',
  'UNAUTHORIZED_ERROR',
  401,
  []
)

export const notFoundApiError = (
  message: string = 'NOT_FOUND',
  code: string = 'NOT_FOUND'
): ApiError => new ApiError(message, code, 400, [])

/* istanbul ignore next */
export const simpleErrorHandler = (): Koa.Middleware => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
    if (err instanceof ApiError) {
      ctx.status = err.statusCode
      ctx.body = {
        code: err.code,
        message: err.message,
        messages: err.messages
      }
    } else {
      ctx.status = 500
      ctx.body = new ApiError()
    }
  }
}
