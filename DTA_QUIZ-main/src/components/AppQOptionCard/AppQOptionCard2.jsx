import React from "react";
import AppButton from "../AppButton/AppButton";
import AppInformationModal from "../AppInformationModel/AppInformationModel";
import AppTitle3 from "../AppTitle/AppTitle3";
import AppToolTip from "../AppToolTip/AppToolTip";
import { MdOutlineInfo } from "react-icons/md";

const AppQOptionCard2 = (props) => {
  const {
    id,
    title,
    icon,
    info = null,
    infoTitle = null,
    isDisabled = false,
    isSelected = false,
    onClick = () => {},
  } = props;

  const INFORMATION_MODAL_ID = `info-modal-${id}`;

  const disabledToolTipUserNotification = {
    heading: "Why you can’t select this option",
    description: `
                Based on your previous choices and our dataset, this guide has identified
                options that are available. Feel free to go back and select different options.
            `,
  };

  let otherClassName = "";

  if (title === "Safe") {
    otherClassName = "app_card_body_safe";
  } else if (title === "UnSafe") {
    otherClassName = "app_card_body_unSafe";
  } else if (title === "Not Sure") {
    otherClassName = "app_card_body_not_sure";
  }

  return (
    <AppToolTip content={disabledToolTipUserNotification} show={isDisabled}>
      <div
        className={`
                        app_wizard_option_card card
                        ${isSelected ? "selected" : ""}
                        ${isDisabled ? "disabled" : "not_disabled"}
                    `}
        onClick={onClick}
        aria-hidden="true"
      >
        <div className={`card-body ${otherClassName}`}>
          <div className="d-flex">
            <span className="options_card_radio">
              <input type="radio" checked={isSelected} />
              <span className="app_radio_control" />
            </span>

            <div className="mx-3">
              <div className="d-flex justify-content-between ">
                <AppTitle3 text={title} otherClassNames="mb-0" />
                {icon && (
                  <img src={icon} className="options_question_icon" alt="" />
                )}
              </div>
            </div>
          </div>

          {info ? (
            <div className="options_info_icon">
              <AppButton
                color="transparent"
                otherClassNames="p-3"
                data-bs-toggle="modal"
                data-bs-target={`#${INFORMATION_MODAL_ID}`}
                type="button"
                icon={
                  <MdOutlineInfo style={{ width: "22px", height: "22px" }} />
                }
              />
              <AppInformationModal
                title={infoTitle}
                description={info}
                modalId={INFORMATION_MODAL_ID}
              />
            </div>
          ) : null}
        </div>
      </div>
    </AppToolTip>
  );
};

export default AppQOptionCard2;
