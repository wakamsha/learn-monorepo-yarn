import { css } from '@linaria/core';
import { useId } from 'react';
import { FormLabel } from '.';
import { gutter } from '../../../utils/Style';

export default {
  component: FormLabel,
};

const BasicComponent = () => {
  const inputId = useId();

  return (
    <>
      <h2>Nest</h2>
      <FormLabel label="メールアドレス">
        <input type="email" placeholder="taro.ringo@example.com" />
      </FormLabel>

      <h2>Use Id</h2>
      <div className={styleFormGroup}>
        <FormLabel label="メールアドレス" htmlFor={inputId} />
        <input type="email" id={inputId} placeholder="taro.ringo@example.com" />
      </div>
    </>
  );
};

const styleFormGroup = css`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${gutter(4)};
  align-items: center;
`;

export const Basic = {
  render: BasicComponent,
};
