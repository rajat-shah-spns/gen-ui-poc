import type { ExperienceContext, ExperienceIntent } from './MockDataIntentService';

export type GeneratedUISpec = {
	root: string;
	elements: Record<string, {
		type: string;
		props: Record<string, unknown>;
		children?: string[];
	}>;
};

export type GeneratedUIResult = {
	spec: GeneratedUISpec;
	data: Record<string, unknown>;
	intent: ExperienceIntent;
	source: 'mock' | 'azure';
	summary: string;
	stages?: Array<{
		label: string;
		spec: GeneratedUISpec;
	}>;
};

const dashboardSpec: GeneratedUISpec = {
	root: 'renewal-insights',
	elements: {
		'renewal-insights': {
			type: 'Card',
			props: {
				title: { $state: '/workspace/title' },
				description: { $state: '/workspace/description' },
				eyebrow: { $state: '/workspace/eyebrow' },
				layout: 'stack',
				tone: 'accent',
			},
			children: ['renewal-signal', 'portfolio-pulse', 'attention-panel', 'intervention-panel'],
		},
		'renewal-signal': {
			type: 'Banner',
			props: {
				title: { $state: '/signal/title' },
				message: { $state: '/signal/message' },
			},
		},
		'portfolio-pulse': {
			type: 'Card',
			props: {
				title: 'Portfolio pulse',
				description: 'Renewals due in the next 60 days',
				eyebrow: 'Live snapshot',
				layout: 'grid',
				tone: 'default',
			},
			children: ['metric-due', 'metric-premium', 'metric-high-risk', 'metric-low-risk'],
		},
		'metric-due': {
			type: 'Card',
			props: { title: { $state: '/metrics/due/value' }, description: { $state: '/metrics/due/label' }, eyebrow: { $state: '/metrics/due/category' }, layout: 'stack', tone: 'accent' },
		},
		'metric-premium': {
			type: 'Card',
			props: { title: { $state: '/metrics/premium/value' }, description: { $state: '/metrics/premium/label' }, eyebrow: { $state: '/metrics/premium/category' }, layout: 'stack', tone: 'success' },
		},
		'metric-high-risk': {
			type: 'Card',
			props: { title: { $state: '/metrics/highRisk/value' }, description: { $state: '/metrics/highRisk/label' }, eyebrow: { $state: '/metrics/highRisk/category' }, layout: 'stack', tone: 'danger' },
		},
		'metric-low-risk': {
			type: 'Card',
			props: { title: { $state: '/metrics/lowRisk/value' }, description: { $state: '/metrics/lowRisk/label' }, eyebrow: { $state: '/metrics/lowRisk/category' }, layout: 'stack', tone: 'success' },
		},
		'attention-panel': {
			type: 'Card',
			props: {
				title: 'Renewals requiring attention',
				description: 'Ranked by renewal proximity, premium exposure, and predicted churn.',
				eyebrow: 'Priority queue',
				layout: 'stack',
				tone: 'default',
			},
			children: ['active-filter', 'renewals-table'],
		},
		'active-filter': {
			type: 'Banner',
			props: {
				title: { $state: '/filter/title' },
				message: { $state: '/filter/message' },
			},
		},
		'renewals-table': {
			type: 'Table',
			props: {
				caption: 'Top accounts recommended for intervention',
				columns: [
					{ key: 'priority', header: 'Priority', kind: 'text' },
					{ key: 'customer', header: 'Customer', kind: 'text' },
					{ key: 'renewal', header: 'Renewal', kind: 'text' },
					{ key: 'premium', header: 'Premium', kind: 'text' },
					{ key: 'churn', header: 'Churn', kind: 'text' },
					{ key: 'insight', header: 'AI insight', kind: 'text' },
					{ key: 'action', header: 'Actions', kind: 'action' },
				],
				rows: { $state: '/renewals' },
			},
		},
		'intervention-panel': {
			type: 'Card',
			props: {
				title: 'Recommended interventions',
				description: 'Suggested next steps generated from the portfolio signals.',
				eyebrow: 'Action plan',
				layout: 'grid',
				tone: 'default',
			},
			children: ['priority-actions', 'renewal-guidance', 'service-dialog', 'review-button'],
		},
		'priority-actions': {
			type: 'List',
			props: {
				items: { $state: '/actions' },
				ordered: true,
			},
		},
		'renewal-guidance': {
			type: 'Accordion',
			props: {
				title: 'How risk is prioritized',
				content: { $state: '/guidance' },
			},
		},
		'service-dialog': {
			type: 'Dialog',
			props: {
				trigger: 'Inspect top account',
				title: { $template: '${/topAccount/name} context' },
				content: { $state: '/topAccount/detail' },
			},
		},
		'review-button': { type: 'Button', props: { label: 'Start portfolio review', disabled: false } },
	},
};

const checklistSpec: GeneratedUISpec = {
	root: 'checklist',
	elements: {
		checklist: {
			type: 'Card',
			props: {
				title: { $state: '/review/title' },
				description: { $state: '/review/description' },
			},
			children: ['check-identity', 'check-policy', 'check-documents', 'guidance'],
		},
		'check-identity': { type: 'Checkbox', props: { label: { $state: '/review/checks/identity/label' }, checked: { $state: '/review/checks/identity/checked' } } },
		'check-policy': { type: 'Checkbox', props: { label: { $state: '/review/checks/policy/label' }, checked: { $state: '/review/checks/policy/checked' } } },
		'check-documents': { type: 'Checkbox', props: { label: { $state: '/review/checks/documents/label' }, checked: { $state: '/review/checks/documents/checked' } } },
		guidance: {
			type: 'Accordion',
			props: {
				title: 'Review guidance',
				content: { $state: '/review/guidance' },
			},
		},
	},
};


const customerSpec: GeneratedUISpec = {
	root: 'customer',
	elements: {
		customer: {
			type: 'Card',
			props: {
				title: { $template: '${/customer/name} — Customer 360' },
				description: { $state: '/customer/description' },
			},
			children: ['customer-status', 'customer-details', 'customer-dialog'],
		},
		'customer-status': {
			type: 'Banner',
			props: { title: { $state: '/customer/status' }, message: { $state: '/customer/statusDetail' } },
		},
		'customer-details': {
			type: 'Table',
			props: {
				columns: [{ key: 'field', header: 'Field' }, { key: 'value', header: 'Value' }],
				rows: { $state: '/customer/details' },
			},
		},
		'customer-dialog': {
			type: 'Dialog',
			props: {
				trigger: 'View service note',
				title: 'Latest service note',
				content: { $state: '/customer/latestNote' },
			},
		},
	},
};

const welcomeSpec: GeneratedUISpec = {
	root: 'welcome',
	elements: {
		welcome: {
			type: 'Card',
			props: { title: { $state: '/overview/title' }, description: { $state: '/overview/description' } },
			children: ['welcome-banner', 'welcome-list', 'welcome-button'],
		},
		'welcome-banner': {
			type: 'Banner',
			props: { title: 'Data + intent flow', message: { $state: '/overview/status' } },
		},
		'welcome-list': {
			type: 'List',
			props: {
				items: { $state: '/overview/steps' },
				ordered: true,
			},
		},
		'welcome-button': { type: 'Button', props: { label: 'Approved component', disabled: false } },
	},
};

type StageDefinition = {
	label: string;
	elements: string[];
};

function projectSpec(spec: GeneratedUISpec, visibleElements: Set<string>): GeneratedUISpec {
	const elements = Object.fromEntries(
		Object.entries(spec.elements)
			.filter(([key]) => visibleElements.has(key))
			.map(([key, element]) => [
				key,
				{
					...element,
					...(element.children ? { children: element.children.filter((child) => visibleElements.has(child)) } : {}),
				},
			]),
	);

	return { root: spec.root, elements };
}

function createStages(spec: GeneratedUISpec, definitions: StageDefinition[]) {
	const visibleElements = new Set([spec.root]);

	return definitions.map((definition) => {
		definition.elements.forEach((element) => visibleElements.add(element));
		return {
			label: definition.label,
			spec: projectSpec(spec, visibleElements),
		};
	});
}

const dashboardStages = createStages(dashboardSpec, [
	{ label: 'Creating the workspace shell', elements: [] },
	{ label: 'Adding the portfolio risk signal', elements: ['renewal-signal'] },
	{ label: 'Composing portfolio metric tiles', elements: ['portfolio-pulse', 'metric-due', 'metric-premium', 'metric-high-risk', 'metric-low-risk'] },
	{ label: 'Building the priority queue', elements: ['attention-panel', 'active-filter'] },
	{ label: 'Populating prioritized renewal records', elements: ['renewals-table'] },
	{ label: 'Finishing recommended interventions', elements: ['intervention-panel', 'priority-actions', 'renewal-guidance', 'service-dialog', 'review-button'] },
]);

const checklistStages = createStages(checklistSpec, [
	{ label: 'Creating the review workflow', elements: [] },
	{ label: 'Adding the review summary', elements: ['review-card'] },
	{ label: 'Adding verification checkpoints', elements: ['checklist', 'check-identity', 'check-policy', 'check-documents'] },
	{ label: 'Adding contextual review guidance', elements: ['guidance-accordion'] },
]);

const customerStages = createStages(customerSpec, [
	{ label: 'Creating the customer summary', elements: [] },
	{ label: 'Adding relationship signals', elements: ['customer-status'] },
	{ label: 'Populating account details', elements: ['customer-details'] },
	{ label: 'Adding the service-note interaction', elements: ['customer-dialog'] },
]);

const welcomeStages = createStages(welcomeSpec, [
	{ label: 'Creating the generated UI shell', elements: [] },
	{ label: 'Adding generation context', elements: ['welcome-banner'] },
	{ label: 'Composing approved components', elements: ['welcome-list', 'welcome-button'] },
]);

export function createMockUI(context: ExperienceContext): GeneratedUIResult {
	const templates = {
		'renewal-intelligence': { spec: dashboardSpec, summary: 'Generated a renewal intelligence workspace', stages: dashboardStages },
		'claim-review': { spec: checklistSpec, summary: 'Generated a guided review workflow', stages: checklistStages },
		'customer-summary': { spec: customerSpec, summary: 'Generated a customer summary workspace', stages: customerStages },
		'general-overview': { spec: welcomeSpec, summary: 'Generated a general component composition', stages: welcomeStages },
	};

	return {
		...templates[context.intent.kind],
		data: context.data,
		intent: context.intent,
		source: 'mock',
	};
}