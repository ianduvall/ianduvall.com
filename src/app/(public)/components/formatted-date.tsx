"use client";

import { Suspense } from "react";

interface FormattedDateProps {
	date: string;
	includeRelative?: boolean;
}

export function FormattedDate(props: FormattedDateProps) {
	return (
		<time dateTime={props.date}>
			<Suspense fallback={props.date}>
				<FormattedDateImpl {...props} />
			</Suspense>
		</time>
	);
}
export function FormattedDateImpl({
	date,
	includeRelative = false,
}: FormattedDateProps) {
	const dateString = date.includes("T") ? date : `${date}T00:00:00`;
	const targetDate = new Date(dateString);

	const fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	if (!includeRelative) {
		return <time dateTime={date}>{fullDate}</time>;
	}

	return (
		<>
			{fullDate} (<RelativeDate date={date} />)
		</>
	);
}

function RelativeDate({ date }: { date: string }) {
	const currentDate = new Date();
	const dateString = date.includes("T") ? date : `${date}T00:00:00`;
	const targetDate = new Date(dateString);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	return <>{formattedDate}</>;
}
