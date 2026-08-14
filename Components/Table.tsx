import type { ReactNode } from 'react';

export type TableColumn<Row> = {
	key: string;
	header: ReactNode;
	render?: (row: Row) => ReactNode;
};

export type TableProps<Row> = {
	columns: TableColumn<Row>[];
	rows: Row[];
	getRowKey?: (row: Row, index: number) => string | number;
	caption?: ReactNode;
	className?: string;
};

export default function Table<Row>({ columns, rows, getRowKey, caption, className = '' }: TableProps<Row>) {
	return (
		<div className={`overflow-x-auto rounded-xl border border-zinc-200 ${className}`}>
			<table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
				{caption && <caption className="p-4 text-left font-medium text-zinc-900">{caption}</caption>}
				<thead className="bg-zinc-50">
					<tr>{columns.map((column) => <th className="px-4 py-3 font-medium text-zinc-600" key={column.key} scope="col">{column.header}</th>)}</tr>
				</thead>
				<tbody className="divide-y divide-zinc-100 bg-white">
					{rows.map((row, index) => <tr key={getRowKey?.(row, index) ?? index}>{columns.map((column) => <td className="px-4 py-3 text-zinc-800" key={column.key}>{column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}</td>)}</tr>)}
				</tbody>
			</table>
		</div>
	);
}