import React from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

/* Функция высшего порядка для реализации скрытия и показывания текущего пароля в инпуте, что бы не повторять, SOLID кароч, best practics все дела */
const PasswordEye = ({ element: Component, ...props }) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false); // Изначально пароль скрыт

  // Изменяем состояние видимости пароля
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); 
  };

  // передаём картинку глазика
  const imageEye = passwordVisible ? (
    <FaEyeSlash size={18} color="white" />
  ) : (
    <FaEye size={18} color="white" />
  );

  return (
    <Component
      {...props}
      togglePasswordVisibility={togglePasswordVisibility}
      passwordVisible={passwordVisible}
      imageEye={imageEye}
    />
  );
};

export default PasswordEye;
