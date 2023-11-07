import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  //matching user details with the details in the database

  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";

  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      //generate a token
      const token = jwt.sign(
        { role: "admin", email: email },
        "secret_for_katlego",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    }
    else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
  const sql = 'SELECT * FROM category'
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' })
    return res.json({ Status: true, Result: result })
  })
})

router.post('/addCategory', (req, res) => {
  const sql = 'INSERT INTO category (`name`) VALUES (?)'
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' })
    return res.json({ Status: true })
  })
})

//image upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  }
})



router.post('/addEmployee', (req, res) => {
  const sql = `INSERT INTO employee
  (name, email, salary, image, password, address, categoryID)
  VALUES (?)`;
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' })
    const values = [
      req.body.name,
      req.body.email,
      req.body.salary,
      req.body.image,
      hash,
      req.body.address,
      req.body.categoryID,
    ]
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err })
      return res.json({ Status: true })
    })
  })

})

export { router as adminrouter };
