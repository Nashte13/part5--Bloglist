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


    test('login succeeds with correct credentials', async ({ page }) => {
        await page.getByLabel('Username').fill('userA');
        await page.getByLabel('Password').fill('passwordA');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByText('User A logged in')).toBeVisible();
    })

    test('login fails with wrong credentials', async ({ page }) => {
        await page.getByLabel('Username').fill('userA');
        await page.getByLabel('Password').fill('wrongpassword');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByText('Invalid username or password')).toBeVisible();
        await expect(page.getByText('User A logged in')).not.toBeNull();
    })

    test('a logged in user can create a blog', async ({ page }) => {
        //login first
        await page.getByLabel('Username').fill('userA');
        await page.getByLabel('Password').fill('passwordA');
        await page.getByRole('button', { name: 'Login' }).click();

        //open create blog form
        await page.getByRole('button', { name: 'Create new blog' }).click();

        //fill the form
        await page.getByLabel('Title').fill('Test Blog Title');
        await page.getByLabel('Author').fill('Test Author');
        await page.getByLabel('URL').fill('http://testblog.com');
        await page.getByRole('button', { name: 'Create' }).click();

        //assert blog appears in the list
        await expect(page.getByText('Test Blog Title by Test Author')).toBeVisible();
    })

    test('a logged in user can like a blog', async ({page}) => {
        //login and create a blog first
        await page.getByLabel('Username').fill('userA');
        await page.getByLabel('Password').fill('passwordA');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Create new blog' }).click();
        await page.getByLabel('Title').fill('Blog to Like');
        await page.getByLabel('Author').fill('User A');
        await page.getByLabel('URL').fill('http://testblog.com');
        await page.getByRole('button', { name: 'Create' }).click();

        //go to blog details
        await page.getByRole('link', { name: 'Blog to Like by User A' }).click();
        
        //click like button
        await page.getByRole('button', { name: 'Like' }).click();

        //assert like count increased
        await expect(page.getByText('Likes: 1')).toBeVisible();
    })

    test('a logged in user can delete their blog', async ({ page }) => {
        //login and create a blog first
        await page.getByLabel('Username').fill('userA');
        await page.getByLabel('Password').fill('passwordA');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: 'Create new blog' }).click();
        await page.getByLabel('Title').fill('Blog to Delete');
        await page.getByLabel('Author').fill('User A');
        await page.getByLabel('URL').fill('http://testblog.com');
        await page.getByRole('button', { name: 'Create' }).click();

        //go to blog details
        await page.getByRole('link', { name: 'Blog to Delete by User A' }).click();

        //handle confirmation dialog
        page.on('dialog', dialog => dialog.accept());


        //click remove
        await page.getByRole('button', { name: 'Remove' }).click();

        //assert blog is removed
        await expect(page.getByText('Blog to Delete by User A')).toBeNull();
    })

    
})