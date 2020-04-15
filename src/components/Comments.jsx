// import React, { Component } from "react";
// import { Link } from "@reach/router";
// import * as api from "../utils/api";
// import PostNewComment from "./PostNewComment";

// class Comments extends Component {
//   state = {
//     comments: [],
//     selectedArticle: [],
//     isLoading: true,
//   };

//   fetchSelectedArticle = () => {
//     const { article_id } = this.props;
//     api.fetchArticleById(article_id).then((article) => {
//       this.setState({ selectedArticle: article });
//     });
//   };

//   componentDidMount() {
//     this.fetchCommentsByArticles();
//     this.fetchSelectedArticle();
//   }

//   fetchCommentsByArticles = () => {
//     const { article_id } = this.props;
//     api.fetchCommentsById(article_id).then((comments) => {
//       this.setState({ comments, isLoading: false });
//     });
//   };

//   // postComment = (newComments) => {
//   //   const { loggedInUser, article_id } = this.props;
//   //   newComments.username = loggedInUser;
//   //   api.postNewComment(article_id, newComments).then((comment) => {
//   //     this.setState((currentState) => {
//   //       return { comments: [comment, ...currentState.comments] };
//   //     });
//   //   });
//   // };

//   // deleteComment = (comment_id) => {
//   //   api.deleteCommentById(comment_id);
//   //   this.setState((currentState) => {
//   //     return {
//   //       comments: currentState.comments.filter((comment) => {
//   //         return comment.comment_id !== comment_id;
//   //       }),
//   //     };
//   //   });
//   // };

//   render() {
//     const { comments, isLoading, selectedArticle } = this.state;
//     const { loggedInUser } = this.props;
//     if (isLoading) return "....Loading";
//     return (
//       <div className="all-comments">
//         <section className="single-article">
//           <h2>{selectedArticle.title}</h2>
//           <p>{selectedArticle.author}</p>
//           <p>Topic:{selectedArticle.topic}</p>
//           <p>Created_at: {selectedArticle.created_at}</p>
//           <p>Body: {selectedArticle.body}</p>
//           <Link to={`/articles/${selectedArticle.article_id}/comments`}>
//             <p>Comment Count: {selectedArticle.comment_count}</p>
//           </Link>
//           <p>Votes: {selectedArticle.votes}</p>
//         </section>
//         <p>You must be logged in to post or delete a comment</p>
//         {loggedInUser && <PostNewComment postComment={this.postComment} />}
//         <ul>
//           {comments.map((comment) => {
//             return (
//               <li className="list-comments" key={comment.comment_id}>
//                 <br />
//                 <h3 className="comment-title">username: {comment.author}</h3>
//                 <p>comment_id: {comment.comment_id}</p>
//                 <p>article_id: {comment.article_id}</p>
//                 <p>created_at: {comment.created_at}</p>
//                 <p>body: {comment.body}</p>
//                 <p>votes: {comment.votes}</p>
//                 {loggedInUser === comment.author && (
//                   <button
//                     className="del-btn"
//                     onClick={(e) => {
//                       this.deleteComment(comment.comment_id);
//                     }}
//                   >
//                     Delete comment
//                   </button>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   }
// }

// export default Comments;
