import React from 'react';
import { PlanSelection } from '@rimac/shared';

interface PlanInfoCardProps {
  planSelection: PlanSelection;
}

const PlanInfoCard: React.FC<PlanInfoCardProps> = ({ planSelection }) => {
  const { plan, isForSomeoneElse, discount, finalPrice } = planSelection;

  return (
    <div className="info-card">
      <div className="info-card__header">
        <div className="info-card__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"></path>
            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
            <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
            <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
          </svg>
        </div>
        <h3 className="info-card__title">Plan Seleccionado</h3>
      </div>

      <div className="info-card__content">
        <div className="info-card__item">
          <span className="info-card__label">Plan:</span>
          <span className="info-card__value">{plan.name}</span>
        </div>

        <div className="info-card__item">
          <span className="info-card__label">Precio base:</span>
          <span className="info-card__value">S/ {plan.price}</span>
        </div>

        {discount > 0 && (
          <div className="info-card__item">
            <span className="info-card__label">Descuento:</span>
            <span className="info-card__value text-green-600">-S/ {discount}</span>
            <span className="info-card__description">
              (5% por ser para otra persona)
            </span>
          </div>
        )}

        <div className="info-card__item">
          <span className="info-card__label">Total:</span>
          <span className="info-card__value text-rimac-red font-bold text-lg">
            S/ {finalPrice}
          </span>
        </div>

        <div className="info-card__item">
          <span className="info-card__label">Para:</span>
          <span className="info-card__value">
            {isForSomeoneElse ? 'Otra persona' : 'Mí mismo'}
          </span>
        </div>
      </div>

      {/* Plan Benefits */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-rimac-blue mb-3">Beneficios incluidos:</h4>
        <div className="space-y-2">
          {plan.description.map((benefit: string, index: number) => (
            <div key={index} className="flex items-start space-x-2">
              <svg
                className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              <span className="text-sm text-gray-600">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanInfoCard;
