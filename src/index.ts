import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

import apiRoutes from './routes/api';

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
