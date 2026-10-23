---
name: react-frontend-basics
description: The stack cookbook — how to add a page, a form, a table, a modal, shared state, or fake data in this React + TypeScript + Vite + Tailwind prototype, plus what the common errors mean. Use when someone needs the mechanics of building UI here, is new to React or this codebase, or hits a build error they don't recognize — "how do I add a page", "how do I make a form", "what does this error mean".
---

# React Frontend Basics

The mechanics of building in this repo, written for someone who is comfortable with the
product but not living in React every day. For *what* to build and at what fidelity, see
`rapid-prototyping`.

## The stack in one paragraph

**React** renders UI from components — functions that return markup. **TypeScript** checks
that the data flowing between them matches what each expects, before you run anything.
**Vite** serves the app locally and rebuilds instantly on save. **Tailwind** styles things
with utility classes in the markup instead of a separate stylesheet. **React Router** maps
URLs to pages.

```bash
npm run dev      # http://localhost:5173, live-reloads on save
npm run build    # the gate — typecheck + production build
```

## Add a page

1. Create `src/pages/ThingPage.tsx`:

```tsx
export default function ThingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Thing</h1>
    </main>
  );
}
```

2. Route it in `src/App.tsx`:

```tsx
import ThingPage from '@/pages/ThingPage';
// inside <Routes>
<Route path="/thing" element={<ThingPage />} />
```

Skip step 2 and the page is unreachable.

## Link between pages

```tsx
import { Link, useNavigate } from 'react-router-dom';

<Link to="/thing" className="text-blue-600 underline">Go to Thing</Link>;

// or, after an action:
const navigate = useNavigate();
<button onClick={() => navigate('/thing')}>Continue</button>;
```

Use `<Link>`, not `<a href>` — an anchor reloads the whole app and loses state.

## Show a list of fake data

```tsx
interface Employee {
  id: string;
  name: string;
  role: string;
}

const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alex Rivera', role: 'Foreman' },
  { id: '2', name: 'Sam Chen', role: 'Operator' },
];

export default function RosterPage() {
  return (
    <ul className="divide-y divide-slate-200">
      {EMPLOYEES.map((employee) => (
        <li key={employee.id} className="py-3">
          <p className="font-medium text-slate-900">{employee.name}</p>
          <p className="text-sm text-slate-600">{employee.role}</p>
        </li>
      ))}
    </ul>
  );
}
```

Every item in a `.map()` needs a unique `key`. Once a second page needs `EMPLOYEES`, move
it to `src/data/employees.ts` and import it.

## Remember something the user did

`useState` holds a value that, when changed, re-renders the component:

```tsx
import { useState } from 'react';

const [selectedId, setSelectedId] = useState<string | null>(null);

<button onClick={() => setSelectedId(employee.id)}>Select</button>;
{selectedId && <p>Selected {selectedId}</p>}
```

Never assign to the variable directly (`selectedId = '2'` does nothing) — always call the
setter.

## A form

```tsx
const [form, setForm] = useState({ name: '', email: '' });

<form
  onSubmit={(event) => {
    event.preventDefault();
    console.log(form);
  }}
  className="space-y-4"
>
  <label className="block">
    <span className="text-sm font-medium text-slate-700">Name</span>
    <input
      value={form.name}
      onChange={(event) => setForm({ ...form, name: event.target.value })}
      className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
    />
  </label>
  <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white">
    Save
  </button>
</form>;
```

`event.preventDefault()` stops the browser reloading the page. `{ ...form, name: ... }`
copies the object with one field replaced — React needs a new object to notice the change.

## A table

```tsx
<table className="w-full text-left text-sm">
  <thead className="border-b border-slate-200 text-slate-600">
    <tr>
      <th className="py-2 font-medium">Name</th>
      <th className="py-2 font-medium">Role</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-slate-100">
    {EMPLOYEES.map((employee) => (
      <tr key={employee.id}>
        <td className="py-2">{employee.name}</td>
        <td className="py-2">{employee.role}</td>
      </tr>
    ))}
  </tbody>
</table>
```

## Show and hide something

```tsx
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>Open</button>;

{isOpen && (
  <div className="fixed inset-0 grid place-items-center bg-black/40">
    <div className="rounded-lg bg-white p-6">
      <p>Contents</p>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  </div>
)}
```

`{condition && <div/>}` renders the element only when the condition is true.

## Share state across pages

Lift it into `App.tsx` and pass it down as props. If that gets painful across more than two
or three levels, use React Context — but in a prototype, prop-drilling two levels is
usually the cheaper answer.

## Reuse a piece of UI

Once markup appears three times, extract it to `src/components/StatusBadge.tsx`:

```tsx
interface StatusBadgeProps {
  label: string;
  tone: 'ok' | 'warn';
}

export default function StatusBadge({ label, tone }: StatusBadgeProps) {
  const styles = tone === 'ok' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800';
  return <span className={`rounded-full px-2 py-0.5 text-xs ${styles}`}>{label}</span>;
}
```

Twice is not enough. Three times, extract.

## Tailwind quick reference

| Need | Classes |
|---|---|
| Vertical stack with gaps | `flex flex-col gap-4` |
| Row, spaced apart | `flex items-center justify-between` |
| Grid | `grid grid-cols-3 gap-4` |
| Page container | `mx-auto max-w-3xl px-6 py-10` |
| Card | `rounded-lg border border-slate-200 bg-white p-5` |
| Primary button | `rounded bg-slate-900 px-4 py-2 text-white` |
| Muted text | `text-sm text-slate-600` |
| Heading | `text-2xl font-semibold text-slate-900` |

Numbers are a 4px scale: `p-4` is 16px. Responsive prefixes apply above a width:
`grid-cols-1 md:grid-cols-3`.

## Common errors

| Error | What it means |
|---|---|
| `Cannot find name 'X'` | Missing import at the top of the file |
| `Property 'x' does not exist on type` | Reading a field the interface doesn't declare — add it |
| `Type 'string \| null' is not assignable to 'string'` | The value might be null; guard it with `if (!value) return null;` |
| `'X' is declared but its value is never read` | Strict mode rejects unused variables — delete it |
| `Each child in a list should have a unique "key"` | Add `key={item.id}` in a `.map()` |
| Blank page, console error about hooks | `useState` called inside a condition or loop — hooks go at the top level of the component |
| Styles not applying | Tailwind class typo, or a dynamically built class string — write full class names, not `` `text-${color}-500` `` |

## Rules

- Never use `any`. Use `unknown` and narrow, or declare the actual shape.
- `interface` for object shapes, `type` for unions.
- Tailwind classes only — no inline `style`, no new CSS files.
- Import with `@/`, never `../../`.
- Run `npm run build` before calling it done.
