import AppButton from "../AppButton/AppButton";
import AppText1 from "../AppText/AppText1";
import AppTitle3 from "../AppTitle/AppTitle3";

export default function AppInformationModal({
  title,
  modalId = "modal-id",
  description,
  buttonHide = false,
  button = "",
}) {
  return (
    <div
      className="modal information_modal_1 fade"
      id={modalId}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center py-4">
            <AppTitle3
              text={title || "Why we ask this?"}
              otherClassNames="mt-2"
              color="primary"
            />
            <AppText1
              text={description}
              otherClassNames="mb-0 font-family-regular"
            />
          </div>
          {buttonHide ? null : (
            <div className="modal-footer py-0 px-3">
              {button || (
                <AppButton
                  type="submit"
                  data-bs-dismiss="modal"
                  text="Ok, got it"
                  isTextOnly
                  textColor="primary"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
