import { transform, TransformOptions, TransformData } from '../../src'

interface In {
  data: TransformData
  options: TransformOptions
}

interface Fixture {
  in: In
  out: TransformData
}

it('transform should works well', () => {
  const fixture: Fixture[] = [
    {
      in: {
        data: {
          a: 1,
          b: 2
        },
        options: {
          picks: ['a']
        }
      },
      out: {
        a: 1
      }
    },
    {
      in: {
        data: {
          a: 1,
          b: 2
        },
        options: {
          omits: ['a']
        }
      },
      out: {
        b: 2
      }
    },
    {
      in: {
        data: {
          a: 1,
          b: 2
        },
        options: {
          mapping: {
            a: 'c'
          }
        }
      },
      out: {
        c: 1,
        b: 2
      }
    },
    {
      in: {
        data: [
          {
            a: 1,
            b: 2
          },
          {
            a: 1,
            b: 2
          }
        ],
        options: {
          picks: ['a']
        }
      },
      out: [
        {
          a: 1
        },
        {
          a: 1
        }
      ]
    },
    {
      in: {
        data: {
          a: {
            c: 1
          },
          b: 2
        },
        options: {
          picks: ['a.c']
        }
      },
      out: {
        a: {
          c: 1
        }
      }
    },
    {
      in: {
        data: {
          a: {
            c: 1
          },
          b: 2
        },
        options: {
          omits: ['a.c']
        }
      },
      out: {
        a: {},
        b: 2
      }
    },
    {
      in: {
        data: {
          a: {
            c: 1
          },
          b: 2
        },
        options: {
          mapping: {
            'a.c': 'a.b'
          }
        }
      },
      out: {
        a: {
          b: 1
        },
        b: 2
      }
    },
    {
      in: {
        data: {
          a: 1,
          b: 2
        },
        options: {
          mapping: {
            c: 'c'
          }
        }
      },
      out: {
        a: 1,
        b: 2
      }
    }
  ]

  fixture.forEach(f => {
    expect(transform(f.in.data, f.in.options)).toEqual(f.out)
  })
})
