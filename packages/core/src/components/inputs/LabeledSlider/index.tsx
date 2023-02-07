import { type ChangeEvent } from 'react';
// import styles from './index.module.scss';

type Props = {
  label: string;
  unit: string;
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
};

export const LabeledSlider = ({ label, unit, min, max, value, onValueChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(Number(e.target.value));
  };

  return (
    <div>
      <label
      //  className={styles.base}
      >
        {label} : <strong>{value}</strong>
        {unit}
      </label>
      <input
        type="range"
        // className={styles.input}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
