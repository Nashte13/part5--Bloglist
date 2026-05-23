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

    
})