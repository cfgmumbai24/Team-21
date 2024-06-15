import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router/route.js';
import mentorRouter from './router/mentorRouter.js';
import studentRouter from './router/studentRouter.js';
import teacherRouter from './router/teacherRouter.js';
import courseRouter from './router/courseRouter.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', router)
app.use("/api/mentor", mentorRouter);
app.use("/api/admin/video", mentorRouter);
app.use("/api/student/", studentRouter);
app.use("/api/teacher/", teacherRouter);
app.use("/api/course/", courseRouter);

// Function to connect to the MongoDB database
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
};

// Connect to the database and start the server
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
    });
}).catch(error => {
    console.log("Invalid database connection...!", error);
});


