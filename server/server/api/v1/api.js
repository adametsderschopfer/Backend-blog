import { Router } from "express";
import pool from "../../../database";

const router = Router();


router.get("/imgs",  (req, res) => {
  pool.query(
    `SELECT * FROM imgs`,

    (err, result) => {
      if (err) {
        res.status(403).json(err);
        return new Error(err);
      }

      res.json(result);
    }
  );
});

// news
router.get("/news", (req, res) => {
  pool.query("SELECT * FROM news", (err, news) => {
    if (err) {
      res.status(403).json({ news: [], err });
      return;
    }

    res.json({ news });
  });
});

router.get("/posts/:postId", (req, res) => {
  pool.query(
    `SELECT * FROM news WHERE id = ${req.params.postId}`,
    (err, post) => {
      if (err || !post.length) {
        res
          .status(403)
          .json({ err, msg: "post not found - postid: req.params.postId" });
        return;
      }

      //Прибавлять счетсчик просмотров

      res.json({ post });
    }
  );
});

// ss

router.get("/social_media", (req, res) => {
  pool.query("SELECT * FROM social_media", (err, result) => {
    if (err) {
      res.status(403).json(err);

      return new Error(err);
    }

    res.status(200).json(result);
  });
});

// contacts

router.get("/contacts", (req, res) => {
  pool.query("SELECT * FROM contacts", (err, result) => {
    if (err) {
      res.status(403).json(err);

      return new Error(err);
    }

    res.status(200).json(result);
  });
});

// aboutme

router.get("/aboutme", (req, res) => {
  pool.query("SELECT * FROM aboutme", (err, aboutme) => {
    if (err) {
      res.status(403).json(err);
      return new Error(err);
    }
    
    pool.query("SELECT * FROM achievements", (err, achievements) => {
      if (err) {
        res.status(403).json({ err });

        return new Error(err);
      }

      res.status(200).json({
        aboutme,
        achievements,
      });
    });
  });
});

export default router;
