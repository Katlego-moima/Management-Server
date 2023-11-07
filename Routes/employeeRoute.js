import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const router = express.Router()

router.post("/employeeLogin", (req, res) => {
    //matching user details with the details in the database
    const sql = "SELECT * FROM employee WHERE email = ?";

    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (response) {
                    const email = result[0].email;
                    //generate a token 
                    const token = jwt.sign(
                        { role: "employee", email: email },
                        "secret_for_katlego",
                        { expiresIn: "1d" }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true });
                }
            })
        }
        else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

export { router as employeeRouter }