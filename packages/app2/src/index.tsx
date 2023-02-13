import { FormLabel } from '@learn-monorepo-yarn/core/components/inputs/FormLabel';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <StrictMode>
    <App />
    <FormLabel label="email">
      <input type="email" placeholder="taro.ringo@example.com" />
    </FormLabel>
  </StrictMode>,
);
