import { useState, useEffect } from 'react'
import './App.css'
import Steps from './components/Steps'
import Questions from './components/Questions'
import Result from './components/Result'

export default function App() {
  const [countries, setCountries] = useState([]);
  const [randomCountries, setRandomCountries] = useState([]);
  const [answerCounter, setAnswerCounter] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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
            const filteredData = data.filter(
              (country) =>
                country.capital &&
                country.capital.length > 0 &&
                country.region &&
                country.flags &&
                country.currencies &&
                Object.keys(country.currencies).length > 0
            );
            setCountries(filteredData);
            localStorage.setItem('countries', JSON.stringify(filteredData));
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
      {answerCounter <= 10 ? (
        <>
          <h1 className='title'>Country Quiz</h1>
          <Steps
            answerCounter={answerCounter}
            correctAnswers={correctAnswers}
          />
          <Questions
            randomCountries={randomCountries}
            answerCounter={answerCounter}
            setAnswerCounter={setAnswerCounter}
            setCorrectAnswers={setCorrectAnswers}
          />
        </>
      ) : (
        <Result
          correctAnswers={correctAnswers}
          setAnswerCounter={setAnswerCounter}
          setCorrectAnswers={setCorrectAnswers}
        />
      )}
    </div>
  )
}
