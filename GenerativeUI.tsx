'use client';

import { useRef, useState, useTransition } from 'react';
import { ActionProvider, Renderer, StateProvider, ValidationProvider, VisibilityProvider } from '@json-render/react';
import { createUI } from './AiSdk';
import { registry } from './Registry';

type GenerativeUIProps = {
	initialPrompt?: string;
	mockEnabled?: boolean;
};

const presets = [
	'Create an AI renewal insights dashboard with portfolio metrics, risk priorities, and recommended actions',
	'Build a new claim review checklist with guidance',
	'Show a customer profile with account details and the latest service note',
];

type StreamProgress = {
	current: number;
	total: number;
	label: string;
};

function waitForNextStage() {
	return new Promise((resolve) => setTimeout(resolve, 650));
}

export default function GenerativeUI({ initialPrompt = presets[0], mockEnabled = true }: GenerativeUIProps) {
	const [prompt, setPrompt] = useState(initialPrompt);
	const [result, setResult] = useState<Awaited<ReturnType<typeof createUI>> | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [streamProgress, setStreamProgress] = useState<StreamProgress | null>(null);
	const [isPending, startTransition] = useTransition();
	const generationId = useRef(0);

	function generate(nextPrompt: string) {
		const currentGeneration = ++generationId.current;
		setError(null);
		setResult(null);
		setStreamProgress(null);
		startTransition(async () => {
			try {
				const generatedResult = await createUI(nextPrompt);
				if (currentGeneration !== generationId.current) return;

				if (generatedResult.source === 'mock' && generatedResult.stages?.length) {
					for (const [index, stage] of generatedResult.stages.entries()) {
						if (currentGeneration !== generationId.current) return;
						setStreamProgress({ current: index + 1, total: generatedResult.stages.length, label: stage.label });
						setResult({ ...generatedResult, spec: stage.spec });
						if (index < generatedResult.stages.length - 1) await waitForNextStage();
					}
					setStreamProgress(null);
					return;
				}

				setResult(generatedResult);
			} catch (cause) {
				if (currentGeneration !== generationId.current) return;
				setStreamProgress(null);
				setError(cause instanceof Error ? cause.message : 'Unable to create the UI.');
			}
		});
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		generate(prompt);
	}

	return (
		<div className="w-full max-w-5xl space-y-8">
			<header className="space-y-3">
				<div className="flex flex-wrap items-center gap-3">
					<p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Foundation UI Lab</p>
					<span className={mockEnabled ? 'rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800' : 'rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800'}>
						{mockEnabled ? 'Simulated stream' : 'Live model'}
					</span>
				</div>
				<h1 className="max-w-3xl text-4xl font-semibold leading-tight text-zinc-950">{mockEnabled ? 'Generate interfaces without model credentials' : 'Generate interfaces with the live model'}</h1>
				<p className="max-w-3xl text-base leading-7 text-zinc-600">An upstream service supplies data and presentation intent. {mockEnabled ? 'The simulated AI layer selects a bound JSON specification.' : 'The configured AI provider generates a bound JSON specification.'} json-render resolves the bindings and renders approved React components.</p>
			</header>

			<section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
				<form className="space-y-4" onSubmit={handleSubmit}>
					<label className="block text-sm font-semibold text-zinc-800" htmlFor="ui-prompt">Describe the interface</label>
					<div className="flex flex-col gap-3 sm:flex-row">
						<input className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none ring-teal-600 transition focus:ring-2" id="ui-prompt" name="prompt" onChange={(event) => setPrompt(event.target.value)} value={prompt} />
						<button className="rounded-md bg-teal-700 px-5 py-2.5 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50" disabled={isPending || !prompt.trim()} type="submit">
							{isPending ? 'Composing...' : 'Generate UI'}
						</button>
					</div>
					<div className="flex flex-wrap gap-2">
						{presets.map((preset, index) => (
							<button className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-left text-xs font-medium text-zinc-700 hover:border-teal-300 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50" disabled={isPending} key={preset} onClick={() => { setPrompt(preset); generate(preset); }} type="button">
								{index === 0 ? 'Renewal intelligence' : index === 1 ? 'Review checklist' : 'Customer 360'}
							</button>
						))}
					</div>
				</form>
				<div className="mt-5 grid gap-2 border-t border-zinc-100 pt-4 text-xs font-medium text-zinc-600 sm:grid-cols-3">
					<div className="rounded-md bg-zinc-50 px-3 py-2"><span className="mr-2 text-teal-700">1</span>Data + intent service</div>
					<div className="rounded-md bg-zinc-50 px-3 py-2"><span className="mr-2 text-teal-700">2</span>AI SDK spec generation</div>
					<div className="rounded-md bg-zinc-50 px-3 py-2"><span className="mr-2 text-teal-700">3</span>Bound UI rendering</div>
				</div>
			</section>

			{error && <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

			<section aria-busy={isPending} aria-live="polite" className="min-h-80 rounded-lg border border-zinc-200 bg-zinc-100/70 p-4 sm:p-6">
				<div className="mb-5 flex items-center justify-between gap-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Generated canvas</p>
						<p className="mt-1 text-sm text-zinc-600">{streamProgress?.label ?? (isPending ? 'Selecting and assembling a constrained specification...' : result?.summary ?? 'Choose a preset or submit a prompt to begin.')}</p>
					</div>
					{result && <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-semibold uppercase text-teal-800">{streamProgress ? `${streamProgress.current} / ${streamProgress.total}` : result.source}</span>}
				</div>
				{streamProgress && <progress aria-label="Generated UI progress" className="mb-5 h-1.5 w-full accent-teal-700" max={streamProgress.total} value={streamProgress.current} />}

				{isPending && !result && <div className="h-52 animate-pulse rounded-lg border border-zinc-200 bg-white" />}
				{result && (
					<StateProvider initialState={result.data}>
						<VisibilityProvider>
							<ActionProvider handlers={{}}>
								<ValidationProvider customFunctions={{}}>
									<Renderer loading={isPending} registry={registry} spec={result.spec} />
								</ValidationProvider>
							</ActionProvider>
						</VisibilityProvider>
					</StateProvider>
				)}
			</section>

			{result && <div className="grid gap-4 lg:grid-cols-2">
				<details className="rounded-lg border border-zinc-200 bg-zinc-950 text-zinc-100">
					<summary className="cursor-pointer px-4 py-3 text-sm font-semibold">1 · Inspect upstream data + intent</summary>
					<pre className="max-h-96 overflow-auto border-t border-zinc-800 p-4 text-xs leading-6 text-sky-300">{JSON.stringify({ intent: result.intent, data: result.data }, null, 2)}</pre>
				</details>
				<details className="rounded-lg border border-zinc-200 bg-zinc-950 text-zinc-100">
					<summary className="cursor-pointer px-4 py-3 text-sm font-semibold">2 · Inspect generated bound spec</summary>
					<pre className="max-h-96 overflow-auto border-t border-zinc-800 p-4 text-xs leading-6 text-emerald-300">{JSON.stringify(result.spec, null, 2)}</pre>
				</details>
			</div>}
		</div>
	);
}
