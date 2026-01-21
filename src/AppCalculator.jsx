import './AppCalculator.css';
import { useState, useEffect, useReducer } from 'react';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './useKalkulator';

function actionReducer(state, action) {
    switch(action.type) {
        case "init":
            return "Brak";
        case "modified_A":
            return "Zmodyfikowano wartość liczby A";
        case "modified_B":
            return "Zmodyfikowano wartość liczby B";
        case "used_kalkulator":
            return "Wykonano obliczenia";
        case "restored_history":
            return "Przywrócono historyczny stan";
        default:
            return state;
    }
}

export function AppCalculator() {
    const [liczbaA, setLiczbaA] = useState(null);
    const [liczbaB, setLiczbaB] = useState(null);
    const [porownanie, setPorownanie] = useState("");
    const { wynik, setWynik, historia, setHistoria, handleOperation } = useKalkulator();
    const [lastAction, dispatch] = useReducer(actionReducer, "Brak");

    if (historia.length > 0) {
        const last = historia[historia.length - 1];
        if (last.a !== liczbaA) setLiczbaA(last.a);
        if (last.b !== liczbaB) setLiczbaB(last.b);
        if (last.wynik !== wynik) setWynik(last.wynik);
    }
    
    useEffect(()=>{
        return()=>{
            if(liczbaA === liczbaB) {
                setPorownanie('Liczba A jest równa liczbie B.');
            } else if(liczbaA > liczbaB) {
                setPorownanie('Liczba A jest większa od liczby B.');
            } else {
                setPorownanie('Liczba B jest większa od liczby A.');
            }
        }
    }, [liczbaA, liczbaB])

    function liczbaAOnChange(value) {
        setLiczbaA(parsujLiczbe(value));
        dispatch({ type: "modified_A" });
    }

    function parsujLiczbe(value) {
        const sparsowanaLiczba = parseFloat(value);
        if(isNaN(sparsowanaLiczba)) {
            return null;
        } else {
            return sparsowanaLiczba;
        } 
    }

    function liczbaBOnChange(value) {
        setLiczbaB(parsujLiczbe(value));
        dispatch({ type: "modified_B" });
    }

    function handleOperationDispatch(a, b, operator) {
        handleOperation(a, b, operator);
        dispatch({ type: "used_kalkulator" });
    }

    function onAppCalculationHistoryClick(index) {
        const nowaHistoria = historia.slice(0, index + 1);
        setHistoria(nowaHistoria);
        setLiczbaA(historia[index].a);
        setLiczbaB(historia[index].b);
        setWynik(historia[index].wynik);
        sessionStorage.setItem("History", JSON.stringify(nowaHistoria));
        dispatch({ type: "restored_history" });
    }

    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

    return (
    <div className='app-calculator'>
        <div className='app-calculator-pole'>
            <label>Wynik: </label>
            <span>{wynik}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label>Dynamiczne porównanie liczb: </label>
            <span>{porownanie}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label htmlFor="liczba1">Liczba 1</label>
            <input id="liczba1" type="number" value={liczbaA} onChange={(e) => liczbaAOnChange(e.target.value)} name="liczba1" />
        </div>
        <div className='app-calculator-pole'>
            <label htmlFor="liczba2">Liczba 2</label>
            <input id="liczba2" type="number" value={liczbaB} onChange={(e) => liczbaBOnChange(e.target.value)} name="liczba2" />
        </div>

        <hr />

        <div className='app-calculator-przyciski'>
            <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => handleOperationDispatch(liczbaA, liczbaB, "+")}/>
            <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => handleOperationDispatch(liczbaA, liczbaB, "-")}/>
            <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => handleOperationDispatch(liczbaA, liczbaB, "*")}/>
            <AppButton disabled={zablokujDzielenie} title="/" onClick={() => handleOperationDispatch(liczbaA, liczbaB, "/")}/>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label>Ostatnia czynność: </label>
            <span><strong>{lastAction}</strong></span>
        </div>

        <hr />
        
        <div className='app-calculator-historia'>
            <AppCalculationHistory historia={historia} onClick={(index) => onAppCalculationHistoryClick(index)}/>
        </div>
    </div>)
}