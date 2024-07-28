import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { dbConnect } from './dbConnect.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/messages",messageRoutes);
app.use("/api/v1/users",userRoutes);


;(async() => {
    try {
        await dbConnect(process.env.MONGO_URI);
        console.log("Database Connected Successfully...");
        app.listen(PORT,console.log(`Server running at port ${PORT}`));
    } catch (error) {
        console.log("Error! While Connecting Database",error.message);
    }
})
();