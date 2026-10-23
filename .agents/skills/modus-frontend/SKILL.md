---
name: modus-frontend
description: Build UI with Modus, Trimble's design system — which component to reach for, the color and typography tokens, icon names, and the React integration gotchas that cost the most time. Use whenever building or restyling any screen in this prototype, adding a Modus component, picking colors or fonts, working with Modus icons, or debugging a Modus component that renders wrong.
---

# Modus Frontend

Modus is Trimble's design system and it is already wired up in this repo. Building with it is
what makes a prototype look like a Trimble product instead of a generic React app — which
matters, because stakeholders judge plausibility partly on whether it looks real.

Docs: <https://modus.trimble.com>

## Already set up

| Piece | Where |
|---|---|
| `@trimble-oss/moduswebcomponents-react` | `package.json` (pinned exact, `-react19` build) |
| Theme provider | `src/main.tsx` — wraps the app in `ModusWcThemeProvider` |
| Theme attributes | `index.html` — `data-theme="modus-modern-light"`, set before first paint |
| Global styles | `src/index.css` — `modus-wc-styles.css` imported **before** Tailwind |
| Tokens → Tailwind | `src/index.css` `@theme inline` block |
| Icon font | `public/modus-web-components/modus-icons.css`, linked from `index.html` |
| Open Sans | `index.html`, via Google Fonts |
| App shell | `src/layouts/AppShell.tsx` — `ModusWcNavbar` |

You should not need to touch any of that. If you think you do, read the gotchas below first.

## Use Modus components, not hand-rolled markup

Before styling a `<div>` to look like something, check whether Modus already ships it. Reach
for the component:

| Need | Component |
|---|---|
| Button | `ModusWcButton` |
| Status pill / tag | `ModusWcBadge` |
| Card surface | `ModusWcCard` |
| Any text | `ModusWcTypography` |
| Icon | `ModusWcIcon` |
| Alert / banner | `ModusWcAlert` |
| Table | `ModusWcTable` |
| Inputs, select, checkbox | `ModusWcTextInput`, `ModusWcSelect`, `ModusWcCheckbox` |
| Modal | `ModusWcModal` |
| Tabs | `ModusWcTabs` |
| Top nav | `ModusWcNavbar` |
| Avatar | `ModusWcAvatar` |
| Progress | `ModusWcProgress` |
| Divider | `ModusWcDivider` |

The full catalog is available through the **`modus-docs` MCP server** configured in
`.mcp.json`: call `get_modus_component_data` with the component name and the version from
`package.json`. Use it rather than guessing at props — the prop names and slot names are not
predictable, and the MCP returns the real ones.

**Tailwind is for layout, not for components.** Use it for `flex`, `grid`, `gap-*`,
`max-w-*`, spacing and responsive behavior. If you are using Tailwind to make a `<span>` look
like a badge, stop and use `ModusWcBadge`.

## Color

**Never write a hex value or a generic Tailwind color** (`bg-blue-500`, `text-gray-600`).
Colors come from Modus tokens so that themes and dark mode keep working.

The `@theme inline` block in `src/index.css` maps the Modus tokens onto Tailwind utilities:

- `bg-base-page` — the page background
- `bg-base-100` / `bg-base-200` / `bg-base-300` — raised and recessed surfaces
- `text-base-content` — default text color
- `text-primary` / `bg-primary` — Trimble Blue, for primary actions only
- `text-success`, `text-warning`, `text-danger` — semantic status only

In raw CSS, use the variables directly: `var(--modus-wc-color-primary)`,
`var(--modus-wc-color-base-content)`, and so on.

Semantic colors mean something. Warning orange is a *status*, never a button color.

**Borders are the exception.** Modus ships a preflight that sets `border-width: 0` on
`*, ::after, ::before`, and it wins over Tailwind's layered utilities — so `border-t`,
`border`, and friends render **nothing**, silently. For a separator use `ModusWcDivider`. If
you genuinely need a border on a plain element, set the width explicitly in the same rule
(e.g. `style={{ borderTopWidth: 1 }}` or a `border-t-[1px]` arbitrary value) and verify it in
the browser.

## Layout and spacing — put it on a wrapper, not on the component

This is the single most common way to waste time here.

**`customClass` is applied to the component's *inner* element, not to the host**, and the
host itself renders `display: inline`. So `customClass="mt-4 block"` does not do what it
looks like it does — the margin lands on an inner element inside an inline host, and you get
spacing that is either missing or subtly wrong.

Put all layout and spacing on plain wrapper `<div>`s with Tailwind, and prefer
`flex flex-col gap-*` over margins:

```tsx
// Good — spacing owned by wrappers
<div className="flex flex-col items-start gap-3">
  <ModusWcBadge>Draft</ModusWcBadge>
  <ModusWcTypography hierarchy="h1">Title</ModusWcTypography>
  <div className="max-w-xl">
    <ModusWcTypography hierarchy="p" size="lg">Body copy</ModusWcTypography>
  </div>
</div>

// Bad — margins on customClass, inside an inline host
<ModusWcTypography hierarchy="h1" customClass="block mt-3 max-w-xl">Title</ModusWcTypography>
```

Keep `customClass` for text-level concerns that genuinely belong on the inner element, like
`opacity-70` for muted text.

## Typography

Open Sans, via `ModusWcTypography`:

```tsx
<ModusWcTypography hierarchy="h1">Page title</ModusWcTypography>
<ModusWcTypography hierarchy="p" size="md">Supporting copy</ModusWcTypography>
```

- `hierarchy` sets the **semantic** element (`h1`–`h6`, `p`) — one `h1` per page, don't skip
  levels.
- `size` and `weight` (`light`, `normal`, `semibold`, `bold`) set the **visual** scale
  independently.
- **Dynamic text goes in the `label` prop, not children.** Slotted children lose their `size`
  and `weight` on re-render. Static literal copy is fine as children; anything computed
  (`{count}`, a template literal) must use `label={...}`.

### The size names are smaller than they look

Modus size tokens do **not** match Tailwind's scale. Measured at 1.16.0:

| `size` | Typography | | `size` | Badge |
|---|---|---|---|---|
| `xs` | 10px | | `sm` | 10px |
| `sm` | 12px | | `md` | 12px (default) |
| `md` | 14px (default) | | `lg` | 14px |
| `lg` | 16px | | | |

So `size="sm"` is **not** a normal small body size — it is 12px, and `xs` is 10px, which is
too small to read comfortably. Use `md` for body copy and `lg` for lead paragraphs. Reserve
`sm` for genuinely secondary metadata. Badges default to `md`; `size="sm"` gives a 10px badge
that is hard to read.

## Icons — the naming trap

`ModusWcIcon` renders an icon font that resolves the icon name as a **ligature**:

```tsx
<ModusWcIcon name="lightbulb_on" size="sm" decorative />
```

**Icon names use underscores, not hyphens.** `lightbulb_on` works; `lightbulb-on` silently
renders as a few pixels of nothing. This is easy to get wrong because the Modus Icons CSS
variable list on the web spells the same icons with hyphens
(`--modus-outlined-icon-lightbulb-on`). Convert to underscores for the `name` prop.

There is no error when a name is wrong — the icon just doesn't appear. To verify a name is
real, measure the rendered glyph in the browser: a valid name renders as exactly one glyph
at the font size, a wrong name renders near-zero width.

```js
// paste in the browser console; 20 = valid, anything else = wrong name
const i = document.createElement('i');
i.style.cssText = 'font-family:modus-icons;font-size:20px';
i.textContent = 'lightbulb_on';
document.body.appendChild(i);
i.getBoundingClientRect().width;
```

Sizes are `xs` (16px), `sm` (20px), `md` (24px), `lg` (32px) — set with the `size` prop, not
a Tailwind text size. Add `decorative` for icons that carry no standalone meaning; give
meaningful icons an `aria-label`.

## React integration gotchas

These are the ones that actually cost time.

- **No `React.StrictMode`.** Its dev double-mount reparents slotted children of Modus web
  components and throws `NotFoundError: removeChild`. `src/main.tsx` deliberately omits it —
  don't add it back.
- **Don't unmount slotted children to toggle them.** Inside a Modus host, keep the element in
  the tree and hide it (`hidden`, or a CSS class). Conditionally rendering
  `{open && <div slot="footer">}` reparents the slot and crashes.
- **Input events are `inputChange`, not `onChange`,** and the payload is a native
  `InputEvent`. Read the value as `event.detail?.target?.value` — `String(event.detail)`
  gives you `"[object InputEvent]"`.
- **Checkboxes and switches** give `{ newValue: boolean }` on `inputChange`.
- **Buttons emit `buttonClick`** (`onButtonClick` on the React wrapper).
- **Select options come from the `options` prop**, an array — not slotted `<option>`
  children, which render as stray text next to an empty control.
- **Let Modus components own their state.** Don't drive an accordion or modal's open state
  from `useState` unless the component's API asks you to.

## Styling a Modus component

In order of preference: documented **props** (`variant`, `size`, `color`, `bordered`) →
**`customClass`** on the host for layout and spacing → scoped CSS → `::part` only when the
public API genuinely cannot reach it. Don't reach for inline styles or shadow-piercing when a
prop would do.

## Rules

- Modus components for UI, Tailwind for layout — on **wrapper divs**, not `customClass`.
- Modus tokens for color. No hex, no `bg-blue-500`. Borders need `ModusWcDivider` or an
  explicit width.
- Body copy is `size="md"`; `sm` and `xs` are 12px and 10px.
- Icon names use underscores; verify before trusting.
- No emoji in UI.
- At most one primary-filled button per section — everything else tertiary or outlined.
- Check the `modus-docs` MCP for props rather than guessing.

## Related

- `/react-frontend-basics` — the React and TypeScript mechanics underneath this.
- `/rapid-prototyping` — what to build and at what fidelity.
- `/design-critique` — reviewing a screen once it exists.
