import { pick, omit, set, unset, get } from 'lodash'

export type JsonObject = {
  [key: string]: any
}

export type TransformData = JsonObject | JsonObject[]

export interface TransformOptions {
  picks?: string[]
  omits?: string[]
  mapping?: {
    [key: string]: string
  }
}

export const transform = (
  data: TransformData,
  options: TransformOptions
): TransformData => {
  if (Array.isArray(data)) {
    return data.map(d => transform(d, options))
  }
  let res: JsonObject = data
  if (Array.isArray(options.picks) && options.picks.length > 0) {
    res = pick(data, options.picks)
  } else if (Array.isArray(options.omits) && options.omits.length > 0) {
    res = omit(data, options.omits)
  }

  if (options.mapping && Object.keys(options.mapping).length > 0) {
    Object.keys(options.mapping).forEach(k => {
      if (get(res, k)) {
        set(res, options.mapping[k], get(res, k))
        unset(res, k)
      }
    })
  }

  return res
}
