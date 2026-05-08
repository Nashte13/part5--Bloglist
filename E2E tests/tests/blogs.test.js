const {test, expect, beforeEach, describe} = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
      //empty database
      await page.request.post("http://localhost:3001/api/testing/reset");

      //create a user
        await request.post('http://localhost:3001/api/users', {
            data: {
                username: 'userA',
                name: 'User A',
                password: 'passwordA'
            }
        })
        await request.post('http://localhost:3001/api/users', {
            data: {
                username: 'userB',
                name: 'User B',
                password: 'passwordB'
            }
        })

        //go to frontend
      await page.goto("http://localhost:5173");
    });

    test('login form is shown', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible()

    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByRole('textbox', { name: 'username' }).fill('nashm')
            await page.getByRole('textbox', { name: 'password' }).fill('nm8961')
            await page.getByRole('button', { name: 'login' }).click()

            //expect something visible after login
            await expect(page/getByText('Nash logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('textbox', {name: 'username'}).fill('nashm')
            await page.getByRole('textbox', {name: 'password'}).fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()
            
            //expect error message
            await expect(page.getByText('invalid username or password')).toBeVisible()

            //ensure login did not succeed
            await expect(page.getByText('Nash logged in')).not.toBeVisible()
        })

        test('a new blog can be created', async ({page}) => {
            //login first
            await page.getByRole('textbox', { name: 'username' }).fill('nashm')
            await page.getByRole('textbox', {name: 'password'}).fill('nm8961')
            await page.getByRole('button', { name: 'login' }).click()

            //open blog creation form
            await page.getByRole('button', { name: 'create new blog' }).click()

            //fill in the blog details
            await page.getByRole('textbox', { name: 'title' }).fill('My First Blog')
            await page.getByRole('textbox', { name: 'author' }).fill('Nash')
            await page.getByRole('textbox', { name: 'url' }).fill('http://example.com')

            //submit
            await page.getByRole('button', { name: 'create' }).click()

            //assert that the new blog is visible in the list
            await expect(page.getByText('My First Blog by Nash')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            //login
            await page.getByRole('textbox', { name: 'username' }).fill('nashm')
            await page.getByRole('textbox', { name: 'password' }).fill('nm8961')
            await page.getByRole('button', { name: 'login' }).click()

            //create a blog
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByRole('textbox', { name: 'title' }).fill('Blog to be liked')
            await page.getByRole('textbox', { name: 'author' }).fill('Nash')
            await page.getByRole('textbox', { name: 'url' }).fill('http://example.com')
            await page.getByRole('button', { name: 'create' }).click()

            //reveal blog details
            await page.getByRole('button', { name: 'view' }).click()

            //click the button
            const likeButton = page.getByRole('button', { name: 'like' })
            await likeButton.click()

            //assert likes increased
            await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('the user who created a blog can delete it', async ({page}) => {
            //Log in
            await page.getByRole('textbox', { name: 'username' }).fill('nashm')
            await page.getByRole('textbox', { name: 'password' }).fill('nm8961')
            await page.getByRole('button', { name: 'login' }).click()

            //create a blog
            await page.getByRole('button', {name: 'create new blog' }).click()
            await page.getByLabelText('title').fill('Blog to be deleted')
            await page.getByLabelText('author').fill('Nash')
            await page.getByLabelText('url').fill('http://example.com')
            await page.getByRole('button', { name: 'create' }).click()

            //reveal blog details
            await page.getByRole('button', { name: 'view' }).click()

            //handle the confirm dialog
            page.on('dialog', async dialog => {
                expect(dialog.message()).toContain('Remove blog')//optional check
                await dialog.accept()//confirm deletion
            })

            //click remove
            await page.getByRole('button', {name: 'remove'}).click()

            //assert blog is gone
            await expect(page.queryByText('Blog to be deleted by Nash')).toBeNull()
        })

        test('only creator can see the delete button', async ({ page }) => {
            //log in as user A
            await page.getByRole('textbox', { name: 'username' }).fill('userA')
            await page.getByRole('textbox', { name: 'password' }).fill('passwordA')
            await page.getByRole('button', { name: 'login' }).click()

            //create a blog
            await page.getByRole('button', { name: 'new blog' }).click()
            await page.getByLableText('title').fill('User A Blog')
            await page.getByLabelText('author').fill('User A')
            await page.getByLabelText('url').fill('http://example.com')
            await page.getByRole('button', { name: 'create' }).click()

            //logout(assuming there is a logout button)
            await page.getByRole('button', {name: 'logout' }).click()

            //log in as user B
            await page.getByRole('textbox', {name: 'username'}).fill('userB')
            await page.getByRole('textbox', {name: 'password'}).fill('passwordB')
            await page.getByRole('button', { name: 'login' }).click()

            //reveal blog details
            await page.getByRole('button', {name: 'view' }).click()

            //assert delete button is not visible
            await expect(page.queryByRole('button', { name: 'remove' })).toBeNull()
        })
    })
})