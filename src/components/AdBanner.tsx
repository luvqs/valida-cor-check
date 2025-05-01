
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const AdBanner = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`w-full ${isMobile ? 'h-16' : 'h-24'} bg-gray-100/50 rounded-md flex items-center justify-center border border-gray-200/30`}>
      <div className="text-sm text-gray-400">
        Google Ads Banner Area
      </div>
    </div>
  );
};

export default AdBanner;
