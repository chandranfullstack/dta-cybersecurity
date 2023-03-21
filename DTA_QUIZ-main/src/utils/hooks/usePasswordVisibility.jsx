import { useState } from "react";

const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  return { showPassword, togglePasswordVisibility };
};

export default usePasswordVisibility;
