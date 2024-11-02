export const cards = ["clubs", "spades", "hearts", "diamonds"].reduce(
	(acc, suit) => {
		for (let i = 1; i <= 13; ++i) {
			let num: number | string = i;
			switch (i) {
				case 1:
					num = "ace";
					break;
				case 11:
					num = "jack";
					break;
				case 12:
					num = "queen";
					break;
				case 13:
					num = "king";
					break;
			}
			acc.push(`${num} of ${suit}`);
		}
		return acc;
	},
	// not included in suits
	["joker", "joker"],
);
