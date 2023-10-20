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
  return myAxios.get(`/category/${categoryId}/posts`).then(response => response.data)
}

export const loadPostUserWise = (id) => {
  return privateAxios.get(`/user/${id}/posts`).then(response => response.data)
}

export function doDeletePost(postId) {
  return privateAxios.delete(`/posts/${postId}`).then(response => response.data)
}

export const doUpdatePost = (post, postId) => {
  return privateAxios.put(`posts/${postId}`, post).then(response => response.data)
}