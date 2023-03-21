import React, { useEffect } from "react";
import AppInput from "src/components/AppInput/AppInput";
import AppButton from "src/components/AppButton/AppButton";
import usePasswordVisibility from "src/utils/hooks/usePasswordVisibility";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, WELCOME_ROUTE } from "src/utils/constant";
import AppLayout from "src/components/AppLayout/AppLayout";
import AppText1 from "src/components/AppText/AppText1";
import { useMutation } from "react-query";
import { APP_LOGIN } from "src/api/urls";
import { makePostRequest } from "../../utils/makePostRequest";
import { getTokenFromStorage, setTokenInStorage } from "src/utils/tokenHandler";
import useAppStore from "src/store";
import AppErrorText from "src/components/AppErrorText/AppErrorText";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

const SiginIn = () => {
  const [formValues, setFormValues] = React.useState({
    username: "",
    password: "",
  });
  const { setUserNameAndToken } = useAppStore((state) => state);

  const navigate = useNavigate();

  const {
    mutate,
    data: signInData,
    isLoading,
    error,
  } = useMutation(
    APP_LOGIN,
    (formBody) => makePostRequest(APP_LOGIN, formBody),
    {
      onSuccess: (res) => {
        console.log("entered")
        console.log(signInData?.data?.Accesstoken)
        console.log(signInData?.data?.token)
        console.log(signInData)
         setUserNameAndToken({
           user_token: signInData?.data?.token,
           is_authenticated: true,
         });
        setTokenInStorage(res?.data?.token);
        navigate(WELCOME_ROUTE);
      },
    }
  );

  // // Check if user is already authenticated
  // React.useEffect(() => {
  //   isUserAuthenticated().then((resData) => {
  //     const token = getUserToken();
  //     setUserNameAndToken({
  //       token,
  //     });
  //     navigate("/dashboard");
  //   });
  // }, []);

  useEffect(() => {
    if (getTokenFromStorage()) return navigate(HOME_ROUTE);
  }, []);

  // Form Handlers
  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formValues);
  };

  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  return (
    <AppLayout
      isFooter={false}
      background="#ffffff"
      isMenu={false}
      isTranslucentLoader={isLoading}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="signin-form">
            <h2
              className="text-center"
              style={{
                color: "#136378",
                fontSize: "24px",
                fontWeight: 700,
                marginBottom: "38px",
              }}
            >
              Get started with an interactive cyber assessment guide
            </h2>
            <AppText1
              text={"Login with your credentials"}
              otherClassNames="mt-2 font-family-regular text-center"
              color="primary"
              isBold={false}
            />

            <div className="d-flex flex-column justify-content-center align-items-center">
              <AppErrorText text={error?.response?.data?.message} />

              <AppInput
                type="text"
                name="username"
                isRequired={true}
                className="login-input-field font-family-regular"
                IconSrc={FaUserAlt}
                placeholder={"User ID"}
                customStyles={{
                  marginBottom: "26px",
                  width: "100%",
                  maxWidth: "392px",
                }}
                value={formValues.User_email}
                onChange={handleInputChange}
              />
              <AppInput
                type={showPassword ? "text" : "password"}
                name="password"
                isRequired={true}
                className="login-input-field font-family-regular"
                IconSrc={showPassword ? BsFillEyeSlashFill : BsFillEyeFill}
                iconClickAction={togglePasswordVisibility}
                placeholder={"Password"}
                customStyles={{
                  marginBottom: "36px",
                  width: "100%",
                  maxWidth: "392px",
                }}
                onChange={handleInputChange}
                value={formValues.User_password}
              />
              <AppButton
                text={"Sign In"}
                customStyles={{ width: "125px", marginBottom: "1rem" }}
                type="submit"
                color="primary"
                textColor="white"
              />
              <div>
                <span
                  className="me-1 font-family-regular"
                  style={{ fontSize: "13px" }}
                >
                  Forgot Password ?
                </span>
                <a
                  style={{
                    color: "#1F8098",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                  href="#"
                >
                  Contact Admin
                </a>
              </div>
            </div>
            <div className="reg-gray-text">
              © 2023 All Rights Reserved. Daimler Trucks
            </div>
          </div>
        </div>
      </form>
    </AppLayout>
  );
};

export default SiginIn;
