import '../styles/Questions.css';
import { useState, useEffect } from 'react';

export default function Questions({ randomCountries }) {
	const [questionData, setQuestionData] = useState({
		question: '',
		options: [],
		correctAnswer: '',
	});

	const generateQuestion = () => {
		if (!randomCountries || randomCountries.length < 4) return;

		const correctCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];

		const incorrectCountries = [];
		while (incorrectCountries.length < 3) {
			const randomCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];
			if (randomCountry !== correctCountry && !incorrectCountries.includes(randomCountry)) {
				incorrectCountries.push(randomCountry);
			}
		}

		const questionTemplates = [
			{
				question: `What is the capital of ${correctCountry.name.common}?`,
				correctAnswer: correctCountry.capital ? correctCountry.capital[0] : 'Unknown',
				options: [
					...(incorrectCountries.map((c) => (c.capital ? c.capital[0] : 'Unknown'))),
					correctCountry.capital ? correctCountry.capital[0] : 'Unknown',
				].sort(() => Math.random() - 0.5),
			},
			{
				question: `In what region is ${correctCountry.name.common} located?`,
				correctAnswer: correctCountry.region,
				options: [
					...(incorrectCountries.map((c) => c.region)),
					correctCountry.region,
				].sort(() => Math.random() - 0.5),
			},
		];

		const randomQuestion = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];

		setQuestionData({
			question: randomQuestion.question,
			options: randomQuestion.options,
			correctAnswer: randomQuestion.correctAnswer,
		});
	};

	useEffect(() => {
		if (randomCountries && randomCountries.length >= 4) {
			generateQuestion();
		}
	}, [randomCountries]);

	return (
		<>
			<div className='questions'>
				<h1 className='question'>{questionData.question}</h1>
				<ul className='answers'>
					{questionData.options.map((option, index) => (
						<li key={index} className='answer'>
							{option}
						</li>
					))}
				</ul>
			</div>
		</>
	)
}