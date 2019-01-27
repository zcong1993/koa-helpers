# koa-helpers

[![NPM version](https://img.shields.io/npm/v/@zcong/koa-helpers.svg?style=flat)](https://npmjs.com/package/@zcong/koa-helpers) [![NPM downloads](https://img.shields.io/npm/dm/@zcong/koa-helpers.svg?style=flat)](https://npmjs.com/package/@zcong/koa-helpers) [![CircleCI](https://circleci.com/gh/zcong1993/koa-helpers/tree/master.svg?style=shield)](https://circleci.com/gh/zcong1993/koa-helpers/tree/master) [![codecov](https://codecov.io/gh/zcong1993/koa-helpers/branch/master/graph/badge.svg)](https://codecov.io/gh/zcong1993/koa-helpers)

> helpers set for koa

## Usage

### [error](./src/error)

```js
const { ApiError, simpleErrorHandler } = require('@zcong/koa-helpers')

koa.use(simpleErrorHandler())

koa.use(ctx => {
  throw new ApiError()
})

// will get
// {
//   "code": "INTERNAL_ERROR",
//   "message: "INTERNAL_ERROR",
//   "messages": []
// }
```

### [password](./src/password)

```js
const { hash, compare } = require('@zcong/koa-helpers')

const run = async () => {
  const pass = 'password'
  const hash = await hash(pass)
  console.log(await compare(pass, hash)) // true
}
```

### [transform](./src/transform)

```js
const { transform } = require('@zcong/koa-helpers')

const post = {
  '_id': 'uuid'
  title: 'test',
  content: 'test',
  author: {
    '_id': 'uuid',
    name: 'user',
    password: 'hashedpassword'
  }
}

console.log(transform(post, {
  omit: ['author._id', 'author.password'],
  mapping: {
    '_id': 'id'
  }
}))

// output
// {
//   id: 'uuid'
//   title: 'test',
//   content: 'test',
//   author: {
//     name: 'user'
//   }
// }
```

### [validator](./src/validator)

```js
const Joi = require('joi')
const { validate } = require('@zcong/koa-helpers')

const schema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(6)
    .required()
})

const run = async () => {
  await validate({ name: 'test' }, schema) // throw new ApiError('INVALID_INPUT', 'INVALID_INPUT', 400, ['"name" length must be at least 6 characters long'])
}
```

## License

MIT &copy; zcong1993
