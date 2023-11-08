import express from "express";
import cors from 'cors';
import { adminrouter } from './Routes/adminRoute.js'
import { employeeRouter } from './Routes/employeeRoute.js'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";


const app = express();
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use('/auth', adminrouter);
app.use('/employee', employeeRouter);
app.use(express.static('Public'));


const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    //verify token
    jwt.verify(token, 'secret_for_katlego', (err, decoded) => {
      if (err) return res.json({ Status: false, Error: 'Wrong token' })
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    })

  } else {
    return res.json({ Status: false, Error: 'Not Authenticated' })
  }
}


app.get('/verify', verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id })
})

const PORT = 3200;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
