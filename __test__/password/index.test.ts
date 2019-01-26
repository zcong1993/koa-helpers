import { hash, hashSync, compare, compareSync } from '../../src'

it('password hash and compare should works well', async () => {
  const testPass: string = 'password'
  const hasheds = [hashSync(testPass), await hash(testPass)]

  hasheds.forEach(async hashed => {
    expect(compareSync(testPass, hashed)).toBeTruthy()
    expect(await compare(testPass, hashed)).toBeTruthy()
  })
})
