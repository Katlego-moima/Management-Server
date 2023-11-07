import express from "express";
import cors from 'cors';
import { adminrouter } from './Routes/adminRoute.js'


const app = express();
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}));
app.use(express.json());
app.use('/auth', adminrouter);
app.use(express.static('Public'));

const PORT = 3200;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
