import * as bcrypt from 'bcrypt'

const SALT_ROUND = 10

export const hash = (
  data: any,
  saltOrRounds: string | number = SALT_ROUND
): Promise<string> => bcrypt.hash(data, saltOrRounds)

export const compare = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash)

export const hashSync = (
  data: any,
  saltOrRounds: string | number = SALT_ROUND
): string => bcrypt.hashSync(data, saltOrRounds)

export const compareSync = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash)
