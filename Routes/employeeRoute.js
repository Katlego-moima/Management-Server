import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const router = express.Router()

router.post('/employeeLogin', (req, res) => {
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
                        "secret_for_kat",
                        { expiresIn: "1d" }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, id: result[0].id });
                }
            })
        }
        else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

router.get(`/detail/:id`, (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM employee WHERE id = ?'
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false })

        return res.json(result)

    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

export { router as employeeRouter }