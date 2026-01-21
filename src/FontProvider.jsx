import { useState } from 'react';
import { FontContext } from './FontContext';

export const FontProvider = ({ children }) => {
  const [czcionka, setCzcionka] = useState('small');

  return (
    <FontContext.Provider value={{ czcionka, setCzcionka }}>
      {children}
    </FontContext.Provider>
  );
}

