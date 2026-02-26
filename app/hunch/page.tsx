
"use client";

import React, { useEffect, useRef, useState } from "react";
import { animals } from "../../data/hunch/animals";
import { countries } from "../../data/hunch/countries";

type AnyObj = any;

const getDataForMode = (mode: string) => {
	if (mode === "countries") return countries;
	return animals.filter((a: AnyObj) => a.category === mode);
};

const AnimatedHint = ({ hint }: { hint: string }) => {
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		setVisible(true);
		const t = setTimeout(() => setVisible(false), 2000);
		return () => clearTimeout(t);
	}, [hint]);
	if (!visible || !hint) return null;
	return (
		<div className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-mint-100 text-gray-700 px-2 py-1 rounded text-sm animate-bounce">
			{hint}
		</div>
	);
};

const GuessedCard = ({ animal, matchingTraits }: AnyObj) => {
	const displayed = animal.traits?.slice(0, 5) || [];
	return (
		<div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<img src={animal.imageUrl} alt={animal.name} className="w-16 h-16 object-cover rounded-full" />
				<div className="flex flex-col">
					<div className="flex flex-wrap gap-2">
						{displayed.map((t: string, i: number) => {
							const isMatch = matchingTraits?.has(t);
							const bg = isMatch ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";
							return (
								<div key={i} className={`px-2 py-1 rounded ${bg} text-sm`}>
									{t}
								</div>
							);
						})}
					</div>
					<h2 className="text-lg font-semibold mt-2">{animal.name}</h2>
				</div>
			</div>
		</div>
	);
};

export default function Page() {
	const [gameMode, setGameMode] = useState<string>("mammals");
	const [target, setTarget] = useState<AnyObj | null>(null);
	const [search, setSearch] = useState("");
	const [suggestions, setSuggestions] = useState<AnyObj[]>([]);
	const [guessHistory, setGuessHistory] = useState<AnyObj[]>([]);
	const [isCorrect, setIsCorrect] = useState(false);
	const [showHint, setShowHint] = useState(false);
	const [currentHint, setCurrentHint] = useState("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		const data = getDataForMode(gameMode);
		const random = data.length ? data[Math.floor(Math.random() * data.length)] : null;
		setTarget(random);
		setGuessHistory([]);
		setSearch("");
		setIsCorrect(false);
	}, [gameMode]);

	useEffect(() => {
		if (!search) {
			setSuggestions([]);
			return;
		}
		const data = getDataForMode(gameMode);
		const q = search.toLowerCase();
		const results = data.filter((a: AnyObj) => a.name.toLowerCase().includes(q));
		setSuggestions(results.slice(0, 10));
	}, [search, gameMode]);

	const handleSelect = (item: AnyObj) => {
		if (!target) return;
		const matching = new Set(item.traits?.filter((t: string) => target.traits?.includes(t)));
		const correct = item.name === target.name;
		setGuessHistory(prev => [{ animal: item, matchingTraits: matching }, ...prev]);
		setSearch("");
		setSuggestions([]);
		setIsCorrect(correct);
		if (correct) {
			const data = getDataForMode(gameMode);
			const random = data.length ? data[Math.floor(Math.random() * data.length)] : null;
			setTimeout(() => setTarget(random), 1200);
		}
		if (inputRef.current) inputRef.current.focus();
	};

	const handleHint = () => {
		if (!target) return;
		const available = (target.traits || []).filter((t: string) => !guessHistory.some(g => g.animal.traits.includes(t)));
		if (!available.length) return;
		const pick = available[Math.floor(Math.random() * available.length)];
		setCurrentHint(pick);
		setShowHint(true);
		setTimeout(() => {
			setShowHint(false);
			setCurrentHint("");
		}, 2000);
	};

	return (
		<div className="min-h-screen bg-foreground text-foreground">
			<div className="max-w-4xl mx-auto px-4 py-8">
				<div className="flex gap-4 justify-between items-center">
					<div className="flex gap-2">
						<button onClick={() => setGameMode("mammals")} className={`px-3 py-1 rounded ${gameMode === "mammals" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
							Mammals
						</button>
						<button onClick={() => setGameMode("birds")} className={`px-3 py-1 rounded ${gameMode === "birds" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
							Birds
						</button>
						<button onClick={() => setGameMode("countries")} className={`px-3 py-1 rounded ${gameMode === "countries" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
							Countries
						</button>
					</div>
					<div>
						<div className="text-sm">Target</div>
						<div className="font-bold">{isCorrect ? "Guessed!" : "Guess the item"}</div>
					</div>
				</div>

				<div className="mt-8 space-y-4">
					{guessHistory.map((g, i) => (
						<GuessedCard key={i} animal={g.animal} matchingTraits={g.matchingTraits} targetTraits={target?.traits || []} />
					))}
				</div>

				<div className="fixed bottom-0 left-0 right-0 bg-foreground border-t shadow-lg p-3">
					<div className="max-w-4xl mx-auto">
						<div className="relative">
							{suggestions.length > 0 && (
								<div className="absolute z-10 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto" style={{ bottom: "100%" }}>
									{suggestions.map((a, idx) => (
										<button key={idx} onClick={() => handleSelect(a)} className="w-full px-4 py-2 text-left hover:bg-gray-50">
											{a.name}
										</button>
									))}
								</div>
							)}
							<input ref={inputRef} value={search} onChange={e => setSearch(e.target.value)} placeholder="Choose your guess..." className="w-full px-4 py-2 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
							{showHint && currentHint && <AnimatedHint hint={currentHint} />}
						</div>

						<div className="mt-2 flex gap-2">
							<button onClick={handleHint} className="flex items-center space-x-2 px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition-colors text-sm">Hint</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
