import React from 'react';

export const EconovaFooter: React.FC = () => {
  return (
    <footer className="w-full mt-12 py-8 px-[4%] md:px-[5.7%] border-t-2 border-[#a7f3d0] bg-white text-[#1f2937] font-['Quicksand',sans-serif]">
      <div className="w-full max-w-[1700px] min-h-[60px] mx-auto flex flex-col md:flex-row items-center justify-between flex-wrap gap-4 text-center md:text-left">
        <a
          href="#main"
          className="text-[#059669] font-[900] text-2xl md:text-3xl tracking-[-0.7px] font-['Outfit',sans-serif]"
        >
          Econova.vip ✦
        </a>
        <p className="text-[#1f2937] font-[600] text-sm md:text-base">
          © 2026 Econova.vip · Made for little minds with big ideas.
        </p>
        <nav className="flex items-center justify-center flex-wrap gap-5 text-sm md:text-base font-[700]">
          <a href="#wow-playground" className="hover:text-[#059669] hover:underline">
            Classes
          </a>
          <a href="#big-objects" className="hover:text-[#059669] hover:underline">
            Explore
          </a>
          <a href="#practice" className="hover:text-[#059669] hover:underline">
            Services
          </a>
          <a href="mailto:econovavip@gmail.com" className="hover:text-[#059669] hover:underline">
            Contact
          </a>
          <a href="#main" className="text-[#059669] hover:underline font-[800]">
            Back to top ↑
          </a>
        </nav>
      </div>
    </footer>
  );
};
