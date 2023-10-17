import { myAxios } from './helper'

export const loadAllCategories = async () => {
  const response = await myAxios.get('/categories')
  return response.data
}
