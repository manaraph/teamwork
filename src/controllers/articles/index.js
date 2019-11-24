// import { pool } from "../../db";

// const createArticle = (req, res) => {
//   // console.log(req);
  
//   const { article_title, article_content, posted_by } = req.body;
//   console.log('Creating article');
//   return pool.query('INSERT INTO articles (article_title, article_content, posted_by) VALUES ($1, $2)', [article_title, article_content, posted_by],  (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// };

// module.exports = {
//   createArticle,
// }