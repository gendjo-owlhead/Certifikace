export class TestDataGenerator {
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `test${timestamp}${random}@example.com`;
  }

  static generateRandomUsername(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `user${timestamp}${random}`;
  }

  static generateRandomPassword(): string {
    return 'TestPassword123!';
  }

  static generateRandomProfile() {
    return {
      name: 'Test',
      surname: 'User',
      age: Math.floor(Math.random() * 50) + 18,
      email: this.generateRandomEmail(),
      phone: `+420${Math.floor(Math.random() * 900000000) + 100000000}`,
    };
  }

  static generateRandomAccount() {
    return {
      startBalance: Math.floor(Math.random() * 100000) + 1000,
      type: 'Test Account',
    };
  }
}

export const TEST_USERS = {
  EXISTING_USER: {
    username: 'petr.fifka',
    password: "RuXvAbFsirC_'Ab'f%0U",
  },
} as const;

