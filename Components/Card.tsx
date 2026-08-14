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
	action?: CardAction;
	footer?: ReactNode;
	className?: string;
};

export default function Card({
	title,
	children,
	description,
	action,
	footer,
	className = '',
}: CardProps) {
	return (
		<article className={`rounded-xl border border-zinc-200 bg-white p-5 shadow-sm ${className}`}>
			<div className="flex items-start justify-between gap-4">
				<div>
					<h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
					{description && <p className="mt-1 text-sm text-zinc-600">{description}</p>}
				</div>
				{action && (
					<Button className="shrink-0 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white" onClick={action.onClick}>
						{action.label}
					</Button>
				)}
			</div>
			{children && <div className="mt-4">{children}</div>}
			{footer && <footer className="mt-4 border-t border-zinc-200 pt-4 text-sm text-zinc-600">{footer}</footer>}
		</article>
	);
}