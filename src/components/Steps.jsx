import '../styles/Steps.css';

export default function Steps({ answerCounter }) {
	const stepsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<ul className='steps'>
			{stepsArr.map((step, index) => {
				return <li key={index} className={`step ${step <= answerCounter ? 'step-taken' : ''}`}>{step}</li>
			})}
		</ul>
	)
}