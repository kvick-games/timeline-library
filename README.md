# Timeline Library

Reusable React timeline experience for grouped dated content.

## Install from GitHub

```sh
npm install @kvick-games/timeline-library@github:kvick-games/timeline-library#v0.1.0
```

```tsx
import {TimelineExperience, type TimelineDefinition} from '@kvick-games/timeline-library';
import '@kvick-games/timeline-library/style.css';

export function App({definition}: {definition: TimelineDefinition}) {
  return <TimelineExperience definition={definition} />;
}
```

## Package Surface

- `TimelineExperience`
- `TimelineDefinition` and related group, lane, dated item, event type, facet, content type, article, copy, color, and logo types
- Pure date, slug, article indexing, and processed timeline helpers
- `@kvick-games/timeline-library/style.css`

## Development

```sh
npm install
npm run lint
npm run build
npm pack --dry-run
```

The `dist` folder is committed intentionally because this package is consumed as a tagged GitHub git dependency rather than through a package registry.
