import { useState, useEffect } from 'react';
import { NetworkService } from '../../infrastructure/network/network.service';

export function useNetworkStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(NetworkService.isOnline());

  useEffect(() => {
    const unsubscribe = NetworkService.addStatusListener((status) => {
      setIsOnline(status);
    });
    return unsubscribe;
  }, []);

  return isOnline;
}
