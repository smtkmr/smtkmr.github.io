import React from 'react';

export const EconovaHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#2dd4bf] border-b-4 border-[#10b981] shadow-sm">
      <div className="w-full max-w-[1700px] min-h-[80px] md:min-h-[110px] mx-auto px-[4%] md:px-[5.7%] flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#main"
          className="inline-flex items-center gap-3.5 text-white font-[900] text-3xl md:text-5xl tracking-[-1.5px] no-underline hover:opacity-95 transition-opacity"
        >
          <span className="grid place-items-center w-11 h-11 md:w-16 md:h-16 rounded-[16px] md:rounded-[21px] bg-[#fde047] text-[#059669] font-[900] text-3xl md:text-4xl -rotate-8 shadow-sm">
            ✦
          </span>
          <span className="font-['Outfit',sans-serif]">
            Econova<em className="text-[#fde047] not-italic">.vip</em>
          </span>
        </a>

        {/* Navigation links */}
        <nav className="flex items-center gap-5 md:gap-9">
          <a
            href="#wow-playground"
            className="hidden md:inline-block text-white font-[700] text-lg hover:underline underline-offset-4 font-['Quicksand',sans-serif]"
          >
            Our classes
          </a>
          <a
            href="#big-objects"
            className="hidden md:inline-block text-white font-[700] text-lg hover:underline underline-offset-4 font-['Quicksand',sans-serif]"
          >
            Explore &amp; learn
          </a>
          <a
            href="#practice"
            className="hidden md:inline-block text-white font-[700] text-lg hover:underline underline-offset-4 font-['Quicksand',sans-serif]"
          >
            Services
          </a>
          <a
            href="#practice"
            className="inline-flex items-center justify-center gap-3 px-5 md:px-7 py-3 md:py-3.5 rounded-[18px] md:rounded-[23px] bg-[#10b981] hover:bg-[#059669] text-white font-[900] text-sm md:text-lg shadow-[0_4px_0_#059669] transition-transform active:translate-y-1 font-['Outfit',sans-serif]"
          >
            Let’s learn <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
