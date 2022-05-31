const { sendVerificationEmail } = require('../../../../src/utils/mailer')
const service = require('../../../../src/services/usersService')
const User = require('../../../../src/models/userModel')
const mocks = require('./mocks.json')

jest.mock('../../../../src/models/userModel')
// disable emails
jest.mock('../../../../src/utils/mailer')

describe('[usersService|registerNewUser|unit testing]', function () {
  it('Should create a user', async function () {
    // Username & email unique validation should be passed
    await User.find.mockReturnValue([])

    await User.create.mockReturnValue({
      _doc: {
        // Password & __v should be deleted
        passwordHash: 'hash',
        __v: 0,
        _id: 1
      }
    })
    
    process.env.SECRET_KEY = 'test'
    const values = { ...mocks.body }
    const result = await service.registerNewUser(values)

    expect(result).toBeDefined()
    expect(typeof result).toBe('object')
    expect(result.accessToken).toBeDefined()

    expect(result.__v).toBeUndefined()
    expect(result.passwordHash).toBeUndefined()
  })

  it('Should return an username unique validation error', async function () {
    await User.find.mockReturnValue([mocks.body])

    const values = { ...mocks.body }
    const result = await service.registerNewUser(values)

    expect(result).toBeDefined()
    expect(typeof result).toBe('object')

    expect(result.error).toBeDefined()
    expect(result.error).toBe(`Username ${mocks.body.userName} is already registered`)
  })


  it('Should return an email unique validation error', async function () {
    await User.find.mockReturnValueOnce([]).mockReturnValue([mocks.body])

    const values = { ...mocks.body }
    const result = await service.registerNewUser(values)

    expect(result).toBeDefined()
    expect(typeof result).toBe('object')

    expect(result.error).toBeDefined()
    expect(result.error).toBe(`Email ${mocks.body.email} is already registered`)
  })

  it('Should return several body errors (Joi)', async function () {
    const values = {}
    const result = await service.registerNewUser(values)

    expect(result).toBeDefined()
    expect(typeof result).toBe('object')

    expect(result.error).toBeDefined()
    expect(Array.isArray(result.error)).toBeTruthy()

    const fields = Object.keys(mocks.body)
    let errorsCount = 0

    fields.forEach(field => {
      const error = result.error.find(e => e.includes(field))
      expect(error).toBe(`${field} is required`)
      errorsCount++
    })

    expect(result.error.length).toBe(errorsCount)
  })

  it('Should return an service\'s method error', async function () {
    const expectError = 'Hubo un error'

    await User.find.mockReturnValue([])
    await User.create.mockRejectedValue(new Error(expectError))

    const values = { ...mocks.body }
    const { error } = await service.registerNewUser(values)

    expect(error).toBeDefined()
    expect(typeof error).toBe('string')

    expect(error).toBe(expectError)

  })
})
