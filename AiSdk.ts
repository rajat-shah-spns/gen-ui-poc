'use server';

import { generateText, Output } from 'ai';
import { createAzure } from '@ai-sdk/azure';
import { z } from 'zod';
import { catalog } from './Catalog';

const azure = createAzure({
	resourceName: process.env.AZURE_RESOURCE_NAME,
	apiKey: process.env.AZURE_API_KEY,
});

const uiSpecSchema = z.object({
	root: z.string(),
	elements: z.record(z.string(), z.object({
		type: z.string(),
		props: z.record(z.string(), z.unknown()),
		children: z.array(z.string()).optional(),
	})),
});

export async function createUI(prompt: string) {
	const result = await generateText({
		model: azure(process.env.AZURE_MODEL ?? 'gpt-4o-mini'),
		system: catalog.prompt(),
		prompt: `Create a UI for this request: ${prompt}`,
		output: Output.object({ schema: uiSpecSchema }),
	});

	return result.output;
}
