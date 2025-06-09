import express from 'express';
const router = express.Router();
import { getExplorePosts } from '../controllers/exploreController.js';

router.get('/', getExplorePosts);

export default router;
