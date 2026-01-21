import { useState } from "react";

export function useKalkulator() {
    const [wynik, setWynik] = useState();
    const [historia, setHistoria] = useState(() => {
        const saved = sessionStorage.getItem("History");
        return saved ? JSON.parse(saved) : [];
    });
    function handleOperation(liczbaA, liczbaB, operator){
        let wynikOperacji; 
        switch(operator) {
            case "+": 
                wynikOperacji = liczbaA + liczbaB;
                break;
            case "-": 
                wynikOperacji = liczbaA - liczbaB;
                break;
            case "*": 
                wynikOperacji = liczbaA * liczbaB;
                break;
            case "/": 
                wynikOperacji = liczbaA / liczbaB;
                break;
            default: 
                wynikOperacji = null;
                break;       
        }
        setWynik(wynikOperacji);
        setHistoria(prevHistoria => {
            const nowaHistoria = [...prevHistoria, {a: liczbaA, b: liczbaB, operation: operator, wynik: wynikOperacji}];
            sessionStorage.setItem("History", JSON.stringify(nowaHistoria));
            return nowaHistoria;
        });
    }
    return { wynik, setWynik, historia, setHistoria, handleOperation }
}