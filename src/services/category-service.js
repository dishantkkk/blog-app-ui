import { myAxios } from './helper'

export const loadAllCategories = () => {
  return myAxios.get('/categories/').then(response => response.data)
}
