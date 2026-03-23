const {describe, test} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostBlogs([])
        assert.strictEqual(result, null)
    })

    test('when list has only one blog, equals the author of that blog', () => {
        const blogs = [
            {title: "Blog1", author: "Nash", likes: 5}
        ]

        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, {author: "Nash", blogs: 1})
    })

    test('of a bigger list is the author with the most blogs', () => {
        const blogs = [
            {title: "Blog1", author: "Nash", likes: 5},
            {title: "Blog2", author: "Nash", likes: 10},
            {title: "Blog3", author: "Alice", likes: 7},
            {title: "Blog4", author: "Bob", likes: 3},
            {title: "Blog5", author: "Alice", likes: 8}
        ]

        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, {author: "Nash", blogs: 2})
    })
})