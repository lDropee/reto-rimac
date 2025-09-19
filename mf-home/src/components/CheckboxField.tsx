import React from 'react';

interface CheckboxFieldProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string | null;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  checked,
  onChange,
  error,
  label,
  required = false,
  disabled = false
}) => {
  return (
    <div className="user-form__checkbox-item">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
        disabled={disabled}
        className={`user-form__checkbox ${error ? 'border-red-500' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <label htmlFor={name} className="user-form__checkbox-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {error && (
        <div id={`${name}-error`} className="form-error mt-1" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default CheckboxField;
