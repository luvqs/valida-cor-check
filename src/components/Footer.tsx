
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 text-center text-[#363c4a] text-xs flex justify-center items-center gap-1.5 opacity-40">
      <span className="font-bold">ValidaCor</span> 
      <span>foi desenvolvido por</span> 
      <a 
        href="https://lucasvasques.com.br/" 
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium hover:underline"
      >
        @luvqs
      </a>
    </footer>
  );
};

export default Footer;
