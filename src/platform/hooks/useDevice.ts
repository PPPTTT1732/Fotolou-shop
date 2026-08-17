import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isStandalone: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  hasTouch: boolean;
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isStandalone: false,
    isIOS: false,
    isAndroid: false,
    hasTouch: false,
  });

  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream: unknown }).MSStream;
    const isAndroid = /Android/.test(ua);
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isStandalone,
        isIOS,
        isAndroid,
        hasTouch,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
}
