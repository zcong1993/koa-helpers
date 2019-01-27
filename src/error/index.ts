import * as Koa from 'koa'

/**
 * ApiError is class base on Error class, includes `statusCode`, `code`, `message` and `messages`.
 */
export class ApiError extends Error {
  public code: string
  public statusCode: number
  public messages: string[]

  /**
   * ApiError constructor
   * @param message Error detail message
   * @param code Error code
   * @param statusCode Error response status code
   * @param messages Error details messages
   */
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

/**
 * invalidInputApiError is helper function to create invalid input ApiError
 * @param messages Error details messages
 */
export const invalidInputApiError = (messages: string[]): ApiError =>
  new ApiError('INVALID_INPUT', 'INVALID_INPUT', 400, messages)

/**
 * unauthorizedApiError is default unauthorizedApiError
 */
export const unauthorizedApiError = new ApiError(
  'UNAUTHORIZED_ERROR',
  'UNAUTHORIZED_ERROR',
  401,
  []
)

/**
 * notFoundApiError is helper function to create not found ApiError
 * @param message Error detail message
 * @param code Error code
 */
export const notFoundApiError = (
  message: string = 'NOT_FOUND',
  code: string = 'NOT_FOUND'
): ApiError => new ApiError(message, code, 400, [])

/* istanbul ignore next */
/**
 * simpleErrorHandler create a koa middleware to handle ApiError globally
 */
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
      ctx.body = {
        code: 'INTERNAL_ERROR',
        message: 'INTERNAL_ERROR',
        messages: []
      }
    }
  }
}
