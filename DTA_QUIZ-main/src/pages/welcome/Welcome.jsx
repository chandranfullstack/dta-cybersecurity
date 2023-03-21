import React from "react";
import AppButton from "src/components/AppButton/AppButton";
import AppCard from "src/components/AppCard/AppCard";
import AppLayout from "src/components/AppLayout/AppLayout";
import AppLink from "src/components/AppLink/AppLink";
import AppText1 from "src/components/AppText/AppText1";
import { welcomeData } from "./data";

const Welcome = () => {
  return (
    <AppLayout isMenu={false}>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "100vh" }}
      >
        <AppText1
          text="Welcome to the Cyber Security Awareness Portal"
          isBold
          color="primary"
          customstyles={{ fontSize: "28px", textAlign: "center" }}
        />
        <AppText1
          text="Here is how the application process works"
          otherClassNames="font-family-regular"
          customstyles={{
            fontSize: "20px",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        />

        <div className="row flex-nowrap">
          {welcomeData?.map((data, index) => {
            return (
              <div className="col" key={index}>
                <AppCard otherClassName={"welcomeCard"}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div className="count_card">
                      <AppText1
                        text={data?.id}
                        isBold
                        customstyles={{ fontSize: "22px", marginBottom: "0px" }}
                      />
                    </div>
                    <AppText1
                      text={data?.title}
                      isBold
                      customstyles={{ fontSize: "20px" }}
                    />
                  </div>
                  <div>
                    <AppLink to={data?.path}>
                      <AppButton
                        text="View"
                        customStyles={{ width: "150px" }}
                        type="submit"
                        otherClassNames="welcomeButton"
                      />
                    </AppLink>
                  </div>
                </AppCard>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Welcome;
