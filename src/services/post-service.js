import { privateAxios, myAxios } from './helper'

export const createPost = async (postData) => {
  console.log(postData)
  const response = await privateAxios.post(
    `/user/${postData.userId}/category/${postData.categoryId}/posts`,
    postData
  )
  return response.data
}

export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then((response) => response.data)
}

export const loadPost = (postId) => {
  return myAxios.get("/posts/" + postId).then(response => response.data)
}

export const createComment = (content, postId) => {
  return privateAxios.post(`/post/${postId}/comments`, content)
}

export const uploadPostImage = (image, postId) => {
  let formData = new FormData()
  formData.append('image', image)

  return privateAxios.post(`/post/image/upload/${postId}`, formData, {
    'Content-Type': 'multipart/form-data'
  }).then(response => response.data)
}

export const loadPostByCategory = (categoryId) => {
  return privateAxios.get(`/category/${categoryId}/posts`).then(response => response.data)
}