import '../styles/Questions.css';
import { useState, useEffect } from 'react';

export default function Questions({ randomCountries, answerCounter, setAnswerCounter, setCorrectAnswers }) {
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [answered, setAnswered] = useState(false);
	const [usedQuestions, setUsedQuestions] = useState([]);

	const [questionData, setQuestionData] = useState({
		question: '',
		options: [],
		correctAnswer: '',
		flag: null,
	});

	const generateQuestion = () => {
		if (randomCountries.length < 4) return;

		let correctCountry;
		do {
			correctCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];
		} while (usedQuestions.includes(correctCountry.name.common));

		const incorrectCountries = [];
		while (incorrectCountries.length < 3) {
			const randomCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];
			if (randomCountry !== correctCountry && !incorrectCountries.includes(randomCountry)) {
				incorrectCountries.push(randomCountry);
			}
		}

		const generateUniqueOptions = (getField) => {
			const uniqueOptions = new Set();
			incorrectCountries.forEach((country) => uniqueOptions.add(getField(country)));
			uniqueOptions.add(getField(correctCountry));

			while (uniqueOptions.size < 4) {
				const randomCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];
				uniqueOptions.add(getField(randomCountry));
			}

			return Array.from(uniqueOptions).sort(() => Math.random() - 0.5);
		};

		const questionTemplates = [
			{
				question: `What is the capital of ${correctCountry.name.common}?`,
				correctAnswer: correctCountry.capital[0],
				options: generateUniqueOptions((country) => country.capital[0]),
			},
			{
				question: `In what region is ${correctCountry.name.common} located?`,
				correctAnswer: correctCountry.region,
				options: generateUniqueOptions((country) => country.region),
			},
			{
				question: `Which country does this flag belong to:`,
				correctAnswer: correctCountry.name.common,
				options: generateUniqueOptions((country) => country.name.common),
				flag: correctCountry.flags.png,
			},
		];

		const randomQuestion = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];

		setUsedQuestions((prev) => [...prev, correctCountry.name.common]);

		setQuestionData({
			question: randomQuestion.question,
			options: randomQuestion.options,
			correctAnswer: randomQuestion.correctAnswer,
			flag: randomQuestion.flag || null,
		});
		setAnswered(false);
	};

	const answerChoice = (option) => {
		if (answered || answerCounter > 10) return;

		setSelectedAnswer(option);
		setAnswered(true);

		if (option === questionData.correctAnswer) {
			setCorrectAnswers((prev) => prev + 1);
		}

		setTimeout(() => {
			setSelectedAnswer(null);
			setAnswered(false);
			setAnswerCounter((prev) => prev + 1);

			if (answerCounter < 10) {
				generateQuestion();
			}
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
				<div className='question-flag-cont'>
					<h1 className='question'>{questionData.question}</h1>
					{questionData.flag && (
						<img src={questionData.flag} alt="Country flag" className="flag-image" />
					)}
				</div>
				<ul className='answers'>
					{questionData.options.map((option, index) => (
						<li
							key={index}
							className={`answer`}
							style={{
								background: selectedAnswer === option ? 'linear-gradient(#E65895, #BC6BE8)' : '',
								pointerEvents: answered ? 'none' : 'auto',
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