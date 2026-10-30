export default [
	"Joker",
	"Joker",
	...["clubs", "spades", "hearts", "diamonds"].flatMap((suit) =>
		Array.from({ length: 13 }, (_, i) => {
			// I really wish javascript had decent pattern matching lol
			switch (i) {
				case 0:
					return `Ace of ${suit}`;
				case 10:
					return `Jack of ${suit}`;
				case 11:
					return `Queen of ${suit}`;
				case 12:
					return `King of ${suit}`;
				default:
					return `${i + 1} of ${suit}`;
			}
		}),
	),
];
