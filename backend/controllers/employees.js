import { db } from '../db.js'
import jwt from 'jsonwebtoken';
import moment from 'moment/moment.js';

export const getEmployees = (req,res) => {

    const q = "SELECT * FROM employees";

    db.query(q, [req.query.cat], (err,data) => {
        if(err) return res.status(500).send(err);

        return res.status(200).json(data);
        
    })
    
}




export const createEmployees = (req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not login");



    jwt.verify(token, "kosova12345", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid")


        const q = 'INSERT INTO employees (`name`,`position`,`roleEmployees`,`phone`,`email`,`skype`,`img`,`created`) VALUES (?)';

        const values = [
            req.body.name,
            req.body.position,
            req.body.phone,
            req.body.email,
            req.body.skype,
            req.body.roleEmployees,

            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            
        ]
        
        db.query(q, [values] , (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json('Employees has been created');
        })
        
    })
    
}


export const deleteEmployees = (req,res) => {
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "kosova12345", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!")

        const employeesId = req.params.id
        const q = "DELETE FROM employees WHERE `id` = ? "

        db.query(q, [employeesId], (err,data) => {
            if(err) return res.status(403).json("")
            return res.json("Employees has been deleted")
        })
    })
}




export const updateEmployees = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated");

    try {
        const userInfo = await jwt.verify(token, 'keykosova1231');

        const employeesId = req.params.id;
        const { name, position,roleEmployees, img, } = req.body;

        let q = "UPDATE employees SET `name` = ?, `position` = ?, `roleEmployees` = ?, `img` = ?";
        let values = [name, position, roleEmployees, img, ];

        q += " WHERE `id` = ?";
        values.push(employeesId);

        await db.query(q, values);

        return res.json("Employees has been updated");
        
    } catch (err) {
       return res.status(403).json("Token is not valid")
    }
};