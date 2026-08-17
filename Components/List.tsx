import type { ReactNode } from 'react';

export type ListProps<Item> = {
	items: Item[];
	renderItem: (item: Item, index: number) => ReactNode;
	getItemKey?: (item: Item, index: number) => string | number;
	ordered?: boolean;
	className?: string;
};

export default function List<Item>({ items, renderItem, getItemKey, ordered = false, className = '' }: ListProps<Item>) {
	const Component = ordered ? 'ol' : 'ul';
	return <Component className={`divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white ${className}`}>{items.map((item, index) => <li className="px-4 py-3 text-sm text-zinc-700" key={getItemKey?.(item, index) ?? index}>{renderItem(item, index)}</li>)}</Component>;
}