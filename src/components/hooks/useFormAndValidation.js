import {useState, useCallback} from 'react';

//кастомный хук валидации и отображения ошибок(спасибо ревьюеру за годноту)
export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);

  //перебирает инпуты и записывает значения, ошибок и валидна ли форма
  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
    
    
    /* Удаляет ошибку если пользователь вводит другой пароль */
    if (name === "password" && errors.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "",
      });
    }
  };

  // сброс формы
  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, setErrors};
}

