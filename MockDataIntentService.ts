export type ExperienceIntent = {
	kind: 'renewal-intelligence' | 'claim-review' | 'customer-summary' | 'general-overview';
	goal: string;
	presentation: string[];
};

export type ExperienceContext = {
	data: Record<string, unknown>;
	intent: ExperienceIntent;
};

const renewalContext: ExperienceContext = {
	intent: {
		kind: 'renewal-intelligence',
		goal: 'Prioritize commercial renewals by urgency, value, and churn risk, then recommend interventions.',
		presentation: ['portfolio summary show in red background', 'risk signal', 'metric grid', 'priority table', 'recommended actions'],
  },
	data: {
		workspace: {
			title: 'Renewal intelligence workspace',
			description: 'Commercial portfolio signals prioritized by urgency, value, and churn risk.',
			eyebrow: 'AI-assisted portfolio review',
		},
		signal: {
			title: 'Portfolio signal',
			message: '39 high-risk renewals represent $1.7M in premium. Eight accounts have both urgent timing and churn scores above 80%.',
		},
		metrics: {
			due: { value: '142', label: 'Total renewals due', category: 'Volume' },
			premium: { value: '$4.8M', label: 'Premium at risk', category: 'Exposure' },
			highRisk: { value: '39', label: 'High-risk accounts', category: 'Needs action' },
			lowRisk: { value: '46', label: 'Low-risk accounts', category: 'On track' },
		},
		filter: {
			title: 'Active view: All 142 renewals',
			message: 'Risk mix — High 39 · Moderate 57 · Low 46. Updated 2 minutes ago.',
		},
		renewals: [
			{ priority: 'URGENT', customer: 'Acme Logistics', renewal: '12 days', premium: '$48,000', churn: '91%', insight: 'Competitor pricing is 18% lower; bundle value not discussed.', action: 'Act now' },
			{ priority: 'HIGH', customer: 'NorthStar Manufacturing', renewal: '18 days', premium: '$32,500', churn: '84%', insight: 'Coverage gap found compared with similar accounts.', action: 'Prepare renewal' },
			{ priority: 'MODERATE', customer: 'GreenTech Services', renewal: '24 days', premium: '$21,000', churn: '62%', insight: 'Renewal discussion has not started; peers engage 30 days out.', action: 'Schedule call' },
			{ priority: 'LOW', customer: 'Apex Retail Group', renewal: '35 days', premium: '$15,900', churn: '22%', insight: 'Strong payment and service history; no negative signals.', action: 'Review offer' },
			{ priority: 'MODERATE', customer: 'Harbor Foods', renewal: '41 days', premium: '$27,400', churn: '58%', insight: 'Two unresolved service issues may affect renewal sentiment.', action: 'Resolve issues' },
		],
		actions: [
			'Contact eight urgent accounts today',
			'Prepare coverage comparisons for high-risk accounts',
			'Resolve open service issues before outreach',
		],
		guidance: 'The prioritization combines renewal timing, premium exposure, churn score, unresolved service activity, and engagement history.',
		topAccount: {
			name: 'Acme Logistics',
			detail: 'Renewal is due in 12 days. The account has no active service issues, but a competitor quote is 18% lower and a multi-policy discount has not been discussed.',
		},
	},
};

const claimReviewContext: ExperienceContext = {
	intent: {
		kind: 'claim-review',
		goal: 'Guide an adjuster through mandatory claim review checks and supporting guidance.',
		presentation: ['review card', 'interactive checklist', 'expandable guidance'],
	},
	data: {
		review: {
			title: 'New claim review',
			description: 'Complete the mandatory checks before moving the claim to assessment.',
			checks: {
				identity: { label: 'Identity details verified', checked: true },
				policy: { label: 'Policy coverage confirmed', checked: false },
				documents: { label: 'Supporting documents reviewed', checked: false },
			},
			guidance: 'Confirm policy dates, insured parties, incident details, and mandatory attachments before continuing.',
		},
	},
};

const customerContext: ExperienceContext = {
	intent: {
		kind: 'customer-summary',
		goal: 'Summarize customer relationship health, account activity, and the latest service context.',
		presentation: ['customer card', 'relationship signal', 'account details table', 'service note dialog'],
	},
	data: {
		customer: {
			name: 'Maya Cohen',
			description: 'A compact service view for a preferred customer.',
			status: 'Preferred customer',
			statusDetail: '12-year relationship with no overdue balances.',
			details: [
				{ field: 'Active policies', value: '4' },
				{ field: 'Open claims', value: '1' },
				{ field: 'Last interaction', value: '2 days ago' },
			],
			latestNote: 'Customer requested an email update when the open claim moves to assessment.',
		},
	},
};

const generalContext: ExperienceContext = {
	intent: {
		kind: 'general-overview',
		goal: 'Explain how Foundation Generative UI turns data and intent into a constrained interface.',
		presentation: ['overview card', 'status banner', 'ordered process', 'action'],
	},
	data: {
		overview: {
			title: 'Foundation Generative UI',
			description: 'Describe an interface and render it with trusted React components.',
			status: 'Mock data and intent are active; no model credentials are required.',
			steps: [
				'A service returns domain data and presentation intent',
				'The AI SDK produces a catalog-constrained JSON specification',
				'json-render binds external state and renders approved components',
			],
		},
	},
};

export async function getMockDataAndIntent(prompt: string): Promise<ExperienceContext> {
	await new Promise((resolve) => setTimeout(resolve, 300));
	const normalizedPrompt = prompt.toLowerCase();

	if (normalizedPrompt.includes('renewal') || normalizedPrompt.includes('dashboard')) return renewalContext;
	if (normalizedPrompt.includes('checklist') || normalizedPrompt.includes('review')) return claimReviewContext;
	if (normalizedPrompt.includes('customer') || normalizedPrompt.includes('profile')) return customerContext;
	return generalContext;
}
