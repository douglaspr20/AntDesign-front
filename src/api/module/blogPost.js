import httpClient from "./httpClient";
export const createBlogPost = ({ blogpost }) => {
  return httpClient.post(`private/blogpost`, { ...blogpost });
};

export const getAllBlogPost = () => {
  return httpClient.get(`private/blogpost`);
};

export const getBlogPostByChannelId = ({ ChannelId }) => {
  return httpClient.get(`private/blogpost/${ChannelId}`);
};

export const getBlogPost = (blogPostId) => {
  return httpClient.get(`private/blogpost/blog/${blogPostId}`);
};

export const updateBlogPost = ({ blogPostId, data }) => {
  return httpClient.put(`private/blogpost/${blogPostId}`, {
    ...data,
  });
};

export const deleteBlogPost = ({ blogPostId }) => {
  return httpClient.delete(`private/blogpost/${blogPostId}`);
};
