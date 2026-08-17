import * as React from 'react';
import { defineRegistry } from '@json-render/react';
import { Accordion, Checkbox, Dialog, Button } from '@base-ui/react';
import Card from './Components/Card';
import Table from './Components/Table';
import List from './Components/List';
import Banner from './Components/Banner';
import { catalog } from './Catalog';

export const { registry, handlers, executeAction } = defineRegistry(catalog, {
	components: {
		Card: ({ props, children }) => React.createElement(Card, { title: props.title, description: props.description ?? undefined, eyebrow: props.eyebrow ?? undefined, layout: props.layout ?? 'stack', tone: props.tone ?? 'default' }, children),
		Table: ({ props, emit }) => React.createElement(Table, { columns: props.columns.map((column) => ({ ...column, kind: column.kind ?? 'text' })), rows: props.rows, caption: props.caption ?? undefined, onAction: () => emit('rowAction') }),
		List: ({ props }) => React.createElement(List, { items: props.items, ordered: props.ordered ?? false, renderItem: (item) => String(item) }),
		Banner: ({ props }) => React.createElement(Banner, { title: props.title ?? undefined }, props.message),
		Button: ({ props, emit }) => React.createElement(Button, { className: 'rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50', disabled: props.disabled ?? false, onClick: () => emit('press') }, props.label),
		Accordion: ({ props }) => React.createElement(
			Accordion.Root,
			{ className: 'rounded-lg border border-zinc-200 bg-white' },
			React.createElement(Accordion.Item, { value: 'guidance' },
				React.createElement(Accordion.Header, { className: 'flex' }, React.createElement(Accordion.Trigger, { className: 'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-zinc-900' }, props.title, React.createElement('span', { 'aria-hidden': true }, '+'))),
				React.createElement(Accordion.Panel, { className: 'border-t border-zinc-200 px-4 py-3 text-sm leading-6 text-zinc-600' }, props.content),
			),
		),
		Checkbox: ({ props, emit }) => React.createElement(
			'label',
			{ className: 'flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800' },
			React.createElement(Checkbox.Root, { className: 'flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-400 bg-white data-[checked]:border-teal-700 data-[checked]:bg-teal-700', defaultChecked: props.checked ?? false, onCheckedChange: () => emit('change') }, React.createElement(Checkbox.Indicator, { className: 'text-xs font-bold text-white' }, '✓')),
			props.label,
		),
		Dialog: ({ props }) => React.createElement(
			Dialog.Root,
			{},
			React.createElement(Dialog.Trigger, { className: 'rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50' }, props.trigger),
			React.createElement(Dialog.Portal, {},
				React.createElement(Dialog.Backdrop, { className: 'fixed inset-0 bg-zinc-950/45' }),
				React.createElement(Dialog.Viewport, { className: 'fixed inset-0 flex items-center justify-center p-4' }, React.createElement(Dialog.Popup, { className: 'w-full max-w-md rounded-lg bg-white p-6 shadow-xl' },
					React.createElement(Dialog.Title, { className: 'text-lg font-semibold text-zinc-950' }, props.title),
					React.createElement(Dialog.Description, { className: 'mt-2 text-sm leading-6 text-zinc-600' }, props.content),
					React.createElement(Dialog.Close, { className: 'mt-5 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white' }, 'Close'),
				)),
			),
		),
	},
	actions: {},
});
