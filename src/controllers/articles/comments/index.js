import { pool } from "../../../db";

const createComment = (req, res) => {

  const article_id = req.params.articleId;
  const { comment, posted_by } = req.body;
  pool.query('INSERT INTO article_comments (article_id, comment, posted_by) VALUES ($1, $2, $3)', [article_id, comment, posted_by],  (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        error: "There was an error processing your request."
      })
      throw error;
    }
    // console.log(results);
    
    res.status(200).json({
      status: "success",
      messages: "Comment added to article."
    });
  });
}

module.exports = {
  createComment,
}