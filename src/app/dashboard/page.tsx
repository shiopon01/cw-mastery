"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	MORSE_CODE,
	DIFFICULTY_LEVELS,
	DEFAULT_WPM,
	MIN_WPM,
	MAX_WPM,
} from "@/constants";

const MorseCodeApp = () => {
	const [currentWord, setCurrentWord] = useState("");
	const [userInput, setUserInput] = useState("");
	const [result, setResult] = useState("");
	const [wpm, setWpm] = useState(DEFAULT_WPM);
	const [isPlaying, setIsPlaying] = useState(false);
	const [difficulty, setDifficulty] = useState("easy");
	const [history, setHistory] = useState([]);
	const [score, setScore] = useState(0);

	useEffect(() => {
		selectNewWord();
	}, [difficulty]);

	const selectNewWord = () => {
		const words = DIFFICULTY_LEVELS[difficulty];
		setCurrentWord(words[Math.floor(Math.random() * words.length)]);
	};

	const playMorseCode = () => {
		setIsPlaying(true);
		const audio = new (window.AudioContext || window.webkitAudioContext)();
		const dotDuration = 1.2 / wpm;

		const playBeep = (duration) => {
			const osc = audio.createOscillator();
			const gain = audio.createGain();
			osc.connect(gain);
			gain.connect(audio.destination);
			osc.frequency.value = 800;
			gain.gain.value = 0.5;
			osc.start();
			setTimeout(() => {
				osc.stop();
			}, duration);
		};

		let totalDelay = 0;
		currentWord.split("").forEach((char) => {
			const morse = MORSE_CODE[char];
			morse.split("").forEach((symbol) => {
				setTimeout(() => {
					playBeep(symbol === "." ? dotDuration * 1000 : dotDuration * 3000);
				}, totalDelay);
				totalDelay += (symbol === "." ? 2 : 4) * dotDuration * 1000;
			});
			totalDelay += 3 * dotDuration * 1000;
		});

		setTimeout(() => {
			setIsPlaying(false);
		}, totalDelay);
	};

	const handleSubmit = () => {
		const isCorrect = userInput.toUpperCase() === currentWord;
		const evaluation = isCorrect ? "Great!!" : "so-so";
		const points = isCorrect ? wpm * 100 : 0;
		setHistory((prev) => [
			...prev,
			{
				no: prev.length + 1,
				trueCall: currentWord,
				yourAnswer: userInput.toUpperCase(),
				wpm,
				points,
				evaluation,
			},
		]);
		setUserInput("");
		selectNewWord();
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Morse Code Learning App</h1>
			<div className="flex items-center space-x-4">
				<div className="w-48">
					<p className="mb-2">Speed (WPM): {wpm}</p>
					<Slider
						value={[wpm]}
						onValueChange={([newWpm]) => setWpm(newWpm)}
						min={MIN_WPM}
						max={MAX_WPM}
						step={1}
					/>
				</div>
				<Input
					type="text"
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					placeholder="Enter decoded text"
					className="flex-grow"
				/>
				<Button onClick={handleSubmit}>Submit</Button>
				<Button onClick={playMorseCode} disabled={isPlaying}>
					{isPlaying ? "Playing..." : "Play"}
				</Button>
			</div>
			<div className="mb-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>No.</TableHead>
							<TableHead>True Call</TableHead>
							<TableHead>Your Answer</TableHead>
							<TableHead>WPM</TableHead>
							<TableHead>pts.</TableHead>
							<TableHead>Evaluation</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{history.toReversed().map((item, index) => (
							<TableRow key={index}>
								<TableCell>{item.no}</TableCell>
								<TableCell>{item.trueCall}</TableCell>
								<TableCell>{item.yourAnswer}</TableCell>
								<TableCell>{item.wpm}</TableCell>
								<TableCell>{item.points}</TableCell>
								<TableCell>{item.evaluation}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default MorseCodeApp;
