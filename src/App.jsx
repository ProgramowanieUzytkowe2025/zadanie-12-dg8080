import './App.css'
import { AppCalculator } from './AppCalculator'
import { AppHeader } from './AppHeader'
import { FontProvider } from './FontProvider';

export default function App() {
  return (
    <FontProvider>
      <div className="app">
        <div>
          <AppHeader imie={'Dominika'} nazwisko={'Gugała'}/>
        </div>
        <div>
          <AppCalculator />
        </div>
      </div>
    </FontProvider>
  )
}