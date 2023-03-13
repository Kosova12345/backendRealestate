import { db } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const getUser = (req,res) => {
    const q = "SELECT * FROM users"
    db.query(q, (err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}
  

export const deleteUser = (req,res) => {
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not authenticated")

    jwt.verify(token,'kosova12345', (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!")

        const userId = req.params.id
        const q = "DELETE FROM users WHERE `id` = ? "

        db.query(q, [userId], (err,data) => {
            if(err) return res.status(403).json("You can delete only your users")
            return res.json("Users has been deleted")
        })
    })
}



export const updateUser = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated");

    try {
        const userInfo = await jwt.verify(token, 'kosova12345');

        const userId = req.params.id;
        const { username, email, password, name, role } = req.body;

        let q = "UPDATE users SET `username` = ?, `email` = ?, `name` = ?, `role` = ?";
        let values = [username, email, name, role];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            q += ", `password` = ?";
            values.push(hashedPassword);
        }

        q += " WHERE `id` = ?";
        values.push(userId);

        await db.query(q, values);

        return res.json("User has been updated");

    } catch (err) {
        
       return res.status(403).json("Token is not valid")
    }
};