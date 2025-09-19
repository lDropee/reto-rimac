import React, { useState, useEffect } from 'react';
import { User, UserFormData, validateForm, ValidationErrors, ValidationRule } from '@rimac/shared';

interface UserFormProps {
  initialUserData: User | null;
  onSubmit: (data: UserFormData) => void;
}

// Validation rules for the simplified form
const simplifiedFormValidationRules: Record<string, ValidationRule> = {
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
  acceptTerms: {
    required: true,
    custom: (value: boolean) => value ? null : 'Debe aceptar los términos y condiciones'
  },
  acceptPrivacy: {
    required: true,
    custom: (value: boolean) => value ? null : 'Debe aceptar la política de privacidad'
  }
};

const UserForm: React.FC<UserFormProps> = ({ initialUserData, onSubmit }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: 'Usuario', // Default value for validation
    lastName: 'Test', // Default value for validation
    birthDay: '1990-01-01', // Default value for validation
    documentType: 'dni',
    documentNumber: '30216147',
    phone: '5130216147',
    email: 'test@example.com', // Default value for validation
    acceptTerms: true,
    acceptPrivacy: true
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with API data
  useEffect(() => {
    if (initialUserData) {
      setFormData(prev => ({
        ...prev,
        name: initialUserData.name,
        lastName: initialUserData.lastName,
        birthDay: initialUserData.birthDay
      }));
    }
  }, [initialUserData]);

  const handleInputChange = (field: keyof UserFormData, value: string | boolean) => {
    setFormData((prev: UserFormData) => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: ValidationErrors) => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    // Validate form
    const validationErrors = validateForm(formData, simplifiedFormValidationRules);
    console.log('Validation errors:', validationErrors);
    setErrors(validationErrors);

    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some(error => error !== null);
    console.log('Has errors:', hasErrors);
    
    if (hasErrors) {
      console.log('Form has validation errors, not submitting');
      return;
    }

    console.log('Form is valid, submitting...');
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Calling onSubmit with data:', formData);
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Document Type and Number */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Documento
          </label>
          <div className="relative">
            <select
              value={formData.documentType}
              onChange={(e) => handleInputChange('documentType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rimac-green focus:border-transparent appearance-none bg-white text-rimac-dark"
            >
              <option value="dni">DNI</option>
              <option value="ce">Carné de Extranjería</option>
              <option value="passport">Pasaporte</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nro. de documento
          </label>
          <input
            type="text"
            value={formData.documentNumber}
            onChange={(e) => handleInputChange('documentNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rimac-green focus:border-transparent text-rimac-dark"
            placeholder="Ingresa tu número de documento"
            required
          />
          {errors.documentNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.documentNumber}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Celular
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rimac-green focus:border-transparent text-rimac-dark"
          placeholder="999 999 999"
          required
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={formData.acceptPrivacy}
              onChange={(e) => handleInputChange('acceptPrivacy', e.target.checked)}
              className="w-4 h-4 text-rimac-dark bg-gray-100 border-gray-300 rounded focus:ring-rimac-dark focus:ring-2"
              required
            />
          </div>
          <div className="ml-3 font-medium text-sm">
            <label className="text-rimac-dark">
              Acepto la Política de Protección de Datos Personales y los Términos y Condiciones.
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              className="w-4 h-4 text-rimac-dark bg-gray-100 border-gray-300 rounded focus:ring-rimac-dark focus:ring-2"
              required
            />
          </div>
          <div className="ml-3 font-medium text-sm">
            <label className="text-rimac-dark">
              Acepto la Política de Envío de Comunicaciones Comerciales.
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Link */}
      <div className="text-sm font-semibold text-rimac-dark">
        <a href="#" className="hover:text-rimac-green underline">
          Aplican Términos y Condiciones.
        </a>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-rimac-dark text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-rimac-dark focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? 'Procesando...' : 'Cotiza aquí'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;