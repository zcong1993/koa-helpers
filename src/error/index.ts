import * as Koa from 'koa'

export class ApiError extends Error {
  public code: string
  public statusCode: number
  public messages: string[]

  constructor(
    message: string = 'INTERNAL_ERROR',
    code: string = 'INTERNAL_ERROR',
    messages: string[] = [],
    statusCode: number = 500
  ) {
    super(message)
    this.code = code
    this.statusCode = statusCode
    this.messages = messages
  }
}

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
