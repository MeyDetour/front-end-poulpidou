import { useFormContext } from 'react-hook-form';

const InputRadio = ({ id, name, value, options }) => {
	const { register } = useFormContext();

	return (
		<label className="input-label">
			<input type="radio" id={id} {...register(name, options === null ? {} : options)} value={value}/>
			<div className="grid-center radio"></div>
		</label>
	);
}

export default InputRadio;