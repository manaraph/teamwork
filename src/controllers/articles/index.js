import { pool } from "../../db";

const createArticle = (req, res) => {

  const { article_title, article_content, posted_by } = req.body;
  pool.query('INSERT INTO articles (article_title, article_content, posted_by) VALUES ($1, $2, $3)', [article_title, article_content, posted_by],  (error, results) => {
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
      messages: "Article created"
    });
  });
};

const editArticle = (req, res) => {

  const article_id = req.params.articleId;
  const { article_title, article_content } = req.body;
  pool.query('UPDATE articles SET article_title=$1, article_content=$2, updated_at=current_timestamp WHERE article_id=$3', [article_title, article_content, article_id],  (error, results) => {
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
      messages: "Your article was updated"
    });
  });
}

const deleteArticle = (req, res) => {

  const article_id = req.params.articleId;

  pool.query('DELETE FROM articles WHERE article_id=$1', [article_id],  (error, results) => {
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
      messages: "Your article was deleted"
    });
  });
}

module.exports = {
  createArticle,
  editArticle,
  deleteArticle,
}