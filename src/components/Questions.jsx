import '../styles/Questions.css';
import { useState, useEffect } from 'react';

export default function Questions({ randomCountries, setAnswerCounter }) {
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [answered, setAnswered] = useState(false);

	const [questionData, setQuestionData] = useState({
		question: '',
		options: [],
		correctAnswer: '',
	});

	const generateQuestion = () => {
		if (!randomCountries || randomCountries.length < 4) return;

		const correctCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];

		const incorrectCountries = [];
		const usedRegions = [correctCountry.region];

		while (incorrectCountries.length < 3) {
			const randomCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];

			if (
				randomCountry !== correctCountry &&
				!incorrectCountries.includes(randomCountry) &&
				!usedRegions.includes(randomCountry.region)
			) {
				incorrectCountries.push(randomCountry);
				usedRegions.push(randomCountry.region);
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
		setAnswered(false);
	};

	const answerChoice = (option) => {
		setSelectedAnswer(option);
		setAnswered(true);

		setTimeout(() => {
			setSelectedAnswer(null);
			setAnswerCounter(prev => prev + 1);
			generateQuestion();
		}, 3000);
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
						<li
							key={index}
							className={`answer`}
							style={{
								background: selectedAnswer === option ? 'linear-gradient(#E65895, #BC6BE8)' : '',
							}}
							onClick={() => answerChoice(option)}>
							{option}
							{answered && (
								<img
									src={
										option === questionData.correctAnswer
											? "Check_round_fill.svg"
											: (option === selectedAnswer ? "Close_round_fill.svg" : "")
									}
									alt={
										option === questionData.correctAnswer
											? "Correct answer"
											: (option === selectedAnswer ? "Incorrect answer" : "")
									}
									className="answer-image"
								/>
							)}
						</li>
					))}
				</ul>
			</div>
		</>
	)
}