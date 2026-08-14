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
		Card: ({ props, children }) => React.createElement(Card, { title: props.title, description: props.description ?? undefined }, children),
		Table: ({ props }) => React.createElement(Table, { columns: props.columns, rows: props.rows }),
		List: ({ props }) => React.createElement(List, { items: props.items, ordered: props.ordered ?? false, renderItem: (item) => String(item) }),
		Banner: ({ props }) => React.createElement(Banner, { title: props.title ?? undefined }, props.message),
		Button: ({ props, emit }) => React.createElement(Button, { disabled: props.disabled ?? false, onClick: () => emit('press') }, props.label),
		Accordion: ({ props }) => React.createElement(
			Accordion.Root,
			{},
			React.createElement(Accordion.Item, {},
				React.createElement(Accordion.Header, {}, React.createElement(Accordion.Trigger, {}, props.title)),
				React.createElement(Accordion.Panel, {}, props.content),
			),
		),
		Checkbox: ({ props, emit }) => React.createElement(
			'label',
			{},
			React.createElement(Checkbox.Root, { checked: props.checked ?? false, onCheckedChange: () => emit('change') }),
			props.label,
		),
		Dialog: ({ props }) => React.createElement(
			Dialog.Root,
			{},
			React.createElement(Dialog.Trigger, {}, props.trigger),
			React.createElement(Dialog.Portal, {},
				React.createElement(Dialog.Backdrop, {}),
				React.createElement(Dialog.Popup, {},
					React.createElement(Dialog.Title, {}, props.title),
					React.createElement(Dialog.Description, {}, props.content),
				),
			),
		),
	},
	actions: {},
});
