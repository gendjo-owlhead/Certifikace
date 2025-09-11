import { test, expect } from '@playwright/test';

test.describe('API Login Tests', () => {
  const baseUrl = 'https://tegb-backend-877a0b063d29.herokuapp.com';

  test('should login and return token with status 201', async ({ request }) => {
    const loginData = {
      username: 'petr.fifka',
      password: "RuXvAbFsirC_'Ab'f%0U"
    };

    const response = await request.post(`${baseUrl}/tegb/login`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: loginData
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('access_token');
    expect(typeof responseBody.access_token).toBe('string');
    expect(responseBody.access_token.length).toBeGreaterThan(0);

    console.log('Login successful, token received:', responseBody.access_token.substring(0, 20) + '...');
  });
});

