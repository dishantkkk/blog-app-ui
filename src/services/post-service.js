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