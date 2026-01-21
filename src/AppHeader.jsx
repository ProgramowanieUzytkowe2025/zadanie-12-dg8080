import React, { useContext } from 'react';
import { FontContext } from './FontContext';

export function AppHeader({ imie, nazwisko }) {
  const { czcionka, setCzcionka } = useContext(FontContext);
  const czcionki = ['small', 'medium', 'large'];

  const rozmiaryCzcionek = {
    small: '14px',
    medium: '20px',
    large: '28px'
  };

  return (
    <div style={{ fontSize: rozmiaryCzcionek[czcionka] }}>
      <h2>{imie} {nazwisko}</h2>
      <div>
        {czcionki.map(c => (
          <span
            key={c}
            onClick={() => setCzcionka(c)}
            style={{fontSize: rozmiaryCzcionek[c]}}> A </span>
        ))}
      </div>
    </div>
  );
}
