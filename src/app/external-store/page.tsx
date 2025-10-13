"use client";

import { ExternalStore } from "src/external-store/store";
import { useStore } from "src/external-store/client";
import { useState, useEffect, startTransition } from "react";

const counterStore = new ExternalStore(
	(
		state: number,
		action: { type: "increment" | "decrement"; amount: number },
	) => {
		switch (action.type) {
			case "increment":
				return state + action.amount;
			case "decrement":
				return state - action.amount;
			default:
				return state;
		}
	},
	0,
);

export default function ExternalStorePage() {
	const [showExpensive, setShowExpensive] = useState(false);
	const [pending, setPending] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			counterStore.dispatch({ type: "increment", amount: 1 });
		}, 500);

		return () => clearInterval(interval);
	}, []);

	const handleToggle = () => {
		setPending(true);
		startTransition(() => {
			setShowExpensive((prev) => !prev);
			setTimeout(() => setPending(false), 1000);
		});
	};

	return (
		<div className="space-y-8 p-8">
			<div>
				<h1 className="mb-4 text-2xl font-bold">External Store Tearing Demo</h1>
				<p className="mb-4 text-sm text-gray-600">
					Counter updates every 500ms. Click toggle and watch for mismatched
					values across components.
				</p>
			</div>

			<div>
				<button
					onClick={handleToggle}
					className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					Toggle Expensive Render (uses startTransition)
				</button>
				<div className="h-8">
					{pending ? (
						<div className="inline-block animate-pulse rounded bg-orange-500 px-3 py-1 text-sm text-white">
							Concurrent render in progress...
						</div>
					) : null}
				</div>
			</div>

			<div className="grid grid-cols-4 gap-4">
				<div className="rounded border-4 border-blue-500 bg-blue-50 p-4">
					<h2 className="mb-1 text-xs font-semibold text-gray-600">
						Counter 1
					</h2>
					<Counter color="blue" />
				</div>

				<div className="rounded border-4 border-green-500 bg-green-50 p-4">
					<h2 className="mb-1 text-xs font-semibold text-gray-600">
						Counter 2
					</h2>
					<Counter color="green" />
				</div>

				<div className="rounded border-4 border-purple-500 bg-purple-50 p-4">
					<h2 className="mb-1 text-xs font-semibold text-gray-600">
						Counter 3
					</h2>
					<Counter color="purple" />
				</div>

				<div
					className={`rounded border-4 border-orange-500 bg-orange-50 p-4 opacity-100 transition-opacity`}
				>
					<h2 className="mb-1 text-xs font-semibold text-gray-600">Slow</h2>
					{showExpensive && <ExpensiveCounter />}
				</div>
			</div>

			<div className="mt-8 rounded bg-gray-100 p-4 text-sm text-black">
				<h3 className="mb-2 font-semibold">How to see tearing:</h3>
				<ol className="ml-5 list-decimal space-y-1">
					<li>Watch the counters increment every 500ms</li>
					<li>Click the toggle button to trigger concurrent rendering</li>
					<li>
						During the transition, look for different counters showing different
						values
					</li>
					<li>
						The expensive counter takes 300ms to render, making tearing more
						visible
					</li>
					<li>
						Look for the orange &quot;Concurrent render in progress&quot;
						indicator - tearing happens during this window
					</li>
				</ol>
			</div>
		</div>
	);
}

const Counter = ({ color }: { color: string }) => {
	const count = useStore(counterStore);

	return <DisplayCount color={color} count={count} />;
};

const useDelay = (ms: number) => {
	"use no memo";
	const startTime = performance.now();
	let i = 0;
	while (performance.now() - startTime < ms) {
		i++;
	}
	return i;
};

const ExpensiveCounter = () => {
	const count = useStore(counterStore);

	useDelay(300);

	return <DisplayCount color="orange" count={count} />;
};

const DisplayCount = ({ color, count }: { color: string; count: number }) => {
	const colorClass =
		{
			blue: "text-blue-600",
			green: "text-green-600",
			purple: "text-purple-600",
			orange: "text-orange-600",
		}[color] || "text-purple-600";

	return (
		<div className="font-mono text-2xl font-bold tabular-nums">
			<span className={colorClass}>{count}</span>
		</div>
	);
};
