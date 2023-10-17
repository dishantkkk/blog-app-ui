import { myAxios } from './helper'

export const signup = async (user) => {
  return await myAxios
    .post('/auth/register', user)
    .then((response) => response.data)
}

export const loginUser = async (loginDetail) => {
  const response = await myAxios.post('/auth/login', loginDetail)
  return response.data
}
