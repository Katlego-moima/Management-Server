import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

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
      return res.json({ loginStatus: true});
    }
    else {
        return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.post('/addCategory', (req,res) => {
  const sql = 'INSERT INTO category (`name`) VALUES (?)'
  con.query(sql,[req.body.category], (err, result) => {
    if(err) return res.json({Status: false, Error: 'Query Error'})
    return res.json({Status: true})
  })
})

export { router as adminrouter };
