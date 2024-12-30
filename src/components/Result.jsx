import '../styles/Result.css'

export default function Result({ correctAnswers, setAnswerCounter, setCorrectAnswers }) {
	const startOver = () => {
		setAnswerCounter(1);
		setCorrectAnswers(0);
	}

	return (
		<div className='result'>
			<img className='result-image' src="congrats.svg" alt="Congratulations!" />
			<h1 className='result-title'>Congrats! You completed the quiz.</h1>
			<p className='result-counter'>You answer {correctAnswers}/10 correctly</p>
			<button className='result-repeat' onClick={() => startOver()}>Play again</button>
		</div>
	)
}