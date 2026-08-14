import type { ReactNode } from 'react';
import { Separator } from '@base-ui/react/separator';

export type BannerProps = {
	children?: ReactNode;
	title?: ReactNode;
	action?: ReactNode;
	className?: string;
};

export default function Banner({ children, title, action, className = '' }: BannerProps) {
	return (
		<section className={`flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 ${className}`}>
			<div className="min-w-0">
				{title && <h2 className="font-semibold text-zinc-900">{title}</h2>}
				{title && <Separator className="my-2 bg-zinc-200" />}
				<div className="text-sm text-zinc-700">{children}</div>
			</div>
			{action && <div className="shrink-0">{action}</div>}
		</section>
	);
}