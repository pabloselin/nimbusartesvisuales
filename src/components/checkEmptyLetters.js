import alphabet from "../components/alphabet";

function checkEmptyLetters(artists) {
	console.log(artists);
	if (artists !== undefined) {
		let empties = [];
		alphabet.map((letter) => {
			let hasArtist = artists.filter((artist) =>
				artist.lastname.toUpperCase().startsWith(letter)
			);
			if (hasArtist.length === 0) {
				empties.push(letter);
			}
		});
		return empties;
	}
}

export default checkEmptyLetters;
