import { defineCatalog } from '@json-render/core';
import { schema } from '@json-render/react/schema';
import { z } from 'zod';

export const catalog = defineCatalog(schema, {
	components: {
		Card: {
			props: z.object({
				title: z.string(),
				description: z.string().nullable(),
			}),
			slots: ['default'],
			description: 'A card for grouping related content.',
		},
		Table: {
			props: z.object({
				columns: z.array(z.object({ key: z.string(), header: z.string() })),
				rows: z.array(z.record(z.string(), z.unknown())),
			}),
			description: 'A tabular display of columns and rows.',
		},
		List: {
			props: z.object({
				items: z.array(z.string()),
				ordered: z.boolean().nullable(),
			}),
			description: 'A list of text items.',
		},
		Banner: {
			props: z.object({ title: z.string().nullable(), message: z.string() }),
			description: 'A prominent message banner.',
		},
		Button: {
			props: z.object({ label: z.string(), disabled: z.boolean().nullable() }),
			description: 'A button that emits a press event.',
		},
		Accordion: {
			props: z.object({ title: z.string(), content: z.string() }),
			description: 'A collapsible section with a title and content.',
		},
		Checkbox: {
			props: z.object({ label: z.string(), checked: z.boolean().nullable() }),
			description: 'A checkbox with a label.',
		},
		Dialog: {
			props: z.object({ trigger: z.string(), title: z.string(), content: z.string() }),
			description: 'A dialog opened by a trigger button.',
		},
	},
	actions: {},
});
