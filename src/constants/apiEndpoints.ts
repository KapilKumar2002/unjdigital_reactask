const BASE_URL = 'https://c43d9c37-22a2-4d9b-9f13-923d980cd6ec.mock.pstmn.io'

export const ApiEndpoints = {
  baseUrl: BASE_URL,

  users: {
    list: '/users?page=',             // You will append page number
    detail: '/users/',                // You will append user ID
    update: '/users/',                // You will append user ID
    delete: '/users/',                // You will append user ID
  },
}
