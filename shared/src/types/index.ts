// User types
export interface User {
  name: string;
  lastName: string;
  birthDay: string;
}

// Plan types
export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

export interface PlansResponse {
  list: Plan[];
}

// Form types
export interface UserFormData {
  name: string;
  lastName: string;
  birthDay: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

// Plan selection types
export interface PlanSelection {
  plan: Plan;
  isForSomeoneElse: boolean;
  discount: number;
  finalPrice: number;
}

// Application state
export interface AppState {
  user: User | null;
  userFormData: UserFormData | null;
  plans: Plan[];
  selectedPlan: PlanSelection | null;
  currentStep: 'home' | 'planes' | 'resumen';
}

// API response types
export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

// Component props
export interface MicrofrontendProps {
  onNavigate?: (step: AppState['currentStep']) => void;
  onDataChange?: (data: any) => void;
}

// Event types for communication between microfrontends
export interface MicrofrontendEvent {
  type: 'USER_DATA_UPDATED' | 'PLAN_SELECTED' | 'NAVIGATION_REQUESTED';
  payload: any;
}
