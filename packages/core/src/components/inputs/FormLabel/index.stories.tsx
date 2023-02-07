import { useId } from 'react';
import { FormLabel } from '.';

export default {
  component: FormLabel,
};

const BasicPresentation = () => {
  const inputId = useId();

  return (
    <>
      <h2>Nest</h2>
      <FormLabel label="メールアドレス">
        <input type="email" placeholder="taro.ringo@example.com" />
      </FormLabel>

      <h2>Use Id</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <FormLabel label="メールアドレス" htmlFor={inputId} />
        <input type="email" id={inputId} placeholder="taro.ringo@example.com" />
      </div>
    </>
  );
};

export const Basic = {
  render: BasicPresentation,
};
