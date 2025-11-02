export default [
	"joker",
	"joker",
	...["clubs", "spades", "hearts", "diamonds"].flatMap((suit) =>
		Array.from({ length: 13 }, (_, i) => {
			// I really wish javascript had decent pattern matching lol
			switch (i) {
				case 0:
					return `ace of ${suit}`;
				case 10:
					return `jack of ${suit}`;
				case 11:
					return `queen of ${suit}`;
				case 12:
					return `king of ${suit}`;
				default:
					return `${i + 1} of ${suit}`;
			}
		}),
	),
];
