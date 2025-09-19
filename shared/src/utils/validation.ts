export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationErrors {
  [key: string]: string | null;
}

export const validateField = (value: any, rules: ValidationRule): string | null => {
  if (rules.required && (!value || value.toString().trim() === '')) {
    return 'Este campo es obligatorio';
  }

  if (value && rules.minLength && value.toString().length < rules.minLength) {
    return `Mínimo ${rules.minLength} caracteres`;
  }

  if (value && rules.maxLength && value.toString().length > rules.maxLength) {
    return `Máximo ${rules.maxLength} caracteres`;
  }

  if (value && rules.pattern && !rules.pattern.test(value.toString())) {
    return 'Formato inválido';
  }

  if (value && rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (data: Record<string, any>, rules: Record<string, ValidationRule>): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const fieldValue = data[field];
    const error = validateField(fieldValue, fieldRules);
    
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Specific validation rules for the RIMAC forms
export const userFormValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  },
  birthDay: {
    required: true,
    custom: (value: string) => {
      if (!value) return 'Este campo es obligatorio';
      
      const date = new Date(value);
      const today = new Date();
      
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }
      
      if (date > today) {
        return 'La fecha no puede ser futura';
      }
      
      const age = today.getFullYear() - date.getFullYear();
      if (age < 18) {
        return 'Debe ser mayor de 18 años';
      }
      
      return null;
    }
  },
  documentType: {
    required: true
  },
  documentNumber: {
    required: true,
    minLength: 8,
    maxLength: 12,
    pattern: /^[0-9]+$/
  },
  phone: {
    required: true,
    pattern: /^[0-9]{9}$/
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  acceptTerms: {
    required: true,
    custom: (value: boolean) => value ? null : 'Debe aceptar los términos y condiciones'
  },
  acceptPrivacy: {
    required: true,
    custom: (value: boolean) => value ? null : 'Debe aceptar la política de privacidad'
  }
};
