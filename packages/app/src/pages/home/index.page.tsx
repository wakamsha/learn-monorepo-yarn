import { FormLabel } from '@learn-storybook2/core/components/inputs/FormLabel';
import { LabeledSlider } from '@learn-storybook2/core/components/inputs/LabeledSlider';
import { useDebouncedState } from '@learn-storybook2/core/hooks/useDebouncedState';
import { useMemo, useState } from 'react';

const Home = () => {
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(170);
  const calcBMI = useMemo(() => {
    const heightMeters = height * 0.01;
    return Math.round(weight / (heightMeters * heightMeters));
  }, [weight, height]);

  const [delay, setDelay] = useState(1000);
  const [value, debouncedValue, setValue] = useDebouncedState('', delay);

  return (
    <div>
      <h1>hello next.js</h1>

      <hr />

      <FormLabel label="メールアドレス">
        <input type="email" placeholder="taro.ringo@example.com" />
      </FormLabel>

      <hr />

      <div>
        <LabeledSlider label="Weight" unit="kg" min={40} max={150} value={weight} onValueChange={setWeight} />
        <LabeledSlider label="Height" unit="cm" min={140} max={220} value={height} onValueChange={setHeight} />
        <p>BMI: {calcBMI}</p>
      </div>

      <hr />

      <div>
        <label>
          Value:
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Delay:
          <input type="number" value={delay} onChange={(e) => setDelay(Number(e.target.value))} />
        </label>
      </div>
      <code>
        <pre>{JSON.stringify(debouncedValue, null, 2)}</pre>
      </code>
    </div>
  );
};
export default Home;
