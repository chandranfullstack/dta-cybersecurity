import AppLink from "../AppLink/AppLink";
import AppText from "../AppText/AppText1";
import {
  CONCRETE_CASES_LIST_ROUTE,
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  KNOWLEDGEHUB_ROUTE,
  PASSWORD_GENERATOR_ROUTE,
  PASSWORD_SECURITY_CHECKER_ROUTE,
  SIGNIN_ROUTE,
  REPORTS_ROUTE
} from "src/utils/constant";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
} from "src/utils/tokenHandler";

import AppSwitch from "../AppSwitch/AppSwitch";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const AppHeader = ({ isMenu }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { t } = useTranslation();
  const logoutHandler = () => {
    removeTokenFromStorage();
  };

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng");

    if (lang === "ja") {
      setIsSwitchOn(true);
    }
  }, []);

  return (
    <nav className="app-header navbar navbar-expand-lg navbar-light">
      <div className="container-fluid nav-container">
        <AppLink to={HOME_ROUTE} otherClassNames="navbar-brand nav-logo">
          <img
            src={
              "https://asia.daimlertruck.com/assets/images/daimler-logo-new.jpg"
            }
            alt=""
            className="app_image_icon_1"
            style={{ width: "200px" }}
          />
        </AppLink>
        {isMenu && (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
        {isMenu && (
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item assessmentLink">
                <AppLink
                  to={DASHBOARD_ROUTE}
                  otherClassNames={"nav-link active"}
                >
                  <AppText
                    text={t("nav_Assessment")}
                    isBold
                    otherClassNames="font-18"
                    customstyles={{ marginBottom: "0rem" }}
                  />
                </AppLink>
              </li>

              <li className="nav-item dropdown">
                <AppLink
                  otherClassNames="nav-link"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <AppText
                    text={t("nav_Knowledge_Base")}
                    isBold
                    otherClassNames="font-18"
                    customstyles={{ marginBottom: "0rem" }}
                  />
                </AppLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <AppLink
                      otherClassNames="dropdown-item"
                      to={KNOWLEDGEHUB_ROUTE}
                    >
                      {t("nav_Information_Security")}
                    </AppLink>
                  </li>
                  <li>
                    <AppLink
                      otherClassNames="dropdown-item"
                      to={CONCRETE_CASES_LIST_ROUTE}
                    >
                      {t("nav_Concrete_Cases")}
                    </AppLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <AppLink
                  otherClassNames="nav-link"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <AppText
                    text={t("nav_Tools")}
                    isBold
                    otherClassNames="font-18"
                    customstyles={{ marginBottom: "0rem" }}
                  />
                </AppLink>
                <ul
                  className="dropdown-menu translate-div"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <AppLink
                      otherClassNames="dropdown-item"
                      to={PASSWORD_GENERATOR_ROUTE}
                    >
                      {t("nav_Strong_Password_Generator")}
                    </AppLink>
                  </li>
                  <li>
                    <AppLink
                      otherClassNames="dropdown-item"
                      to={PASSWORD_SECURITY_CHECKER_ROUTE}
                    >
                      {t("nav_Check_Your_Password_Strength")}
                    </AppLink>
                  </li>
                </ul>
                </li>
                <li className="nav-item assessmentLink">
                <AppLink
                  to={REPORTS_ROUTE}
                  otherClassNames={"nav-link active"}
                >
                  <AppText
                    text={t("nav_report")}
                    isBold
                    otherClassNames="font-18"
                    customstyles={{ marginBottom: "0rem" }}
                  />
                </AppLink>
              </li>
              

              <li className="nav-item">
                {getTokenFromStorage() ? (
                  <AppLink
                    to={SIGNIN_ROUTE}
                    otherClassNames={"nav-link active"}
                    onClick={logoutHandler}
                  >
                    <AppText
                      text={t("nav_Logout")}
                      isBold
                      otherClassNames="font-18"
                      customstyles={{ marginBottom: "0rem" }}
                    />
                  </AppLink>
                ) : (
                  <AppLink
                    to={SIGNIN_ROUTE}
                    otherClassNames={"nav-link active"}
                  >
                    <AppText
                      text={t("nav_Sign_In")}
                      isBold
                      otherClassNames="font-18"
                      customstyles={{ marginBottom: "0rem" }}
                    />
                  </AppLink>
                )}
              </li>

              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                }}
              >


                <AppText
                  text="Eng"
                  customstyles={{
                    marginBottom: "0rem",
                    fontSize: "15px",
                    marginRight: "10px",
                  }}
                />
                <AppSwitch
                  isSwitchOn={isSwitchOn}
                  onChange={(e) => {
                    console.log("check event", e.target.checked);
                    setIsSwitchOn(e.target.checked);
                    if (e.target.checked) {
                      i18next?.changeLanguage("ja");
                    } else {
                      i18next?.changeLanguage("en");
                    }
                  }}
                />
                <AppText
                  text="日本語"
                  customstyles={{ marginBottom: "0rem", fontSize: "15px" }}
                />
              </li> 
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppHeader;
