import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../../src/pages/login-page';

test.describe('E2E Tests - Complete User Flow', () => {
  test('Complete user registration and profile flow', async ({ page, request }) => {
    const userData = {
      username: `user${faker.number.int({ max: 999999999999999 })}`,
      password: faker.internet.password({ length: 12 }),
      email: faker.internet.email()
    };

    const profileData = {
      name: 'Jan',
      surname: 'Novák', 
      age: 30,
      email: userData.email,
      phone: '+420 123 456 789'
    };
    
    const accountBalance = 75000;

    console.log('Generated test data:');
    console.log(`Username: ${userData.username}`);
    console.log(`Profile: ${profileData.name} ${profileData.surname}, ${profileData.age} years`);
    console.log(`Account Balance: ${accountBalance} CZK`);

    const loginPage = new LoginPage(page);
    
    await test.step('User Registration', async () => {
      await loginPage
        .navigate()
        .then((login) => login.switchToEnglish())
        .then((login) => login.clickRegister())
        .then((register) => register.register(userData.username, userData.password, userData.email));
      
      await page.waitForTimeout(2000);
    });

    let userToken: string;
    let createdAccount: any;
    
    await test.step('Create Account via API', async () => {
      const loginResponse = await request.post('https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login', {
        headers: { 'Content-Type': 'application/json' },
        data: { username: userData.username, password: userData.password }
      });
      expect(loginResponse.status()).toBe(201);
      userToken = (await loginResponse.json()).access_token;
      
      const createAccountResponse = await request.post('https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        data: {
          startBalance: accountBalance,
          type: `${profileData.name}'s Account`
        }
      });
      expect(createAccountResponse.status()).toBe(201);
      createdAccount = await createAccountResponse.json();
      console.log(`Account created with balance: ${createdAccount.balance}`);
    });

    await test.step('Login to Application', async () => {
      await loginPage
        .navigate()
        .then((login) => login.switchToEnglish())
        .then((login) => login.login(userData.username, userData.password));
      
      await page.waitForURL('**/dashboard');
      await expect(page).toHaveURL(/.*dashboard/);
    });

    await test.step('Fill User Profile', async () => {
      const editProfileButton = page.getByRole('button', { name: 'Upravit profil' })
        .or(page.getByRole('button', { name: 'Edit Profile' }));
      await expect(editProfileButton).toBeVisible();
      await editProfileButton.click();
      await page.waitForTimeout(2000);
      
      await fillProfileFields(page, profileData);
      await saveProfile(page);
    });

    await test.step('Verify Profile Data After Save', async () => {
      await verifyProfileData(page, profileData);
    });

    await test.step('Verify Account Display and Balance', async () => {
      const accountsSection = page.locator('h2:has-text("Účty")').or(page.locator('h2:has-text("Accounts")'));
      await expect(accountsSection).toBeVisible();
      
      await verifyAccountBalance(page, accountBalance);
    });

    await test.step('Logout', async () => {
      const logoutButton = page.getByRole('button', { name: 'Odhlásit se' })
        .or(page.getByRole('button', { name: 'Logout' }))
        .or(page.locator('[data-testid="logout"]'));
      await logoutButton.click();
      await page.waitForTimeout(2000);
      
      const isLoggedOut = page.url().includes('login') || 
                         await page.locator('input[type="password"]').isVisible();
      expect(isLoggedOut).toBeTruthy();
    });
  });
});

async function fillProfileFields(page: any, profileData: any): Promise<void> {
  await page.locator('[data-testid="chage-name-input"]').fill(profileData.name);
  await page.locator('[data-testid="chage-surname-input"]').fill(profileData.surname);
  await page.locator('[data-testid="chage-email-input"]').fill(profileData.email);
  await page.locator('[data-testid="chage-phone-input"]').fill(profileData.phone);
  await page.locator('[data-testid="chage-age-input"]').fill(profileData.age.toString());
  
  console.log(`Filled profile: ${profileData.name} ${profileData.surname}`);
}

async function saveProfile(page: any): Promise<void> {
  const saveButton = page.getByRole('button', { name: 'Uložit' })
    .or(page.getByRole('button', { name: 'Save' }));
  await saveButton.click();
  await page.waitForTimeout(3000);
  console.log('Profile saved');
}

async function verifyProfileData(page: any, profileData: any): Promise<void> {
  await expect(page.locator('[data-testid="name"]')).toContainText(profileData.name);
  await expect(page.locator('[data-testid="surname"]')).toContainText(profileData.surname);
  await expect(page.locator('[data-testid="age"]')).toContainText(profileData.age.toString());
  await expect(page.locator('[data-testid="email"]')).toContainText(profileData.email);
  await expect(page.locator('[data-testid="phone"]')).toContainText(profileData.phone);
  
  console.log('Profile data verified');
}

async function verifyAccountBalance(page: any, accountBalance: number): Promise<void> {
  const balanceElement = page.locator(`td:has-text("${accountBalance}")`).first();
  await expect(balanceElement).toBeVisible();
  console.log(`Account balance verified: ${accountBalance} CZK`);
}