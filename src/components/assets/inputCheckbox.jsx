import { useFormContext } from 'react-hook-form';

const InputCheckbox = ({ id, name, value, options }) => {
	const { register } = useFormContext();
	 
	return (
		<label className="input-label">
			<input type="checkbox" id={id} {...register(name, options === null ? {} : options)} value={value}/>
			<div className="grid-center checkbox"></div>
		</label>
	);
}

export default InputCheckbox;