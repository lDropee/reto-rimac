import { User, PlansResponse, ApiResponse } from '../types';

const API_BASE_URL = 'https://rimac-front-end-challenge.netlify.app/api';

export class ApiService {
  private static async fetchData<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        data,
        loading: false,
        error: null
      };
    } catch (error) {
      return {
        data: null as T,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  static async getUser(): Promise<ApiResponse<User>> {
    return this.fetchData<User>(`${API_BASE_URL}/user.json`);
  }

  static async getPlans(): Promise<ApiResponse<PlansResponse>> {
    return this.fetchData<PlansResponse>(`${API_BASE_URL}/plans.json`);
  }
}

// Utility function to calculate age from birth date
export const calculateAge = (birthDay: string): number => {
  const today = new Date();
  const birthDate = new Date(birthDay);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Utility function to filter plans by age
export const filterPlansByAge = (plans: any[], userAge: number) => {
  return plans.filter(plan => plan.age >= userAge);
};

// Utility function to calculate discount
export const calculateDiscount = (price: number, isForSomeoneElse: boolean): number => {
  return isForSomeoneElse ? price * 0.05 : 0;
};
