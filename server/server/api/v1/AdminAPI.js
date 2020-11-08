import { Router } from "express";
import pool from "../../../database";
import { v4 } from "uuid";
import moment from "moment";

import { checkAuthAdmin } from "../../middlewares/auth.admin";

const router = Router();

// Admin login

router.post("/login", (req, res) => {
  const { login, password } = req.body;

  pool.query(`SELECT * FROM admin`, (err, result) => {
    if (err) {
      return res.status(403).json({ msg: "bad request" });
    }

    if (login === result[0].login) {
      if (password === result[0].password) {
        const token = v4();
        const maxAge = 30 * 60 * 1000;
        res.cookie("adminToken", token, { maxAge });
        res.status(200).json({ msg: "Logged!", token });
      } else {
        res.status(403).json({ msg: "Try again enter password!" });
        return;
      }
    } else {
      res.status(403).json({ msg: "Try again enter login!" });
    }
  });
});

// news

router.post("/post/add", (req, res) => {
  const { title, category, content } = req.body;
  const { path } = req.file;
  const imageURL = path
    .split("\\")
    .map((i) => (i !== "public" ? i : ""))
    .reduce((a, b) => `${a}/${b}`);
  const createrd_at = moment().format("LL");

  pool.query(
    "INSERT INTO imgs (imageURL) VALUES(?)",
    [imageURL],
    (err, result) => {
      if (err) {
        return console.error(err);
      }
    }
  );

  pool.query(
    "INSERT INTO news (title, category, content, preview_img, created_at) VALUES(?,?,?,?,?)",
    [title, category, content, imageURL, createrd_at],
    (err, result) => {
      if (err) {
        return console.error(err);
      }
    }
  );
  res.redirect("/");
});

router.post("/post/update", (req, res) => {
  const { id, title, category, content } = req.body;

  pool.query(
    `UPDATE news SET title = ${title}, category = ${category}, content = ${content} WHERE news.id = ${id}`,
    (err, result) => {
      if (err) {
        return res.status(403).json({ err });
      }

      res.status(201).json(result);
    }
  );
});

router.post("/post/delete", (req, res) => {
  pool.query(`DELETE FROM news WHERE id = ${req.body.id}`, (err, result) => {
    if (err) {
      return res.status(403).json({ err });
    }

    res.status(201).json(result);
  });
});

// ss

router.post("/social_media/add", checkAuthAdmin, (req, res) => {
  pool.query(
    "INSERT INTO social_media (link, img_link) VALUES(?, ?)",
    [req.body.link, req.body.img_link],
    (err, result) => {
      if (err) {
        res.status(403).json(err);
        return new Error(err);
      }

      res.status(200).json({ msg: "Contact was added", result });
    }
  );
});

router.post("/social_media/delete", checkAuthAdmin, (req, res) => {
  const { id } = req.body;

  pool.query(
    `DELETE FROM social_media WHERE id = ${id}`,

    (err) => {
      if (err) {
        res.status(403).json(err);
        return new Error(err);
      }
    }
  );
});

// imgs

router.post("/imgs/add", checkAuthAdmin, (req, res) => {
  const { path } = req.file;
  const imageURL = path
    .split("\\")
    .map((i) => (i !== "public" ? i : ""))
    .reduce((a, b) => `${a}/${b}`);

  pool.query(
    "INSERT INTO imgs (imageURL) VALUES(?)",
    [imageURL],
    (err, result) => {
      if (err) {
        res.status(403).json(err);
        return new Error(err);
      }
      res.json({ path: imageURL, id: result.insertId });
    }
  );
});

router.post("/imgs/delete", checkAuthAdmin, (req, res) => {
  const { imageID } = req.body;

  pool.query(`DELETE FROM imgs WHERE imageID = ${imageID}`, (err, result) => {
    if (err) {
      res.status(403).json(err);
      return console.log(err);
    }

    res.json({ result });
  });
});

// aboutme

router.post("/aboutme", checkAuthAdmin, (req, res) => {
  const { img_link, name, year_old, text_about } = req.body;

  pool.query(
    `UPDATE aboutme SET img_link = ?, name = ?, year_old = ?, text_about = ? WHERE aboutme.id = 1`,
    [img_link, name, year_old, text_about],
    (err) => {
      if (err) {
        res.status(403).json(err);
        return console.log(err);
      }
    }
  );
});

router.post("/aboutme/achievements/delete", checkAuthAdmin, (req, res) => {
  pool.query(`DELETE FROM achievements WHERE id = ${req.body.id}`, (err) => {
    if (err) {
      res.status(403).json(err);

      return new Error(err);
    }

    res.json({ msg: "achievement was deleted" });
  });
});

router.post("/aboutme/achievements/update", checkAuthAdmin, (req, res) => {
  const { name_ach, percent_ach, id } = req.body;

  pool.query(
    `UPDATE achievements SET name_ach = ${name_ach}, percent_ach = ${percent_ach} WHERE achievements.id = ${id}`,
    (err) => {
      if (err) {
        res.status(403).json(err);

        return new Error(err);
      }

      res.json({ msg: "achievement was updated" });
    }
  );
});

router.post("/aboutme/achievements/add", checkAuthAdmin, (req, res) => {
  const { name_ach, percent_ach, color } = req.body;

  pool.query(
    `INSERT INTO achievements (name_ach, percent_ach, color) VALUES(?, ?, ?)`,
    [name_ach, percent_ach, color],
    (err, result) => {
      if (err) {
        res.status(403).json(err);

        return new Error(err);
      }

      res.json({ msg: "achievement was added", result });
    }
  );
});

// Contacts

router.post("/contacts/add", checkAuthAdmin, (req, res) => {
  pool.query(
    "INSERT INTO contacts (contact) VALUES(?)",
    [req.body.contact],
    (err, result) => {
      if (err) {
        res.status(403).json(err);
        return new Error(err);
      }

      res.status(200).json({ msg: "Contact was added", result });
    }
  );
});

router.post("/contacts/delete", checkAuthAdmin, (req, res) => {
  const { id } = req.body;

  pool.query(
    `DELETE FROM contacts WHERE id = ${id}`,

    (err) => {
      if (err) {
        res.status(403).json(err);
        return new Error(err);
      }
    }
  );
});

export default router;
