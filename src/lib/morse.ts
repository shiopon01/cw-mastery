import { MORSE_CODE } from "@/constants";

export function convertToMorseString(word: string): {
	result: boolean;
	text: string;
} {
	let morseString = "";
	let errorString = "";
	const chars = word.split("");
	for (let i = 0; i < chars.length; i++) {
		const char = chars[i];
		const morse = MORSE_CODE![char];
		if (morse === undefined) {
			errorString += char;
			continue;
		}
		const symbols = morse.split("");
		for (let j = 0; j < symbols.length; j++) {
			morseString += symbols[j];
		}
		morseString += " ";
	}
	return {
		result: errorString === "",
		text: errorString === "" ? morseString : errorString,
	};
}

const playBeep = (audio: AudioContext, duration: number) => {
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

export function playMorseBeep(
	word: string,
	wpm: number,
	startCallback: Function,
	finishCallback: Function,
) {
	const audio = new (window.AudioContext || window.webkitAudioContext)();
	const dotDuration = 1.2 / wpm;
	startCallback();

	let totalDelay = 0;

	const chars = word.split("");
	for (let i = 0; i < chars.length; i++) {
		const char = chars[i];
		const morse = MORSE_CODE[char];
		const symbols = morse.split("");
		for (let j = 0; j < symbols.length; j++) {
			setTimeout(() => {
				playBeep(
					audio,
					symbols[j] === "." ? dotDuration * 1000 : dotDuration * 3000,
				);
			}, totalDelay);
			totalDelay += (symbols[j] === "." ? 2 : 4) * dotDuration * 1000;
		}
		totalDelay += 3 * dotDuration * 1000;
	}

	setTimeout(() => {
		finishCallback();
	}, totalDelay);
}
