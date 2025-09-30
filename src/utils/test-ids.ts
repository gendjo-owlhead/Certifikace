export const TEST_IDS = {
  common: {
    mainContent: 'main-content',
    header: 'app-header',
    logo: 'app-logo',
    appTitle: 'app-title',
  },
  language: {
    en: 'language-toggle-en',
    cz: 'language-toggle-cz',
  },
  login: {
    form: 'login-form',
    title: 'login-title',
    usernameInput: 'login-username-input',
    passwordInput: 'login-password-input',
    submitButton: 'login-submit-button',
    registerButton: 'login-register-button',
    lostPasswordButton: 'login-lost-password-button',
  },
  register: {
    form: 'register-form',
    title: 'register-title',
    usernameInput: 'register-username-input',
    passwordInput: 'register-password-input',
    emailInput: 'register-email-input',
    submitButton: 'register-submit-button',
    backToLoginButton: 'register-back-to-login-button',
  },
  dashboard: {
    page: 'dashboard-page',
    mainContent: 'dashboard-main',
    header: 'dashboard-header',
    logoutButton: 'dashboard-logout-button',
    editProfileButton: 'dashboard-edit-profile-button',
    addAccountButton: 'dashboard-add-account-button',
    profileHeading: 'dashboard-profile-heading',
    accountsHeading: 'dashboard-accounts-heading',
    nav: 'dashboard-navigation',
    accountItem: 'account-item',
    accountBalance: 'account-balance',
  },
  navigation: {
    home: 'nav-home',
    accounts: 'nav-accounts',
    transactions: 'nav-transactions',
    support: 'nav-support',
  },
  profile: {
    nameValue: 'profile-name',
    surnameValue: 'profile-surname',
    emailValue: 'profile-email',
    phoneValue: 'profile-phone',
    ageValue: 'profile-age',
    editNameInput: 'change-name-input',
    editSurnameInput: 'change-surname-input',
    editEmailInput: 'change-email-input',
    editPhoneInput: 'change-phone-input',
    editAgeInput: 'change-age-input',
    saveButton: 'profile-save-button',
  },
} as const;

export type TestIdCategory = keyof typeof TEST_IDS;
export type TestIdMap<T extends TestIdCategory> = typeof TEST_IDS[T];
export type TestIdValue = typeof TEST_IDS[keyof typeof TEST_IDS][keyof typeof TEST_IDS[keyof typeof TEST_IDS]];
