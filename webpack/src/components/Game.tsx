import { useState } from 'react';
import {unstable_batchedUpdates} from 'react-dom';

import '@components/index.css'

export const Game = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState("");
	const [disabled, setDisabled] = useState(false);

  const handleChange = (i: number) => {
		unstable_batchedUpdates(() => {
			setDisabled(true);
			setSelected(i);
			setResult(Math.floor(Math.random() * 3) === i ? "Вы выиграли!" : "Не повезло");
		});
		setTimeout(() => {
				unstable_batchedUpdates(() => {
					setSelected(null);
					setResult("");
					setDisabled(false);
				});
		}, 500);
  };

  return (
    <>
			<h2>Topor game</h2>
			<div className="inputs">
				{[0, 1, 2].map((_, i) => (
					<input
						key={i}
						type="radio"
						checked={selected === i}
						onChange={() => handleChange(i)}
						disabled={disabled}
					/>
				))}
			</div>
      {result && <p className="result-text">{result}</p>}
    </>
  );
}
