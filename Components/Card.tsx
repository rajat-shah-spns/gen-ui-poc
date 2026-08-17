import type { ReactNode } from 'react';
import { Button } from '@base-ui/react/button';

export type CardAction = {
	label: string;
	onClick?: () => void;
};

export type CardProps = {
	title: ReactNode;
	children?: ReactNode;
	description?: ReactNode;
	eyebrow?: ReactNode;
	action?: CardAction;
	footer?: ReactNode;
	layout?: 'stack' | 'grid';
	tone?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
	className?: string;
};

export default function Card({
	title,
	children,
	description,
	eyebrow,
	action,
	footer,
	layout = 'stack',
	tone = 'default',
	className = '',
}: CardProps) {
	const toneClass = {
		default: 'border-zinc-200 bg-white',
		accent: 'border-indigo-200 bg-indigo-50/40',
		success: 'border-emerald-200 bg-emerald-50/50',
		warning: 'border-amber-200 bg-amber-50/50',
		danger: 'border-rose-200 bg-rose-50/50',
	}[tone];
	const contentClass = layout === 'grid' ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-4' : 'space-y-4';

	return (
		<article className={`rounded-lg border p-5 shadow-sm ${toneClass} ${className}`}>
			<div className="flex items-start justify-between gap-4">
				<div>
					{eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{eyebrow}</p>}
					<h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
					{description && <p className="mt-1 text-sm text-zinc-600">{description}</p>}
				</div>
				{action && (
					<Button className="shrink-0 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white" onClick={action.onClick}>
						{action.label}
					</Button>
				)}
			</div>
			{children && <div className={`mt-5 ${contentClass}`}>{children}</div>}
			{footer && <footer className="mt-4 border-t border-zinc-200 pt-4 text-sm text-zinc-600">{footer}</footer>}
		</article>
	);
}