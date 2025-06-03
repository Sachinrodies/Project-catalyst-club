import React from 'react';
import Logo from '../../assets/Logo.svg';

interface CatalystLogoProps {
  className?: string;
}

const CatalystLogo: React.FC<CatalystLogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <img src={Logo} alt="Catalyst Logo" className={className} />
  );
};

export default CatalystLogo;