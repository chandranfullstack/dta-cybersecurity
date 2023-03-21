import React from "react";
import AppButton from "src/components/AppButton/AppButton";
import AppInput from "src/components/AppInput/AppInput";
import AppLayout from "src/components/AppLayout/AppLayout";
import generatePass from "../../assets/generate-pass.png";
import copyIcon from "../../assets/copy-icon.png";
import { generatePassword } from "src/utils/constant";
import { useTranslation } from "react-i18next";

const PasswordGenerator = () => {
  const [checkboxVal, setCheckboxVal] = React.useState({
    alphanumeric: false,
    uppercase: false,
    lowercase: false,
    symbol: false,
  });
  const { t } = useTranslation();
  const [rangeVal, setRangeVal] = React.useState(8);
  const [passwordToDisplay, setPasswordToDisplay] = React.useState("");
  const [textCopied, setTextCopied] = React.useState(t("password_content_5"));
  const [rotation, setRotation] = React.useState(0);

  const generateRandomPassword = () => {
    setPasswordToDisplay(generatePassword(true, true, true, true, 8));
  };

  React.useEffect(() => {
    generateRandomPassword();
  }, []);

  const handleCheckboxChange = (e) => {
    setCheckboxVal({ ...checkboxVal, [e.target.name]: e.target.checked });
  };

  const generatePasswordHandler = () => {
    setRotation(rotation + 180);
    setPasswordToDisplay(
      generatePassword(
        checkboxVal.lowercase,
        checkboxVal.uppercase,
        checkboxVal.alphanumeric,
        checkboxVal.symbol,
        rangeVal
      )
    );
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(passwordToDisplay);
    setTextCopied("Copied!!");
    setTimeout(() => {
      setTextCopied("Copy Password");
    }, 2000);
  };

  const checkboxArr = [
    {
      fieldName: "alphanumeric",
      label: "password_content_2",
    },
    {
      fieldName: "upper case",
      label: "password_content_3",
    },
    {
      fieldName: "lower case",
      label: "password_content_4",
    },
    {
      fieldName: "symbol",
      label: "password_content_6",
    },
  ];

  return (
    <AppLayout>
      <div style={{ padding: "1.5rem 0rem" }}>
        <h2 className="app-blue-title">{t("password_heading")}</h2>
        <p
          className="txt-gray-20 font-family-regular"
          style={{ maxWidth: "711px", marginBottom: "1.5rem" }}
        >
          {t("password_heading_2")}
        </p>
        <div className="d-flex justify-content-center ">
          <div className="password-generator-blk">
            <div className="password-display d-flex bg-white py-2 br-12 mb-4 w-100 justify-content-between">
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#444444",
                }}
              >
                {passwordToDisplay}
              </span>
              <span>
                <img
                  className="loadbtn"
                  src={generatePass}
                  onClick={() => generatePasswordHandler()}
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              </span>
            </div>
            <div className="password-customize-blk bg-white br-12">
              <h2 className="font-family-regular">{t("password_content")}</h2>
              <div
                className="d-flex w-100 justify-content-between flex-wrap"
                style={{ fontSize: "20px", fontWeight: 400, gap: "30px" }}
              >
                <div className="password-range">
                  <p className="m-0 mb-2 font-family-regular">
                    {t("password_content_1")}
                  </p>
                  <div>
                    <span
                      className="me-2 p-1 text-center"
                      style={{
                        fontSize: "18px",
                        borderRadius: "8px",
                        border: " 0.25px solid rgba(68, 68, 68, 0.2)",
                        width: "62px",
                        display: "inline-block",
                      }}
                    >
                      <AppInput
                        type="number"
                        value={rangeVal}
                        onChange={(e) => setRangeVal(e.target.value)}
                        inputStyles={{
                          height: "100%",
                          width: "100%",
                          border: "none",
                        }}
                      />
                      {/* 12 */}
                    </span>
                    <span>
                      <AppInput
                        min="8"
                        max="24"
                        type="range"
                        className={"app-blue-range"}
                        value={rangeVal}
                        onChange={(e) => setRangeVal(e.target.value)}
                      />
                    </span>
                  </div>
                </div>
                <div className="password-checkbox">
                  {checkboxArr?.map((data) => (
                    <div
                      className="d-flex justify-content-start align-items-center"
                      key={data.label}
                    >
                      <AppInput
                        type="checkbox"
                        name={data?.fieldName?.split(" ").join("")}
                        value={data?.fieldName}
                        id={data?.fieldName?.split(" ").join("")}
                        onChange={(e) => handleCheckboxChange(e)}
                        className={"app-blue-checkbox"}
                        //   checked={checkboxVal.aphanumeric}
                      />
                      <label
                        className="ms-3 text-capitalize font-family-regular"
                        htmlFor={data?.fieldName?.split(" ").join("")}
                      >
                        {t(data?.label)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="text-center text-600 mb-2"
                style={{ fontSize: "18px", marginTop: "40px" }}
              >
                Generate passwords are never stored. Even if they were, we have
                no idea who you are!
              </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <AppButton
                text={textCopied}
                otherClassNames={"copy-btn"}
                icon={
                  textCopied === "Copy Password" && (
                    <img src={copyIcon} className="me-2" />
                  )
                }
                iconOrientation="left"
                onClick={() => handleCopy()}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PasswordGenerator;
