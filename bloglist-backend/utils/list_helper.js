const User = require('../models/user')
const Blog = require('../models/blog')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    //find blogs with max likes
    let favorite = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const counts = {}
    blogs.forEach(blog => {
        counts[blog.author] = (counts[blog.author] || 0) + 1
    })

    let topAuthor  = null
    let maxBlogs = 0
    for (const author in counts) {
        if (counts[author] > maxBlogs) {
            maxBlogs = counts[author]
            topAuthor = author
        }
    }
    return {author: topAuthor, blogs: maxBlogs}
}

const mostLikes = (blogs) => {
    if (blogs === 0) {
        return null
    }

    const likesCount = {}
    blogs.forEach(blog => {
        likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
    })

    let topAuthor  = null
    let maxLikes = 0
    for (const author in likesCount) {
        if (likesCount[author] > maxLikes) {
            maxLikes = likesCount[author]
            topAuthor = author
        }
    }

    return {author: topAuthor, likes: maxLikes}
}

const userWithMostBlogs = async () => {
    const users = await User.find({})
    const blogs = await Blog.find({})
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    userWithMostBlogs,
    usersInDb
}