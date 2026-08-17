import { ApiClient } from './apiClient';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  role: 'client' | 'pro';
  provider?: string;
}

export const AuthService = {
  async sendOtp(phone: string): Promise<{ success: boolean; demoCode?: string }> {
    try {
      return await ApiClient.post('/auth/otp/send', { phone });
    } catch {
      // Graceful offline fallback
      return { success: true, demoCode: '123456' };
    }
  },

  async verifyOtp(phone: string, otp: string): Promise<{ success: boolean; token: string; user: AuthUser }> {
    try {
      const res = await ApiClient.post('/auth/otp/verify', { phone, otp });
      if (res.token) {
        ApiClient.setToken(res.token);
      }
      return res;
    } catch {
      // Graceful offline fallback
      const token = `jwt_mock_${Date.now()}`;
      ApiClient.setToken(token);
      return {
        success: true,
        token,
        user: {
          id: 'usr_mock',
          name: 'Bakary Diassy',
          phone,
          role: 'client',
        },
      };
    }
  },

  async loginWithOAuth(provider: 'google' | 'apple'): Promise<{ success: boolean; token: string; user: AuthUser }> {
    try {
      const res = await ApiClient.post('/auth/oauth', { provider });
      if (res.token) {
        ApiClient.setToken(res.token);
      }
      return res;
    } catch {
      const token = `jwt_mock_${Date.now()}`;
      ApiClient.setToken(token);
      return {
        success: true,
        token,
        user: {
          id: 'usr_mock',
          name: 'Bakary Diassy',
          phone: '+221 77 862 70 52',
          role: 'client',
          provider,
        },
      };
    }
  },

  logout(): void {
    ApiClient.removeToken();
  },
};
