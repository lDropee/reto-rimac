import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false
}) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`rimac-input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <div id={`${name}-error`} className="form-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;
