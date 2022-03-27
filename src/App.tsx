import React from 'react';
import Die, { DieProbs } from './components/Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import './App.css';

function App() {

  /**
   * returns an array of 10 random DieProps
   */
  function allNewDice(): DieProbs[] {
    const newDice: DieProbs[] = []
    for (let i = 0; i < 10; i++) {
      const number = Math.ceil(Math.random() * 6)
      const id = nanoid()
      const die = {value: number, isHeld: false, id: id, hold: () => hold(id)}
      newDice.push(die)
    }
    return newDice
  }

  function roll() {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
      return
    }
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    }))
  }

  const [dice, setDice] = React.useState(allNewDice())

  function hold(id: string): void {
    setDice(oldDice => oldDice.map(die => {
      return id === die.id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function createDieElement(die: DieProbs): JSX.Element {
    return <Die 
            value={die.value} 
            isHeld={die.isHeld} 
            id={die.id} 
            hold={die.hold}
            key={die.id} 
          />
  }

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const value = dice[0].value
    const allSame = dice.every(die => die.value === value)
    if (allHeld && allSame) {
      setTenzies(true)
    }}, [dice]
  )

  return (
    <main>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click to lock.</p>
      <div className='dice-container'>
      {dice.map(die => createDieElement(die))}
      </div>
      <button onClick={roll} className="roll-dice">
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
