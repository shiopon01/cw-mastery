"use client";

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
import { DEFAULT_WPM, MAX_WPM, MIN_WPM } from "@/constants";
import { convertToMorseString, playMorseBeep } from "@/lib/morse";
import React, { useState } from "react";

type History = {
	no: number;
	input: string;
	code: string;
};

export default function Home() {
	const [userInput, setUserInput] = useState("");
	const [wpm, setWpm] = useState(DEFAULT_WPM);
	const [isPlaying, setIsPlaying] = useState(false);
	const [history, setHistory] = useState<History[]>([]);

	const playMorseCode = () => {
		console.log(userInput.toUpperCase());
		const code = convertToMorseString(userInput.toUpperCase());
		console.log(code);
		playMorseBeep(
			userInput.toUpperCase(),
			wpm,
			() => setIsPlaying(true),
			() => setIsPlaying(false),
		);

		setHistory([
			...history,
			{
				no: history.length + 1,
				input: userInput,
				code: code,
			},
		]);
		setUserInput("");
	};

	return (
		<main>
			<div className="container mx-auto p-4">
				<div className="flex items-center space-x-4">
					<div className="w-48">
						<p className="mb-2">WPM: {wpm}</p>
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
					<Button onClick={playMorseCode} disabled={isPlaying}>
						{isPlaying ? "Playing..." : "Play"}
					</Button>
				</div>
				<div className="mb-4">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>No.</TableHead>
								<TableHead>Your Input</TableHead>
								<TableHead>Morse Code</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{history.toReversed().map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.no}</TableCell>
									<TableCell>{item.input}</TableCell>
									<TableCell>{item.code}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</main>
	);
}
