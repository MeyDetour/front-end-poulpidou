import React, { useState, useEffect, useRef } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from 'react-router-dom';

import { getInvoices } from '../../../requests/projects/getInvoices';

import InputCheckbox from '../../assets/inputCheckbox';

import { useToast } from '../../../hooks/useToast';

const Delete = () => {
	const { id } = useParams();

	const toast = useToast();


	useEffect(() => {
		getInvoices(id)
		.then(res => toast(res.state, ""))
		.catch(res => toast(res.state, res.value))
	}, []);



	return (
		<>	

		</>
	);
}

export default Delete;