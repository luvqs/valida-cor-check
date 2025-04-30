
import React from 'react';
import logoSvg from '@/assets/logo-2024-preto.svg';

const LucasVasquesLogo: React.FC = () => {
  return (
    <a 
      href="https://lucasvasques.com.br/contato/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block"
    >
      <img 
        src={logoSvg} 
        alt="Logo Lucas Vasques" 
        className="h-4 inline-block"
      />
    </a>
  );
};

export default LucasVasquesLogo;
