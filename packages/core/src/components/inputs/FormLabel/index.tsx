import { css } from '@linaria/core';
import { useId, type ReactNode } from 'react';
import { FontSize, IconSize } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../utils/Style';

type Props = {
  label: string;
} & XOR<
  {
    htmlFor: string;
  },
  {
    children: ReactNode;
  }
>;

export const FormLabel = ({ label, htmlFor, children }: Props) => {
  const tooltipId = useId();

  return (
    <label htmlFor={htmlFor} className={styleBase}>
      <span id={tooltipId} className={styleLabelText}>
        {label}
      </span>
      {children}
    </label>
  );
};

const styleBase = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(2)};
`;

const styleLabelText = css`
  display: inline-flex;
  gap: ${gutter(1)};
  align-items: center;
  width: -moz-fit-content;
  width: fit-content;
  font-size: ${FontSize.Small};
  color: ${cssVar('TextSub')};

  > svg {
    fill: ${cssVar('TextNeutral')};
    ${square(IconSize.Regular)}
  }
`;
