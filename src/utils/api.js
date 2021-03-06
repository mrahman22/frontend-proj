import axios from "axios";

const baseUrl = "https://nc2020server.herokuapp.com/api";

export const fetchArticles = (topic, sort_by, order) => {
  return axios
    .get(`${baseUrl}/articles`, {
      params: {
        topic,
        sort_by,
        order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchArticleById = (article_id) => {
  return axios.get(`${baseUrl}/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const fetchTopics = () => {
  return axios.get(`${baseUrl}/topics`).then(({ data }) => {
    return data.topics;
  });
};

export const fetchArticlesByTopic = (topic) => {
  return axios.get(`${baseUrl}/topics/${topic}`).then(({ data }) => {
    return data.articles;
  });
};

export const fetchCommentsById = (article_id) => {
  return axios
    .get(`${baseUrl}/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const postNewComment = (article_id, newComment) => {
  return axios
    .post(`${baseUrl}/articles/${article_id}/comments`, newComment)
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteCommentById = (comment_id) => {
  return axios.delete(`${baseUrl}/comments/${comment_id}`);
};

export const pathVotes = (id, inc_votes, type) => {
  if (type === undefined) {
    type = "comments";
  }
  return axios.patch(`${baseUrl}/${type}/${id}`, { inc_votes });
};

export const fetchAllUsers = () => {
  return axios.get(`${baseUrl}/users`).then(({ data }) => {
    return data.users;
  });
};
