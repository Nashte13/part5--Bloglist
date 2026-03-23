const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {

    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, null)
    })


    test('when list has that one blog, equals that blog', () => {
        const blogs = [
            {
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 5
            }
        ]

        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[0])
    })

    test('when list has multiple blogs, equals the one with most likes', () => {
        const blogs = [
            {title: "Blog1", author: "A", likes: 5},
            {title: "Blog2", author: "B", likes: 10},
            {title: "Blog3", author: "C", likes: 7}
        ]

        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[1])
    })
})