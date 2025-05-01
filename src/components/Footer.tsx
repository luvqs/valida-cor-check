
import React from 'react';
import LucasVasquesLogo from './LucasVasquesLogo';

const Footer = () => {
  return (
    <footer className="mt-8 py-4 text-center text-[#01212C] text-xs flex justify-center items-center gap-1.5 opacity-40">
      <span className="font-bold">ValidaCor</span> 
      <span>foi desenvolvido por</span> 
      <LucasVasquesLogo />
    </footer>
  );
};

export default Footer;
