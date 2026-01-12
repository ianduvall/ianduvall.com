interface FormattedDateProps {
	date: string;
}

export function FormattedDate({ date }: FormattedDateProps) {
	const dateString = date.includes("T") ? date : `${date}T00:00:00`;
	const targetDate = new Date(dateString);

	const fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return <time dateTime={date}>{fullDate}</time>;
}
