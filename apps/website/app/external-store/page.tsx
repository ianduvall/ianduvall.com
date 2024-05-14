import { ClientStores } from "./ExternalStore";

export default async function Page() {
	const initialValue = Math.ceil(Math.random() * 100);
	console.log(initialValue);

	return (
		<section>
			<h1>External Stores</h1>
			<ClientStores serverSnapshot={initialValue} />
		</section>
	);
}
