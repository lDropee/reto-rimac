import React from 'react';
import { Plan } from '@rimac/shared';
import PlanCard from './PlanCard';

interface PlanSliderProps {
  plans: Plan[];
  isForSomeoneElse: boolean;
  selectedPlan: Plan | null;
  onPlanSelect: (plan: Plan) => void;
}

const PlanSlider: React.FC<PlanSliderProps> = ({ 
  plans, 
  isForSomeoneElse, 
  selectedPlan, 
  onPlanSelect 
}) => {
  return (
    <div className="plan-slider">
      <div className="plan-slider__container">
        {plans.map((plan) => (
          <div key={plan.name} className="plan-slider__item">
            <PlanCard
              plan={plan}
              isForSomeoneElse={isForSomeoneElse}
              isSelected={selectedPlan?.name === plan.name}
              onSelect={onPlanSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSlider;
