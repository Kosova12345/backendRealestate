import { db } from '../db.js'
import jwt from 'jsonwebtoken';
import moment from 'moment/moment.js';
import dotenv from 'dotenv'


export const getPosts = (req,res) => {

    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err,data) => {
        if(err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
    
}


export const getLatestPosts = (req, res) => {
    const q = "SELECT * FROM posts ORDER BY created DESC LIMIT ?";
  
    const limit = req.query.limit ? parseInt(req.query.limit) : 8; // Get the limit parameter from the query string or set it to 10 by default
  
    db.query(q, [limit], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };


export const getPost = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM posts WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data[0]);
  });
};



export const createProperties = (req,res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not login");



    jwt.verify(token, "kosova12345", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid")


        const q = 'INSERT INTO posts (`title`,`desc`,`photos`,`location`,`country`,`city`,`zip`,`area`,`garages`,`propertyId`,`yearBuilt`,`rooms`,`bedroom`,`bathroom`,`square`,`postFor`,`price`,`map`,`created`, `userId`) VALUES (?)';

                const values = [
            req.body.title,
            req.body.desc,
            req.body.photos.join(),
            req.body.location,
            req.body.country,
            req.body.city,
            req.body.zip,
            req.body.area,
            req.body.garages,
            req.body.propertyId,
            req.body.yearBuilt,
            req.body.rooms,
            req.body.bedroom,
            req.body.bathroom,
            req.body.square,
            req.body.postFor,
            req.body.price,
            req.body.map,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
            
        ]
        
        db.query(q, [values] , (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json('Properties has been created');
        })
        
    })
    
}

// export const createProperties = (req,res) => {

//     const token = req.cookies.accessToken;
//     // if(!token) return res.status(401).json("Not login");

//     console.log(req.cookies.accessToken)

//     jwt.verify(token, "kosova12345", (err) => {
//         if(err) return res.status(403).json("Token is not valid")


//         const q = 'INSERT INTO posts (`title`,`desc`,`img`,`location`,`bedroom`,`bathroom`,`square`,`postFor`,`price`,`created`) VALUES (?)';

//         const values = [
//             req.body.title,
//             req.body.desc,
//             req.body.img,
//             req.body.location,
//             req.body.bedroom,
//             req.body.bathroom,
//             req.body.square,
//             req.body.postFor,
//             req.body.price,
//             moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//         ]
        
//         db.query(q, [values] , (err, data) => {
//             if(err) return res.status(500).json(err);
//             return res.status(200).json('Post has been created');
//         })
        
//     })
// }




export const deletePost = (req,res) => {
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, 'kosova12345', (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!")

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? "

        db.query(q, [postId], (err,data) => {
            if(err) return res.status(403).json("You can delete only your post")
            return res.json("Post has been deleted")
        })
    })
}




export const updatePost = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated");

    try {
        const userInfo = await jwt.verify(token, 'kosova12345');

        const postId = req.params.id;
        const { title, desc, img, location, bedroom, bathroom, square, postFor, price } = req.body;

        let q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `location` = ?, `bedroom` = ?, `bathroom` = ?, `square` = ?, `postFor` = ?, `price` = ?";
        let values = [title, desc, img, location, bedroom,bathroom,square,postFor,price];

        q += " WHERE `id` = ?";
        values.push(postId);

        await db.query(q, values);

        return res.json("Post has been updated");
        
    } catch (err) {
       return res.status(403).json("Token is not valid")
    }
};