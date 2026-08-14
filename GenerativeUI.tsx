'use client';

import { useState, useTransition } from 'react';
import { Renderer, StateProvider, VisibilityProvider } from '@json-render/react';
import { createUI } from './AiSdk';
import { registry } from './Registry';

type GenerativeUIProps = {
	initialPrompt?: string;
};

export default function GenerativeUI({ initialPrompt = 'Create a welcome card' }: GenerativeUIProps) {
	const [prompt, setPrompt] = useState(initialPrompt);
	const [spec, setSpec] = useState<Awaited<ReturnType<typeof createUI>> | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		startTransition(async () => {
			try {
				setSpec(await createUI(prompt));
			} catch (cause) {
				setError(cause instanceof Error ? cause.message : 'Unable to create the UI.');
			}
		});
	}

	return (
		<div className="w-full max-w-3xl space-y-6">
			<form className="flex gap-3" onSubmit={handleSubmit}>
				<input className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900" name="prompt" onChange={(event) => setPrompt(event.target.value)} value={prompt} />
				<button className="rounded-md bg-zinc-900 px-4 py-2 font-medium text-white disabled:opacity-50" disabled={isPending || !prompt.trim()} type="submit">
					{isPending ? 'Creating...' : 'Create UI'}
				</button>
			</form>
			{error && <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
			{spec && (
				<StateProvider initialState={{}}>
					<VisibilityProvider>
						<Renderer loading={isPending} registry={registry} spec={spec} />
					</VisibilityProvider>
				</StateProvider>
			)}
		</div>
	);
}
