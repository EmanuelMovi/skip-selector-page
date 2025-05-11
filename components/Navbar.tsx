"use client";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0f1c]/80 backdrop-blur-md shadow-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile stepper*/}
        <div className="block md:hidden text-sm text-white px-4 space-y-1">
          <div className="flex justify-between flex-wrap gap-x-2">
            <div className="flex items-center gap-1 text-left text-white/60 min-w-[100px]">
              Postcode <span className="text-white/60">→</span>
            </div>
            <div className="flex items-center gap-1 text-left text-white/60 min-w-[100px]">
              Waste Type <span className="text-white/60">→</span>
            </div>
            <div className="flex items-center gap-1 text-cyan-400 font-semibold min-w-[100px]">
              Select Skip
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-glow" />
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-x-2">
            <div className="flex items-center gap-1 text-left text-white/60 min-w-[100px]">
              Permit Check <span className="text-white/60">→</span>
            </div>
            <div className="flex items-center gap-1 text-left text-white/60 min-w-[100px]">
              Choose Date <span className="text-white/60">→</span>
            </div>
            <div className="flex items-center gap-1 text-left text-white/60 min-w-[100px]">
              Payment
            </div>
          </div>
        </div>

        {/* Desktop stepper*/}
        <div className="hidden md:flex justify-center items-center gap-4 text-sm xl:text-lg xl:gap-6 text-white">
          <span className="opacity-60">Postcode</span>
          <span className="opacity-60">→</span>
          <span className="opacity-60">Waste Type</span>
          <span className="opacity-60">→</span>
          <span className="text-cyan-400 font-semibold">Select Skip</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-glow" />
          <span className="opacity-60">→</span>
          <span className="opacity-60">Permit Check</span>
          <span className="opacity-60">→</span>
          <span className="opacity-60">Choose Date</span>
          <span className="opacity-60">→</span>
          <span className="opacity-60">Payment</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
