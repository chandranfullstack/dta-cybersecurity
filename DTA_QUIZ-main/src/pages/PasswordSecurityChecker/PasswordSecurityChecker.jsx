import React from "react";
import { useTranslation } from "react-i18next";
import AppInput from "src/components/AppInput/AppInput";
import AppLayout from "src/components/AppLayout/AppLayout";
import { quotes, reviewData } from "src/utils/constant";
import usePasswordVisibility from "src/utils/hooks/usePasswordVisibility";
import zxcvbn from "zxcvbn";

const PasswordSecurityChecker = () => {
  const [passProps, setPassProps] = React.useState({
    uppercase: false,
    lowercase: false,
    digits: false,
    special: false,
  });
  const [timeToCrack, setTimeToCrack] = React.useState("");
  const [passStatus, setPassStatus] = React.useState("No Password");
  const [review, setReview] = React.useState("");
  const [typedPassword, setTypedPassword] = React.useState("");
  const [tip, setTip] = React.useState("");

  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  const inputColor = React.useRef(null);

  function getCharacterSetOf(password) {
    let passProps2 = {
      uppercase: false,
      lowercase: false,
      digits: false,
      special: false,
    };
    if (password.search(/[a-z]/) != -1) {
      passProps2.lowercase = true;
    } else {
      passProps2.lowercase = false;
    }
    if (password.search(/[A-Z]/) != -1) {
      passProps2.uppercase = true;
    } else {
      passProps2.uppercase = false;
    }
    if (password.search(/[0-9]/) != -1) {
      passProps2.digits = true;
    } else {
      passProps2.digits = false;
    }
    if (password.search(/[!"#£$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/) != -1) {
      passProps2.special = true;
    } else {
      passProps2.special = false;
    }
    setPassProps(passProps2);
  }

  function displayStrength(c) {
    var f = "Very Weak";
    var e = "e40808";
    if (c == 0) {
      f = "Very Weak";
    }
    if (c == 1) {
      f = "Weak";
      e = "e40808";
    }
    if (c == 2) {
      f = "Medium";
      e = "ffd800";
    }
    if (c == 3) {
      f = "Strong";
      e = "2cb117 ";
    }
    if (c == 4) {
      f = "Very Strong";
      e = "2cb117";
    }
    if (c == 5) {
      f = "No Password";
      e = "D0D0D0";
    }
    setPassStatus(f);
    inputColor.current.style.background = "#" + e;
  }
  function checkThisPassword(password) {
    let checked = zxcvbn(password);
    const timeToCrack =
      checked?.crack_times_display?.online_no_throttling_10_per_second;
    setTimeToCrack(timeToCrack);
    if (password === "") {
      displayStrength(5);
      setReview(reviewData[5]);
    } else {
      displayStrength(checked.score);
      setReview(reviewData[checked.score]);
    }

    getCharacterSetOf(password);
  }

  const getRandomTip = () => {
    const randomNum = Math.floor(Math.random() * (1 + quotes.length - 0)) + 0;
    setTip(quotes[randomNum]);
  };

  const handleInputChange = (e) => {
    setTypedPassword(e.target.value);
    checkThisPassword(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  React.useEffect(() => {
    getRandomTip();
    inputColor.current.style.background = "#D0D0D0";
  }, []);

  const { t } = useTranslation();

  return (
    <AppLayout>
      <div style={{ padding: "1.5rem 0rem" }}>
        <h2 className="app-blue-title mob-text-center">
          {t("check_password_heading")}
        </h2>
        <p
          className="txt-gray-20 mob-text-center font-family-regular"
          style={{ maxWidth: "711px", marginBottom: "1.5rem" }}
        >
          {t("check_password_heading_1")}
        </p>
        <div className="d-flex justify-content-center ">
          <div className="password-checker-blk br-12">
            <h2 className="font-family-regular">
              {" "}
              {t("check_password_content")}
            </h2>
            <div className="my-2 d-flex flex-wrap mt-3 justify-content-between align-items-center mb-3">
              <div className="">
                <span style={{ fontSize: "20px", fontWeight: "700" }}>
                  {t("check_password_content_1")}
                </span>
                <span
                  className="ms-2 font-family-regular"
                  style={{ fontSize: "20px" }}
                >
                  {tip}
                </span>
              </div>

              {/* <span
                className="d-flex mt-2 mob-mt-3"
                style={{ float: "right", fontSize: "16px" }}
              >
                <label
                  htmlFor="showhide"
                  className="text-600 font-family-regular"
                >
                  Show password:
                </label>
                <AppInput
                  type="checkbox"
                  id="showhide"
                  className="ms-1 app-blue-checkbox"
                  customStyles={{ top: "2px" }}
                  onChange={() => togglePasswordVisibility()}
                />
              </span> */}
            </div>
            <div ref={inputColor} className="password-checker-input">
              <AppInput
                customStyles={{ width: "100%", maxWidth: "auto" }}
                type={showPassword ? "text" : "password"}
                placeholder="Type a password"
                value={typedPassword}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={handleKeyDown}
              />
              <span className="password-indicator">{passStatus}</span>
            </div>
            <div
              className="d-flex lg-px-4 mt-3 flex-wrap justify-content-center"
              style={{ gap: "10px" }}
            >
              <div className="lg-me-5 " style={{ fontSize: "20px" }}>
                {typedPassword?.length} characters containing:
              </div>
              <div
                className="d-flex flex-wrap align-items-center font-family-regular"
                style={{ gap: "20px", fontSize: "15px" }}
              >
                <span
                  style={{ color: passProps.lowercase ? "#2CB117" : "#444444" }}
                >
                  Lower case
                </span>
                <span
                  style={{ color: passProps.uppercase ? "#2CB117" : "#444444" }}
                >
                  Upper case
                </span>
                <span
                  style={{ color: passProps.digits ? "#2CB117" : "#444444" }}
                >
                  Numbers
                </span>
                <span
                  style={{ color: passProps.special ? "#2CB117" : "#444444" }}
                >
                  Symbols
                </span>
              </div>
            </div>
            <div
              className="text-center font-family-regular"
              style={{ marginTop: "25px", fontSize: "18px" }}
            >
              {t("check_password_content_2")}
              <span>
                <h2 style={{ fontSize: "30px" }} className="font-family-bold">
                  {timeToCrack}
                </h2>
              </span>
            </div>
            {review !== "" && (
              <div className="text-center mt-5" style={{ fontSize: "18px" }}>
                <span className="font-family-bold">Review: </span>
                <span className="font-family-regular">{review}</span>
              </div>
            )}
            <div
              className="text-center text-600 mb-2"
              style={{ fontSize: "18px", marginTop: "40px" }}
            >
              Generate passwords are never stored. Even if they were, we have no
              idea who you are!
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PasswordSecurityChecker;
