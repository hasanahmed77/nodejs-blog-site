const express = require('express')
const {
    getBlogs,
    getMyBlogs,
    getABlog,
    createBlog,
    deleteBlog,
    updateBlog,
} = require('../controllers/blogsController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Verify authentication before accessing any blog routes
router.use(requireAuth)

// GET all blogs
router.get('/', getBlogs)

// GET all the blogs for a certain user
router.get('/myBlogs', getMyBlogs)

// GET a single blog
router.get('/:id', getABlog)

// POST a new blog
router.post('/', createBlog)

// DELETE a blog
router.delete('/:id', deleteBlog)

// UPDATE a blog
router.patch('/:id', updateBlog)

module.exports = router