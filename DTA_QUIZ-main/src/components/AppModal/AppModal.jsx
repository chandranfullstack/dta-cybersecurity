import Modal from "react-bootstrap/Modal";
import AppButton from "../AppButton/AppButton";
import AppText1 from "../AppText/AppText1";
import AppTitle3 from "../AppTitle/AppTitle3";

function AppModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center" style={{ padding: "24px 16px" }}>
        {props.isRight ? (
          <>
            <AppTitle3
              text={props.title_1}
              otherClassNames="mt-2 mb-0"
              color={props?.title_1 === "Wrong Answer" ? "wrong" : "primary"}
              customStyles={{
                fontSize: "24px",
              }}
            />
            <div className="text-start" style={{ marginTop: "24px" }}>
              <div className="d-flex ">
                <AppText1
                  text="Correct Answer : "
                  otherClassNames="mb-0 font-16"
                  customstyles={{ marginRight: "5px" }}
                />

                <AppText1
                  text={props.option}
                  otherClassNames="mb-0 font-16 font-family-regular"
                  customstyles={{ marginRight: "5px" }}
                />
              </div>
              <AppText1
                text={props.description}
                otherClassNames="mb-0 font-14 font-family-regular"
                customstyles={{ marginRight: "5px" }}
              />
            </div>
          </>
        ) : (
          <>
            <AppTitle3
              text={props.title_1}
              otherClassNames="mt-2 mb-0"
              color="primary"
              customStyles={{ fontSize: "24px" }}
            />
            <AppTitle3
              text={props.title_2}
              otherClassNames="mt-2 font-family-regular"
              color="primary"
              isBold={false}
              customStyles={{ fontSize: "24px" }}
            />

            <ul className="text-start">
              {props.description?.map((data, index) => {
                return (
                  <li key={index} className="app_instruction_list">
                    <AppText1
                      text={data}
                      otherClassNames="mb-0 font-family-regular"
                    />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ padding: "0px 16px" }}>
        <AppButton
          type="submit"
          data-bs-dismiss="modal"
          text={props.btnText}
          isTextOnly
          textColor="primary"
          onClick={props.onHide}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default AppModal;
