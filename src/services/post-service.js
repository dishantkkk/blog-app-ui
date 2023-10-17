import { myAxios } from './helper'

export const createPost = async (postData) => {
  console.log(postData)
  const response = await myAxios.post(
    `/user/${postData.userId}/category/${postData.categoryId}/posts`,
    postData
  )
  return response.data
}
