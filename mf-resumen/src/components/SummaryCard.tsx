import React from 'react';
import { PlanSelection, User } from '@rimac/shared';

interface SummaryCardProps {
  planSelection: PlanSelection;
  user: User;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ planSelection, user }) => {
  const { plan, isForSomeoneElse, discount, finalPrice } = planSelection;

  return (
    <div className="summary-card">
      <div className="summary-card__header">
        <h2 className="summary-card__title">Resumen de Compra</h2>
        <p className="summary-card__subtitle">
          {isForSomeoneElse ? 'Plan para otra persona' : 'Plan para ti'}
        </p>
      </div>

      <div className="summary-card__content">
        <div className="summary-card__item">
          <span className="summary-card__label">Plan seleccionado:</span>
          <span className="summary-card__value">{plan.name}</span>
        </div>

        <div className="summary-card__item">
          <span className="summary-card__label">Precio base:</span>
          <span className="summary-card__value">S/ {plan.price}</span>
        </div>

        {discount > 0 && (
          <div className="summary-card__item">
            <span className="summary-card__label">Descuento (5%):</span>
            <span className="summary-card__value text-green-600">-S/ {discount}</span>
          </div>
        )}

        <div className="summary-card__item">
          <span className="summary-card__label">Asegurado:</span>
          <span className="summary-card__value">
            {user.name} {user.lastName}
          </span>
        </div>

        <div className="summary-card__item">
          <span className="summary-card__label">Fecha de nacimiento:</span>
          <span className="summary-card__value">
            {new Date(user.birthDay).toLocaleDateString('es-ES')}
          </span>
        </div>
      </div>

      <div className="summary-card__total">
        <span className="summary-card__total-label">Total a pagar:</span>
        <span className="summary-card__total-value">S/ {finalPrice}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
