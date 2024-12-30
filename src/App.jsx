import { useState, useEffect } from 'react'
import './App.css'
import Steps from './components/Steps'
import Questions from './components/Questions'

export default function App() {
  const [countries, setCountries] = useState([]);
  const [randomCountries, setRandomCountries] = useState([]);
  const [answerCounter, setAnswerCounter] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cashedData = localStorage.getItem('countries');
        if (cashedData) {
          setCountries(JSON.parse(cashedData));
        } else {
          try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            setCountries(data);
            localStorage.setItem('countries', JSON.stringify(data));
          } catch (error) {
            console.error('Error loading data:', error)
          }
        }
      } catch (error) {
        console.error('Error reading data from localStorage:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Countries changed:', countries);
    if (countries.length > 0) {
      const selectRandomCountries = () => {
        const selected = [];
        const copy = [...countries];

        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * copy.length);
          selected.push(copy[randomIndex]);
          copy.splice(randomIndex, 1);
        }

        return selected;
      };

      setRandomCountries(selectRandomCountries());
    }
  }, [countries]);

  return (
    <div className='game-quiz'>
      <h1 className='title'>Country Quiz</h1>
      <Steps
        answerCounter={answerCounter}
      />
      <Questions
        randomCountries={randomCountries}
        setAnswerCounter={setAnswerCounter}
      />
    </div>
  )
}
