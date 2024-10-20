export const MORSE_CODE: any = {
	// 数字
	1: ".----",
	2: "..---",
	3: "...--",
	4: "....-",
	5: ".....",
	6: "-....",
	7: "--...",
	8: "---..",
	9: "----.",
	0: "-----",

	// 欧文
	// アルファベット
	A: ".-",
	B: "-...",
	C: "-.-.",
	D: "-..",
	E: ".",
	F: "..-.",
	G: "--.",
	H: "....",
	I: "..",
	J: ".---",
	K: "-.-",
	L: ".-..",
	M: "--",
	N: "-.",
	O: "---",
	P: ".--.",
	Q: "--.-",
	R: ".-.",
	S: "...",
	T: "-",
	U: "..-",
	V: "...-",
	W: ".--",
	X: "-..-",
	Y: "-.--",
	Z: "--..",
	// 記号
	".": ".-.-.-", // ピリオド
	",": "--..--", // コンマ
	":": "---...", // コロン
	"?": "..--..", // 疑問符
	_: "..--.-", // アンダースコア
	"+": ".-.-.", // プラス
	"-": "-....-", // ハイフン
	"*": "-..-", // 乗算
	"^": "......", // べき乗
	"=": "-...-", // イコール
	"/": "-..-.", // 斜線
	"@": ".--.-.", // アットマーク
	"(": "-.--.", // 左括弧
	")": "-.--.-", // 右括弧
	'"': ".-..-.", // ダブルクォーテーション
	"'": ".----.", // アポストロフィ

	// 和文
	// イロハ
	イ: ".-",
	ロ: ".-.-",
	ハ: "-...",
	ニ: "-.-.",
	ホ: "-..",
	ヘ: ".",
	ト: "..-..",
	チ: "..-.",
	リ: "--.",
	ヌ: "....",
	ル: "-.--.",
	ヲ: ".---",
	ワ: "-.-",
	カ: ".-..",
	ヨ: "--",
	タ: "-.",
	レ: "---",
	ソ: "---.",
	ツ: ".--.",
	ネ: "--.-",
	ナ: ".-.",
	ラ: "...",
	ム: "-",
	ウ: "..-",
	ヰ: ".-..-",
	ノ: "..--",
	オ: ".-...",
	ク: "...-",
	ヤ: ".--",
	マ: "-..-",
	ケ: "-.--",
	フ: "--..",
	コ: "----",
	エ: "-.---",
	テ: ".-.--",
	ア: "--.--",
	サ: "-.-.-",
	キ: "-.-..",
	ユ: "-..--",
	メ: "-...-",
	ミ: "..-.-",
	シ: "--.-.",
	ヱ: ".--..",
	ヒ: "--..-",
	モ: "-..-.",
	セ: ".---.",
	ス: "---.-",
	ン: ".-.-.",
	// 和文記号
	"゛": "..", // 濁点
	"゜": "..--.", // 半濁点
	"ー": ".--.-", // 長音
	"、": ".-.-.-", // 句読点
	"」": ".-.-..", // 段落
	"（": "-.--.-", // 下向き括弧
	"）": ".-..-.", // 上向き括弧
};

export const DEFAULT_WPM = 15;
export const MIN_WPM = 5;
export const MAX_WPM = 30;
