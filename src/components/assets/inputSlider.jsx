import { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import useOnScroll from '../../hooks/useOnScroll';

const InputSlider = ({ name, defaultValue, unit, min, max, step }) => {
  const { register, setValue } = useFormContext();

  const [sliderValue, setSliderValue] = useState(defaultValue);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const slider = useRef();

  useEffect(() => {
	setValue(name, defaultValue);
  }, [name, defaultValue, setValue]);

  const moveValueDisplay = () => {
	setIsHover(true);
	setOpacity(1);
	const rect = slider.current?.getBoundingClientRect();
	const offsetX = (sliderValue / 100) * slider.current.offsetWidth;

	setX(rect.left + offsetX - 10);
	setY(rect.top - 30);
  };

  useOnScroll(() => {
	if (!isHover) setOpacity(0);
  });

  return (
	<div 
		className="input-slider" 
		onMouseMove={moveValueDisplay}
		onClick={moveValueDisplay}
		onMouseEnter={() => { setOpacity(1); setIsHover(true); }}
		onMouseLeave={() => { setOpacity(0); setIsHover(false); }}
	>
		<div className="flex-row">
			<p style={{ marginTop: "-5px", paddingRight: "10px" }}>{min}{unit}</p>
				<input 
					type="range"
					min={min}
					max={max}
					step={step}
					defaultValue={defaultValue}
					{...register(name)}
					onChange={(e) => {
					setSliderValue(e.target.value);
					setValue(name, e.target.value);
					}}
					ref={slider}
				/>
				<p style={{ marginTop: "-5px", paddingLeft: "10px" }}>{max}{unit}</p>
			</div>
			<div className="input-slider__bubble-value" style={{
				top: y,
				left: x,
				opacity: opacity
			}}>
			<p>{sliderValue}</p>
		</div>
	</div>
  );
}

export default InputSlider;
