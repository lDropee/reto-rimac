import React from 'react';
import { Plan, calculateDiscount } from '@rimac/shared';
import IcHomeLight from "../assets/IcHomeLight.png"; 
import IcHospitalLight from "../assets/IcHospitalLight.png"; 

interface PlanCardProps {
  plan: Plan;
  isForSomeoneElse: boolean;
  isSelected: boolean;
  onSelect: (plan: Plan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isForSomeoneElse, isSelected, onSelect }) => {
  const discount = calculateDiscount(plan.price, isForSomeoneElse);
  const finalPrice = plan.price - discount;

  // Determine if this is the recommended plan (Plan en Casa y Clínica)
  const isRecommended = plan.name === 'Plan en Casa y Clínica';

  // Get icon based on plan name
  const getPlanIcon = () => {
    if (plan.name.includes('Clínica')) {
      return (
        <img
          src={IcHospitalLight}
          alt="Rimac logo"
          className="h-12"
        />
      );
    } else if (plan.name.includes('Chequeo')) {
      return (
        <img
          src={IcHomeLight}
          alt="Rimac logo"
          className="h-12"
        />
      );
    } else {
      return (
        <img
          src={IcHomeLight}
          alt="Rimac logo"
          className="h-12"
        />
      );
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200 border-2 ${
        isSelected ? 'border-rimac-red' : 'border-transparent'
      } relative`}
      onClick={() => onSelect(plan)}
    >
      {/* Recommended Plan Tag */}
      {isRecommended && (
        <div className="absolute -top-3 left-4 bg-rimac-green text-rimac-dark text-xs font-bold px-3 py-1 rounded-full">
          Plan recomendado
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          {/* Left side - Plan info */}
          <div className="flex-1">
            {/* Plan Name */}
            <h3 className="text-xl font-bold text-rimac-neutral mb-5">
              {plan.name}
            </h3>
            
            {/* Cost Label */}
            <div className="text-sm text-rimac-neutral-600 uppercase mb-1">
              COSTO DEL PLAN
            </div>

            {/* Original Price if discount */}
            {discount > 0 && (
              <div className="mt-1">
                <span className="text-sm text-rimac-neutral-600 line-through">
                  ${plan.price} antes
                </span>
              </div>
            )}
            
            {/* Price */}
            <div className="text-2xl mt-1 font-bold text-rimac-neutral">
              ${finalPrice} al mes
            </div>
            

          </div>

          {/* Right side - Icon */}
          <div className="w-12 h-12 flex items-center justify-center ml-4">
            {getPlanIcon()}
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-3 mb-6 flex-1">
          {plan.description.map((benefit: string, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-rimac-neutral rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-rimac-neutral leading-relaxed">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* Select Button */}
        <button
          className="w-full bg-rimac-red text-white py-3 px-6 rounded-3xl font-bold hover:bg-red-600 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(plan);
          }}
        >
          Seleccionar Plan
        </button>
      </div>
    </div>
  );
};

export default PlanCard;