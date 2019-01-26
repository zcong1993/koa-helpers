import { invalidInputApiError, ApiError, notFoundApiError } from '../../src'

it('test invalidInputApiError', () => {
  expect(invalidInputApiError([])).toEqual(
    new ApiError('INVALID_INPUT', 'INVALID_INPUT', 400, [])
  )
})

it('test notFoundApiError', () => {
  expect(notFoundApiError()).toEqual(
    new ApiError('NOT_FOUND', 'NOT_FOUND', 400, [])
  )
})

it('test ApiError', () => {
  expect(new ApiError('test', 'test', 800, ['test'])).toBeInstanceOf(ApiError)
})
