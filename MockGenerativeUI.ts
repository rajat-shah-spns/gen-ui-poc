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
				title: 'Renewal intelligence workspace',
				description: 'Commercial portfolio signals prioritized by urgency, value, and churn risk.',
				eyebrow: 'AI-assisted portfolio review',
				layout: 'stack',
				tone: 'accent',
			},
			children: ['renewal-signal', 'portfolio-pulse', 'attention-panel', 'intervention-panel'],
		},
		'renewal-signal': {
			type: 'Banner',
			props: {
				title: 'Portfolio signal',
				message: '39 high-risk renewals represent $1.7M in premium. Eight accounts have both urgent timing and churn scores above 80%.',
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
			props: { title: '142', description: 'Total renewals due', eyebrow: 'Volume', layout: 'stack', tone: 'accent' },
		},
		'metric-premium': {
			type: 'Card',
			props: { title: '$4.8M', description: 'Premium at risk', eyebrow: 'Exposure', layout: 'stack', tone: 'success' },
		},
		'metric-high-risk': {
			type: 'Card',
			props: { title: '39', description: 'High-risk accounts', eyebrow: 'Needs action', layout: 'stack', tone: 'danger' },
		},
		'metric-low-risk': {
			type: 'Card',
			props: { title: '46', description: 'Low-risk accounts', eyebrow: 'On track', layout: 'stack', tone: 'success' },
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
				title: 'Active view: All 142 renewals',
				message: 'Risk mix — High 39 · Moderate 57 · Low 46. Updated 2 minutes ago.',
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
				rows: [
					{ priority: 'URGENT', customer: 'Acme Logistics', renewal: '12 days', premium: '$48,000', churn: '91%', insight: 'Competitor pricing is 18% lower; bundle value not discussed.', action: 'Act now' },
					{ priority: 'HIGH', customer: 'NorthStar Manufacturing', renewal: '18 days', premium: '$32,500', churn: '84%', insight: 'Coverage gap found compared with similar accounts.', action: 'Prepare renewal' },
					{ priority: 'MODERATE', customer: 'GreenTech Services', renewal: '24 days', premium: '$21,000', churn: '62%', insight: 'Renewal discussion has not started; peers engage 30 days out.', action: 'Schedule call' },
					{ priority: 'LOW', customer: 'Apex Retail Group', renewal: '35 days', premium: '$15,900', churn: '22%', insight: 'Strong payment and service history; no negative signals.', action: 'Review offer' },
					{ priority: 'MODERATE', customer: 'Harbor Foods', renewal: '41 days', premium: '$27,400', churn: '58%', insight: 'Two unresolved service issues may affect renewal sentiment.', action: 'Resolve issues' },
				],
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
				items: ['Contact eight urgent accounts today', 'Prepare coverage comparisons for high-risk accounts', 'Resolve open service issues before outreach'],
				ordered: true,
			},
		},
		'renewal-guidance': {
			type: 'Accordion',
			props: {
				title: 'How risk is prioritized',
				content: 'The mock combines renewal timing, premium exposure, churn score, unresolved service activity, and engagement history. A live implementation would use governed business data and explainable scoring.',
			},
		},
		'service-dialog': {
			type: 'Dialog',
			props: {
				trigger: 'Inspect top account',
				title: 'Acme Logistics context',
				content: 'Renewal is due in 12 days. The account has no active service issues, but a competitor quote is 18% lower and a multi-policy discount has not been discussed.',
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
				title: 'New claim review',
				description: 'A guided checklist generated for the requested workflow.',
			},
			children: ['check-identity', 'check-policy', 'check-documents', 'guidance'],
		},
		'check-identity': { type: 'Checkbox', props: { label: 'Identity details verified', checked: true } },
		'check-policy': { type: 'Checkbox', props: { label: 'Policy coverage confirmed', checked: false } },
		'check-documents': { type: 'Checkbox', props: { label: 'Supporting documents reviewed', checked: false } },
		guidance: {
			type: 'Accordion',
			props: {
				title: 'Review guidance',
				content: 'Confirm policy dates, insured parties, incident details, and mandatory attachments before continuing.',
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
				title: 'Customer 360',
				description: 'A compact service view for Maya Cohen.',
			},
			children: ['customer-status', 'customer-details', 'customer-dialog'],
		},
		'customer-status': {
			type: 'Banner',
			props: { title: 'Preferred customer', message: '12-year relationship with no overdue balances.' },
		},
		'customer-details': {
			type: 'Table',
			props: {
				columns: [{ key: 'field', header: 'Field' }, { key: 'value', header: 'Value' }],
				rows: [
					{ field: 'Active policies', value: '4' },
					{ field: 'Open claims', value: '1' },
					{ field: 'Last interaction', value: '2 days ago' },
				],
			},
		},
		'customer-dialog': {
			type: 'Dialog',
			props: {
				trigger: 'View service note',
				title: 'Latest service note',
				content: 'Customer requested an email update when the open claim moves to assessment.',
			},
		},
	},
};

const welcomeSpec: GeneratedUISpec = {
	root: 'welcome',
	elements: {
		welcome: {
			type: 'Card',
			props: { title: 'Foundation Generative UI', description: 'Describe an interface and render it with trusted React components.' },
			children: ['welcome-banner', 'welcome-list', 'welcome-button'],
		},
		'welcome-banner': {
			type: 'Banner',
			props: { title: 'Mock mode is active', message: 'No model credentials are required for this demonstration.' },
		},
		'welcome-list': {
			type: 'List',
			props: {
				items: ['Prompt intent is classified locally', 'A valid JSON UI specification is selected', 'json-render maps it to the approved registry'],
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
	{ label: 'Adding verification checkpoints', elements: ['check-identity', 'check-policy', 'check-documents'] },
	{ label: 'Adding contextual review guidance', elements: ['guidance'] },
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

export function createMockUI(prompt: string): GeneratedUIResult {
	const normalizedPrompt = prompt.toLowerCase();

	if (normalizedPrompt.includes('dashboard') || normalizedPrompt.includes('claim') && normalizedPrompt.includes('metric')) {
		return { spec: dashboardSpec, source: 'mock', summary: 'Generated a renewal intelligence workspace', stages: dashboardStages };
	}

	if (normalizedPrompt.includes('checklist') || normalizedPrompt.includes('review')) {
		return { spec: checklistSpec, source: 'mock', summary: 'Generated a guided review workflow', stages: checklistStages };
	}

	if (normalizedPrompt.includes('customer') || normalizedPrompt.includes('profile')) {
		return { spec: customerSpec, source: 'mock', summary: 'Generated a customer summary workspace', stages: customerStages };
	}

	return { spec: welcomeSpec, source: 'mock', summary: 'Generated a general component composition', stages: welcomeStages };
}