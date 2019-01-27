import * as bcrypt from 'bcrypt'

/**
 * SALT_ROUND is defalut salt round
 */
const SALT_ROUND = 10

/**
 * bcrypt hash method
 * @param data data to be hashed
 * @param saltOrRounds hash options, salt string or salt round
 */
export const hash = (
  data: any,
  saltOrRounds: string | number = SALT_ROUND
): Promise<string> => bcrypt.hash(data, saltOrRounds)

/**
 * bcrypt compare method
 * @param password password string
 * @param hash password hashed
 */
export const compare = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash)

/**
 * bcrypt sync hash method
 * @param data data to be hashed
 * @param saltOrRounds hash options, salt string or salt round
 */
export const hashSync = (
  data: any,
  saltOrRounds: string | number = SALT_ROUND
): string => bcrypt.hashSync(data, saltOrRounds)

/**
 * bcrypt sync compare method
 * @param password password string
 * @param hash password hashed
 */
export const compareSync = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash)
