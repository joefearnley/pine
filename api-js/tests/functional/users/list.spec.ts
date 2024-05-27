import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('Users list', () => {
  test('get a list of users', async ({ client, route }) => {

    const user = await UserFactory.merge({ email: 'joef@test.com' }).create()

    const response = await client
      .get(route('users.list'))
      .withGuard('api_tokens')
      .loginAs(user)

    response.assertStatus(200)
    response.assertBody({
      data: [
        {
          id: 1,
          email: 'joef@test.com',
        }
      ]
    })
  })
})
