import React, { useState } from 'react';
import { Plan, calculateDiscount } from '@rimac/shared';
import PlanCard from './PlanCard';
import PlanSlider from './PlanSlider';

interface PlanSelectionProps {
  plans: Plan[];
  userAge: number;
  onPlanSelect: (plan: Plan, isForSomeoneElse: boolean) => void;
  isForSomeoneElse: boolean;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ plans, userAge, onPlanSelect, isForSomeoneElse }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    onPlanSelect(plan, isForSomeoneElse);
  };

  if (plans.length === 0) {
    return (
      <div className="rimac-card text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          No hay planes disponibles
        </h2>
        <p className="text-gray-600">
          No se encontraron planes para tu edad ({userAge} años)
        </p>
      </div>
    );
  }

  return (
    <div className="plan-selection">

      {/* Plans Grid (Desktop) */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            isForSomeoneElse={isForSomeoneElse}
            isSelected={selectedPlan?.name === plan.name}
            onSelect={handlePlanSelect}
          />
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Desliza para ver más planes
        </h3>
        <PlanSlider
          plans={plans}
          isForSomeoneElse={isForSomeoneElse}
          selectedPlan={selectedPlan}
          onPlanSelect={handlePlanSelect}
        />
      </div>
    </div>
  );
};

export default PlanSelection;
