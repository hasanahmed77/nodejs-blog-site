const express = require('express')
const {
    getBlogs,
    getABlog,
    createBlog,
    deleteBlog,
    updateBlog,
} = require('../controllers/blogsController')

const router = express.Router()

// GET all workouts
router.get('/', getBlogs)

// GET a single workout
router.get('/:id', getABlog)

// POST a new workout
router.post('/', createBlog)

// DELETE a workout
router.delete('/:id', deleteBlog)

// UPDATE a workout
router.patch('/:id', updateBlog)

module.exports = router