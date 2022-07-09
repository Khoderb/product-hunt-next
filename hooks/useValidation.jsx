import { useState, useEffect } from 'react';


const useValidation = ( initialState, validate, fn ) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errors).length === 0;
        if(noErrors){
            fn() 
            }
        setSubmitForm(false);
            }
    }, [errors])

    //Function to validate permanently
    const handleChange = e =>{
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    //when user make submit
    const handleSubmit = e =>{
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitForm(true);
    }

    const handleOnBlur = () =>{
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }


  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleOnBlur
  }


}

export default useValidation
