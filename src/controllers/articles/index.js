import { pool } from "../../db";

const createArticle = (req, res) => {
  // console.log(req);
  
  const { article_title, article_content, posted_by } = req.body;
  console.log('Creating article');
  pool.query('INSERT INTO articles (article_title, article_content, posted_by) VALUES ($1, $2, $3)', [article_title, article_content, posted_by],  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    
    res.status(200).json({
      code: 1,
      messages: "Article created"
    });
  });
};

module.exports = {
  createArticle,
}