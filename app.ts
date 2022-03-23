import express, { Request, Response, NextFunction } from 'express';
import Mongoose from "./src/config/db";
import {postuser, getuser, getsearch, postPosition, postStatus, postCompany} from "./src/services/userapi";

const app = express();
const port = 3000;
app.listen(port, async () => {
    await Mongoose();
    console.log(`Timezones by location application is running on port ${port}.`);
});

app.use(express.json());
app.use(express.urlencoded());
app.post('/user', postuser);
app.get('/user/:email', getuser);
app.get('/user/:email/search/:searchTerm', getsearch);
app.post('/user/:email/company/', postCompany);
app.post('/user/:email/company/:company/position', postPosition);
app.post('/user/:email/company/:company/position/:position/status', postStatus);