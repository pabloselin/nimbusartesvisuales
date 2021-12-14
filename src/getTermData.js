export default function getTermData(termSlug, taxonomy) {
	if (termSlug) {
		return nimbus_app_data[taxonomy].find((term) => term.slug == termSlug);
	} else {
		return false;
	}
}
