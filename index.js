import express from 'express';
import { config } from 'dotenv';
import initApp from "./App/iniatApp.js";





//config
config({ path: './Config/.env' });
const app = express();



initApp(app);