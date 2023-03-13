
import express from 'express'

import { getPosts, getPost, deletePost, updatePost, createProperties, getLatestPosts } from "../controllers/post.js";





const router = express.Router()


router.get('/', getPosts )
router.get('/latest', getLatestPosts )

router.get('/find/:id', getPost)
router.post('/', createProperties);
router.put('/:id', updatePost)
router.delete('/:id', deletePost)


export default router