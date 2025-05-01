
import React from 'react';
import LucasVasquesLogo from './LucasVasquesLogo';
import AdBanner from './AdBanner';

const Footer = () => {
  return (
    <footer className="mt-8 py-4 text-[#01212C] opacity-40 flex flex-col items-center">
      <AdBanner />
      <div className="text-center text-xs flex justify-center items-center gap-1.5 mt-4">
        <span className="font-bold">ValidaCor</span> 
        <span>foi desenvolvido por</span> 
        <LucasVasquesLogo />
      </div>
    </footer>
  );
};

export default Footer;
