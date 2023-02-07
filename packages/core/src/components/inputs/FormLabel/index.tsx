import { useId, type ReactNode } from 'react';
import styles from './index.module.scss';

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
    <label htmlFor={htmlFor} className={styles.base}>
      <span id={tooltipId} className={styles['label-text']}>
        {label}
      </span>
      {children}
    </label>
  );
};
