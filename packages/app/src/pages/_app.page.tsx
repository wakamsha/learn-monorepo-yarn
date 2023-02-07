import '@learn-monorepo-yarn/core/styles/app.scss';
import { type AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <Component
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...pageProps}
  />
);
export default App;
