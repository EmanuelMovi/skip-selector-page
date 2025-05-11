import React from "react";

interface SkipCardProps {
  size: number;
  price: number;
  hirePeriodDays: number;
  isSelected: boolean;
  onSelect: () => void;
  allowedOnRoad?: boolean;
  allowsHeavyWaste?: boolean;
  disabled?: boolean;
  image: string;
}

const SkipCard: React.FC<SkipCardProps> = ({
  size,
  price,
  hirePeriodDays,
  isSelected,
  onSelect,
  allowedOnRoad = true,
  allowsHeavyWaste = true,
  disabled = false,
  image,
}) => {
  const isUnavailable = !allowsHeavyWaste;

  return (
    <div
      className={`relative w-[300px] h-[480px] flex flex-col justify-between rounded-3xl overflow-hidden border border-neutral-800 text-white transition-all duration-300
      ${
        isSelected
          ? "ring-2 ring-cyan-400 scale-[1.02] shadow-[0_0_40px_8px_rgba(6,182,212,0.6)]"
          : ""
      }
      bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-cyan-500/30 hover:-translate-y-1`}
    >
      {/* Image container */}
      <div className="flex justify-center px-4 pt-6 relative">
        <div className="bg-white rounded-2xl p-4 w-full h-[250px] flex items-center justify-center relative">
          <div className="absolute top-2 right-2 bg-cyan-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm z-10">
            {size} Yards
          </div>

          <img
            src={image}
            alt={`${size} Yard Skip`}
            className="h-[130px] object-contain transition-transform duration-300 hover:scale-105"
          />

          {!!(!allowedOnRoad || !allowsHeavyWaste) && (
            <div className="absolute bottom-2 left-2 right-2 flex flex-col items-start gap-1 bg-gradient-to-t from-black/60 to-transparent rounded-xl p-2">
              {!allowedOnRoad && (
                <p className="text-xs px-2 py-1 bg-yellow-500 text-black rounded w-fit">
                  ⚠ Not Allowed On The Road
                </p>
              )}
              {!allowsHeavyWaste && (
                <p className="text-xs px-2 py-1 bg-red-600 text-white rounded w-fit">
                  🚫 Not Suitable for Heavy Waste
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="px-5 pt-2 pb-5">
        <p className="text-xs text-gray-400">4.5 - UK</p>
        <h3 className="text-base font-semibold text-white mt-1 tracking-wide">
          {size} Yard Skip
        </h3>
        <p className="text-cyan-400 font-bold text-md mt-1">£{price}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {hirePeriodDays}-day hire
        </p>
      </div>
      <div className="px-4 pb-6">
        <button
          onClick={onSelect}
          disabled={disabled || isUnavailable}
          className={`w-full py-2 text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-1 
            ${
              isSelected
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:from-cyan-400 hover:to-blue-400"
                : "bg-neutral-800 text-white hover:bg-neutral-700"
            }
            ${disabled || isUnavailable ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isSelected ? (
            "Selected"
          ) : (
            <>
              Select This Skip <span className="text-lg">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
