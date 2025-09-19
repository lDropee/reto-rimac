import React from 'react';
import { User, UserFormData } from '@rimac/shared';

interface UserInfoCardProps {
  user: User;
  userFormData: UserFormData | null;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user, userFormData }) => {
  return (
    <div className="info-card">
      <div className="info-card__header">
        <div className="info-card__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h3 className="info-card__title">Información Personal</h3>
      </div>

      <div className="info-card__content">
        <div className="info-card__item">
          <span className="info-card__label">Nombres:</span>
          <span className="info-card__value">{user.name}</span>
        </div>

        <div className="info-card__item">
          <span className="info-card__label">Apellidos:</span>
          <span className="info-card__value">{user.lastName}</span>
        </div>

        <div className="info-card__item">
          <span className="info-card__label">Fecha de nacimiento:</span>
          <span className="info-card__value">
            {new Date(user.birthDay).toLocaleDateString('es-ES')}
          </span>
        </div>

        {userFormData && (
          <>
            <div className="info-card__item">
              <span className="info-card__label">Documento:</span>
              <span className="info-card__value">
                {userFormData.documentType.toUpperCase()}: {userFormData.documentNumber}
              </span>
            </div>

            <div className="info-card__item">
              <span className="info-card__label">Teléfono:</span>
              <span className="info-card__value">{userFormData.phone}</span>
            </div>

            <div className="info-card__item">
              <span className="info-card__label">Email:</span>
              <span className="info-card__value">{userFormData.email}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
