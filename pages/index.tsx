import { useEffect, useState } from "react";
import SkipCard from "../components/SkipCard";
import Navbar from "../components/Navbar";

interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export default function Home() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterAllowed, setFilterAllowed] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((res) => res.json())
      .then((data) => setSkips(data))
      .catch(console.error);
  }, []);

  const selectedSkip = skips.find((s) => s.id === selectedId);
  const totalPrice = selectedSkip
    ? Math.round(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100))
    : 0;

  const filteredSkips = [...skips].filter(
    (skip) => !filterAllowed || skip.allowed_on_road
  );

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-[#0a0c1b] via-[#111827] to-[#1a1c2e] text-white overflow-hidden px-6 py-10">
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[400px] h-[400px] bg-cyan-500 opacity-20 blur-3xl top-[-100px] left-[-100px] animate-pulse" />
          <div className="absolute w-[300px] h-[300px] bg-indigo-600 opacity-20 blur-2xl top-[50%] left-[60%] -translate-x-1/2 animate-ping" />
          <div className="absolute w-[250px] h-[250px] bg-pink-500 opacity-10 blur-3xl bottom-[100px] right-[50px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto pt-20">
          <div className="flex flex-col items-center mb-10">
            <h1 className="text-3xl font-bold text-center">
              Choose Your Skip Size
            </h1>
            <p className="text-sm text-gray-400 text-center mt-2 mb-10">
              Select the skip size that best suits your needs
            </p>

            <div className="w-full flex justify-center md:justify-end md:pr-18 lg:pr-26 xl:pr-20 mt-4 md:mt-0">
              <label className="flex items-center gap-2 text-sm cursor-pointer bg-white/10 px-3 py-1 rounded-full">
                <input
                  type="checkbox"
                  checked={filterAllowed}
                  onChange={(e) => setFilterAllowed(e.target.checked)}
                  className="form-checkbox accent-cyan-500"
                />
                Only allowed on road
              </label>
            </div>
          </div>

          <div className="flex justify-center pt-6 pb-32">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 xl:gap-x-28 xl:gap-y-20">
              {filteredSkips.map((skip) => (
                <SkipCard
                  key={skip.id}
                  size={skip.size}
                  price={skip.price_before_vat}
                  hirePeriodDays={skip.hire_period_days}
                  allowedOnRoad={skip.allowed_on_road}
                  allowsHeavyWaste={skip.allows_heavy_waste}
                  isSelected={skip.id === selectedId}
                  onSelect={() =>
                    setSelectedId((prev) => (prev === skip.id ? null : skip.id))
                  }
                  image="/images/skip.png"
                />
              ))}
            </div>
          </div>

          {selectedSkip && (
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 via-black/30 to-transparent backdrop-blur-md border-t border-white/10 shadow-lg px-4 py-3 sm:px-6 sm:py-3 z-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 w-full max-w-9xl mx-auto px-2 sm:px-3">
                <div className="text-sm text-center sm:text-left text-white">
                  <span className="font-medium mr-1">
                    {selectedSkip.size} Yard Skip
                  </span>
                  <span className="text-cyan-400 font-semibold text-base">
                    £{totalPrice}
                  </span>
                  <span className="text-sm font-normal text-white/70">
                    ({selectedSkip.hire_period_days} day hire)
                  </span>
                </div>
                <div className="flex gap-2 justify-center sm:justify-end w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="px-4 py-1.5 border border-white/20 rounded text-white text-sm hover:bg-white/10 transition"
                  >
                    Back
                  </button>

                  <button className="px-4 py-1.5 bg-cyan-500 text-white text-sm font-medium rounded hover:bg-cyan-600 transition">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
