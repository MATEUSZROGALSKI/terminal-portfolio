'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppDefaults, defaultSettings } from '@/data/defaults';

// Create the context with default values
const AppContext = createContext<{
  defaults: AppDefaults;
  isLoading: boolean;
  isHydrated: boolean;
}>({
  defaults: defaultSettings,
  isLoading: true,
  isHydrated: false,
});

// Custom hook to use the app context
export const useAppContext = () => useContext(AppContext);

// Provider component
export function AppContextProvider({ children }: { children: ReactNode }) {
  const [defaults, setDefaults] = useState<AppDefaults>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  return (
    <AppContext.Provider value={{ defaults, isLoading, isHydrated }}>
      {children}
    </AppContext.Provider>
  );
} 