import express from 'express';
import cors from 'cors';


import { errorHandling } from '../middleware/errorHangling.js';
import { authRouter,bookRouter,menuRouter,photoRouter,servicesRouter } from '../Modules/router.js';
import { connectDB } from '../DB/db_connection.js';



export default function initApp(app) {


// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL_LOCAL || process.env.CLIENT_URL_SERVER || 'http://localhost:3000' || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'accesstoken', 'Authorization', 'Accept', 'Origin'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//port
const port = process.env.PORT || 3000;

// router

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/photo', photoRouter);
app.use('/api/v1/services', servicesRouter);

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandling)
// Connect to the database
connectDB();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
}