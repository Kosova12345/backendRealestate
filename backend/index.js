import postRoutes from './routes/posts.js'
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import employeesRoutes from './routes/employees.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(cors({
    origin: 'http://localhost:3000',
})
);


app.use(cookieParser())

//middleware
app.use(express.json())


export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, "kosova12345" , (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}




app.use('/api/properties', postRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/employees', employeesRoutes)

app.listen(5000, () => {
    console.log('api working for bh realestate');
})
