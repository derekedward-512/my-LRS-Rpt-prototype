import {
  ModusWcBadge,
  ModusWcCard,
  ModusWcDivider,
  ModusWcIcon,
  ModusWcTypography,
} from '@trimble-oss/moduswebcomponents-react';

interface Step {
  title: string;
  body: string;
  skills: string[];
  lands: string;
  /** Published docs path, when the output is a document rather than a screen. */
  docsPath?: string;
  icon: string;
}

const STEPS: Step[] = [
  {
    title: 'Frame the problem',
    body: 'Explore the opportunity and decide whether it holds up.',
    skills: ['brainstorm-features', 'mrd-draft'],
    lands: 'docs/01-discovery/',
    docsPath: 'docs/discovery/',
    icon: 'lightbulb_on',
  },
  {
    title: 'Write the requirements',
    body: 'Turn the idea into a PRD, then epics and stories.',
    skills: ['prd-draft', 'epic-draft', 'user-story-draft'],
    lands: 'docs/02-requirements/',
    docsPath: 'docs/requirements/',
    icon: 'file_text',
  },
  {
    title: 'Build the rough version',
    body: 'Make it clickable before it is polished. Building is how you find what the requirements missed.',
    skills: ['rapid-prototyping'],
    lands: 'src/pages/',
    icon: 'template',
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Spacing lives on wrapper divs: customClass lands on the component's inner
          element while the Modus host stays display:inline, so margins set there misbehave. */}
      <div className="flex flex-col items-start gap-3">
        <ModusWcBadge color="tertiary" variant="filled" size="md">
          Template
        </ModusWcBadge>

        <ModusWcTypography hierarchy="h1">Your prototype starts here</ModusWcTypography>

        <div className="max-w-xl">
          <ModusWcTypography hierarchy="p" size="lg">
            This page is scaffolding — replace it with your first real screen. It is already using
            Modus, so whatever you build looks like a Trimble product from the first commit.
          </ModusWcTypography>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        {STEPS.map((step) => (
          <ModusWcCard key={step.title} bordered padding="comfortable">
            <div slot="title" className="flex items-center gap-2">
              <ModusWcIcon name={step.icon} size="sm" decorative />
              <span>{step.title}</span>
            </div>
            <div className="flex flex-col gap-4">
              <ModusWcTypography hierarchy="p" size="md">
                {step.body}
              </ModusWcTypography>
              <div className="flex flex-wrap items-center gap-2">
                {step.skills.map((skill) => (
                  <ModusWcBadge key={skill} color="primary" variant="filled" size="md">
                    /{skill}
                  </ModusWcBadge>
                ))}
                {/* Plain anchors: /docs is served outside this SPA's router. */}
                {step.docsPath ? (
                  <a
                    href={`${import.meta.env.BASE_URL}${step.docsPath}`}
                    className="text-sm text-primary"
                  >
                    writes to {step.lands}
                  </a>
                ) : (
                  <ModusWcTypography hierarchy="p" size="sm" customClass="opacity-70">
                    writes to {step.lands}
                  </ModusWcTypography>
                )}
              </div>
            </div>
          </ModusWcCard>
        ))}
      </div>

      {/* ModusWcDivider rather than a Tailwind `border-t`: the Modus reset sets
          border-width: 0 on everything, so border utilities render nothing. */}
      <div className="mt-10 max-w-xl">
        <ModusWcDivider />
        <ModusWcTypography hierarchy="p" size="md" customClass="opacity-70">
          New to React? Start with /react-frontend-basics. For the Modus component rules, use
          /modus-frontend. Everything else is in .agents/README.md and docs/README.md.
        </ModusWcTypography>
      </div>
    </div>
  );
}
