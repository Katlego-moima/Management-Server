import express from "express";
import cors from 'cors';
import { adminrouter } from './Routes/adminRoute.js'
import { employeeRouter } from './Routes/employeeRoute.js'


const app = express();
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/auth', adminrouter);
app.use('/employee', employeeRouter);
app.use(express.static('Public'));

const PORT = 3200;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
