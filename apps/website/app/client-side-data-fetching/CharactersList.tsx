"use client";

import { use, useState, useTransition, Suspense } from "react";
import { Button } from "./Button";
import { characterResource, charactersResource } from "./resource";

export const CharactersList = () => {
	const [page, setPage] = useState(1);
	const [isPending, startTransition] = useTransition();
	const prevPageDisabled = page < 2;
	const [characterId, _setCharacterId] = useState<number>(1);
	const setCharacterId: typeof _setCharacterId = (updater) => {
		startTransition(() => {
			_setCharacterId(updater);
		});
	};

	return (
		<>
			<div>
				<p>Page: {page}</p>
				<p>Pending: {isPending.toString()}</p>
			</div>

			<Button
				disabled={prevPageDisabled}
				onClick={() => {
					startTransition(() => {
						setPage((prev) => prev - 1);
					});
				}}
			>
				Previous page
			</Button>
			<Button
				onClick={() => {
					startTransition(() => {
						setPage((prev) => prev + 1);
					});
				}}
			>
				Next page
			</Button>

			<p>Characters</p>
			<Suspense fallback={<div>Suspense fallback...</div>}>
				<Characters page={page} setCharacterId={setCharacterId} />
				<Character characterId={characterId} />
			</Suspense>
		</>
	);
};

const Characters = ({
	page,
	setCharacterId,
}: {
	page: number;
	setCharacterId: (id: number) => void;
}) => {
	const characters = use(charactersResource.read({ page }));

	return (
		<ul className="flex flex-wrap gap-2">
			{characters.data.results?.map((character) => (
				<li key={character.id}>
					<Button
						onClick={() => {
							setCharacterId(character.id);
						}}
					>
						{character.name}
					</Button>
				</li>
			))}
		</ul>
	);
};

const Character = ({ characterId }: { characterId: number }) => {
	const { data: character } = use(characterResource.read(characterId));

	return (
		<dl key={characterId} className="flex gap-1">
			<dt>Name:</dt>
			<dd>{character.name}</dd>
			<dt>Status:</dt>
			<dd>{character.status}</dd>
		</dl>
	);
};
