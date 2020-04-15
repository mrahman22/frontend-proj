// import React, { Component } from "react";
// import { Link } from "@reach/router";
// import * as api from "../utils/api";

// class GetArticlesByTopic extends Component {
//   state = {
//     articles: [],
//     isLoading: true,
//   };

//   componentDidMount() {
//     this.getArticlesByTopic();
//   }

//   getArticlesByTopic = () => {
//     const { topic_slug } = this.props;
//     api.fetchArticlesByTopic(topic_slug).then((articles) => {
//       this.setState({ articles, isLoading: false });
//     });
//   };

//   render() {
//     const { articles, isLoading } = this.state;
//     if (isLoading) return "....Loading";
//     return (
//       <div className="articlesByTopic">
//         <ul>
//           {articles.map((article) => {
//             return (
//               <li key={article.article_id}>
//                 <Link to={`/articles/${article.article_id}`}>
//                   <h2>{article.title}</h2>
//                 </Link>
//                 <p>user: {article.author}</p>
//                 <p>Topic: {article.topic}</p>
//                 <p>Created_at: {article.created_at}</p>
//                 <p>Votes: {article.votes}</p>
//                 <Link to={`${article.article_id}/comments`}>
//                   <p>Comment_Count: {article.comment_count}</p>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   }
// }

// export default GetArticlesByTopic;
