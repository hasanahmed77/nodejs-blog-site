const Blog = require('../models/blogModel')
const mongoose = require('mongoose')

// GET all the blogs
const getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({createdAt: -1})

    res.status(200).json(blogs)
}

// GET a single blog
const getABlog = async (req, res) => {
    const { id } = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such blog.'})
    }

    const blog = await Blog.findById(id)

    if (!blog) {
        return res.status(404).json({error : 'No such blog.'})
    }

    res.status(200).json(blog)
}

// CREATE a new blog - POST request
const createBlog = async (req, res) => {
    const { title, body, author } = req.body

    // Add to the database
    try {
        const user_id = req.user._id
        const blog = await Blog.create({ title, body, author, user_id })
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a blog
const deleteBlog = async (req, res) => {
    const { id } = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such blog.'})
    }

    const blog = await Blog.findOneAndDelete({_id: id})

    if (!blog) {
        return res.status(400).json({error: 'No such blog.'})
    }

    res.status(200).json(blog)
}

// UPDATE a blog - PATCH request
const updateBlog = async (req, res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such blog.'})
    }

    const blog = await Blog.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!blog) {
        return res.status(400).json({error: 'No such blog.'})
    }

    res.status(200).json(blog)
}

module.exports = {
    getBlogs,
    getABlog,
    createBlog,
    deleteBlog,
    updateBlog
}