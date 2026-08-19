'use server';

import { generateText, Output } from 'ai';
import { createAzure } from '@ai-sdk/azure';
import { z } from 'zod';
import { catalog } from './Catalog';
import { createMockUI, type GeneratedUIResult } from './MockGenerativeUI';
import { getMockDataAndIntent, type ExperienceContext } from './MockDataIntentService';

const uiSpecSchema = z.object({
	root: z.string(),
	elements: z.record(z.string(), z.object({
		type: z.string(),
		props: z.record(z.string(), z.unknown()),
		children: z.array(z.string()).optional(),
	})),
});


async function createAzureUI(prompt: string, context: ExperienceContext): Promise<GeneratedUIResult> {
	const azure = createAzure({
		resourceName: process.env.AZURE_RESOURCE_NAME,
		apiKey: process.env.AZURE_API_KEY,
	});
	const result = await generateText({
		model: azure(process.env.AZURE_MODEL ?? 'gpt-4o-mini'),
		system: `${catalog.prompt()}

The application supplies data separately through json-render StateProvider. Generate only presentation structure and bind all supplied business values with { "$state": "/json/pointer" } or { "$template": "..." }. Do not copy business data into literal props. Use the supplied intent to choose components and composition.`,
		prompt: JSON.stringify({ request: prompt, intent: context.intent, data: context.data }),
		output: Output.object({ schema: uiSpecSchema }),
	});

	return {
		spec: result.output,
		data: context.data,
		intent: context.intent,
		source: 'azure',
		summary: 'Generated a bound specification from external data and intent',
	};
}

export async function createUI(prompt: string): Promise<GeneratedUIResult> {
	if (!prompt.trim()) {
		throw new Error('Enter a prompt before creating an interface.');
	}
	const context = await getMockDataAndIntent(prompt);

	if (process.env.GENERATIVE_UI_USE_MOCKS !== 'false') {
		await new Promise((resolve) => setTimeout(resolve, 450));
		return createMockUI(context);
	}

	if (!process.env.AZURE_RESOURCE_NAME || !process.env.AZURE_API_KEY) {
		throw new Error('Live generation requires AZURE_RESOURCE_NAME and AZURE_API_KEY.');
	}

	return createAzureUI(prompt, context);
}
