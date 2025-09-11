import { APIRequestContext } from '@playwright/test';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface ProfileRequest {
  name?: string;
  surname?: string;
  age?: number;
  email?: string;
  phone?: string;
}

export interface ProfileClearRequest {
  clearName?: boolean;
  clearSurname?: boolean;
  clearAge?: boolean;
  clearEmail?: boolean;
  clearPhone?: boolean;
}

export interface CreateAccountRequest {
  startBalance: number;
  type: string;
}

export interface ChangeBalanceRequest {
  accountId: number;
  amount: number;
}

export interface Account {
  id: number;
  balance: number;
  type: string;
}

export class ApiClient {
  private baseUrl = 'https://tegb-backend-877a0b063d29.herokuapp.com';
  private token: string | null = null;

  constructor(private request: APIRequestContext) {}

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async register(data: RegisterRequest) {
    const response = await this.request.post(`${this.baseUrl}/tegb/register`, {
      headers: this.getHeaders(),
      data,
    });
    return response;
  }

  async login(data: LoginRequest) {
    const response = await this.request.post(`${this.baseUrl}/tegb/login`, {
      headers: this.getHeaders(),
      data,
    });
    
    if (response.ok()) {
      const responseData: LoginResponse = await response.json();
      this.setToken(responseData.access_token);
    }
    
    return response;
  }

  async getProfile() {
    const response = await this.request.get(`${this.baseUrl}/tegb/profile`, {
      headers: this.getHeaders(),
    });
    return response;
  }

  async updateProfile(data: ProfileRequest) {
    const response = await this.request.patch(`${this.baseUrl}/tegb/profile`, {
      headers: this.getHeaders(),
      data,
    });
    return response;
  }

  async clearProfile(data: ProfileClearRequest) {
    const response = await this.request.patch(`${this.baseUrl}/tegb/profile/clear`, {
      headers: this.getHeaders(),
      data,
    });
    return response;
  }

  async createAccount(data: CreateAccountRequest) {
    const response = await this.request.post(`${this.baseUrl}/tegb/accounts/create`, {
      headers: this.getHeaders(),
      data,
    });
    return response;
  }

  async changeAccountBalance(data: ChangeBalanceRequest) {
    const response = await this.request.post(`${this.baseUrl}/tegb/accounts/change-balance`, {
      headers: this.getHeaders(),
      data,
    });
    return response;
  }

  async getAccounts() {
    const response = await this.request.get(`${this.baseUrl}/tegb/accounts`, {
      headers: this.getHeaders(),
    });
    return response;
  }
}

