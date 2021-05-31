---
nav:
  title: Components
  path: /components
---

## 周一开头

```tsx
import React from 'react';
import Calendar from './index';

export default () => <Calendar weekLabelIndex={1} />;
```

## 周三开头

```tsx
import React from 'react';
import Calendar from './index';

export default () => <Calendar weekLabelIndex={3} />;
```

## 周日开头

```tsx
import React from 'react';
import Calendar from './index';

export default () => <Calendar weekLabelIndex={0} />;
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
