import axios from "axios";

const baseUrl = "https://nc2020server.herokuapp.com";

export const fetchArticles = () => {
  return axios.get(`${baseUrl}/api/articles`).then(({ data }) => {
    return data.articles;
  });
};

export const fetchArticleById = (article_id) => {
  return axios.get(`${baseUrl}/api/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const fetchTopics = () => {
  return axios.get(`${baseUrl}/api/topics`).then(({ data }) => {
    return data.topics;
  });
};

export const fetchArticlesByTopic = (topic) => {
  return axios.get(`${baseUrl}/api/topics/${topic}`).then(({ data }) => {
    return data.articles;
  });
};

export const sortArticles = (value) => {
  return axios
    .get(`${baseUrl}/api/articles`, {
      params: {
        sort_by: value,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchCommentsById = (article_id) => {
  return axios
    .get(`${baseUrl}/api/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const postNewComment = (article_id, newComment) => {
  return axios
    .post(`${baseUrl}/api/articles/${article_id}/comments`, newComment)
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteCommentById = (comment_id) => {
  return axios.delete(`${baseUrl}/api/comments/${comment_id}`);
};
