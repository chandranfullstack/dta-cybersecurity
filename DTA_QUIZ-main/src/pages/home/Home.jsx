import React from "react";
import AppButton from "src/components/AppButton/AppButton";
import AppLayout from "src/components/AppLayout/AppLayout";
import AppLink from "src/components/AppLink/AppLink";
import AppText from "src/components/AppText/AppText1";
import AppTitle1 from "src/components/AppTitle/AppTitle1";
import AppTitle3 from "src/components/AppTitle/AppTitle3";
import HomeImg from "../../assets/homeimg.png";
import AppTitleAndText from "src/components/AppTitleAndText/AppTitleAndText";
import AppDetail from "src/components/AppDetail/AppDetail";
import AppCard from "src/components/AppCard/AppCard";
import Portal1 from "../../assets/portal1.svg";
import Portal2 from "../../assets/portal2.svg";
import Portal3 from "../../assets/portal3.svg";
import AppFaqsList from "src/components/AppFaqList/AppFaqList";
import { faqsData } from "./data";
import { DASHBOARD_ROUTE, KNOWLEDGEHUB_ROUTE } from "src/utils/constant";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <div className="page_section_1">
        <div className="landing_hero_section row app_row_padded_columns_lg">
          <div className="col-lg-6 left_section" style={{ width: "55%" }}>
            <AppTitle3 text={t("home_section_1_title")} isBold />
            <AppTitle1 text={t("home_section_1_title_2")} color="primary" />
            <AppText
              text={t("home_section_1_content")}
              isMultiLine
              otherClassNames="font-family-regular"
            />
            <div className="mb-2 actions_section mt-2">
              <AppLink to={DASHBOARD_ROUTE}>
                <AppButton
                  text={t("home_section_1_button_1")}
                  otherClassNames="me-4_5"
                />
              </AppLink>
              <AppLink
                to={KNOWLEDGEHUB_ROUTE}
                otherClassNames="active_app_link app_home_link"
              >
                {t("home_section_1_button_2")}
              </AppLink>
            </div>
          </div>
          <div className="col-lg-6 right_section" style={{ width: "45%" }}>
            <img
              src={HomeImg}
              className="img-fluid app_image_icon_1"
              alt=""
              style={{ maxWidth: "80%" }}
            />
          </div>
        </div>
      </div>
      <div className="page_section_1">
        <div>
          <AppTitleAndText
            customStyles={{ display: "inline" }}
            wholeText={t("home_section_2_title_1")}
          />
          <AppDetail />
        </div>
      </div>
      <div className="page_section_1">
        <AppTitleAndText
          customStyles={{ display: "inline" }}
          wholeText={t("home_section_3_title_1")}
        />

        <div className="row app_home_cards">
          <div className="col">
            <AppCard customStyles={{ height: "250px" }}>
              <img src={Portal1} alt="portal1" className="mb-3" />
              <AppTitle3
                text={t("home_section_3_content_1")}
                isBold
                otherClassNames="mb-0"
              />
            </AppCard>
          </div>
          <div className="col">
            <AppCard customStyles={{ height: "250px" }}>
              <img src={Portal2} alt="portal2" className="mb-3" />
              <AppTitle3
                text={t("home_section_3_content_2")}
                isBold
                otherClassNames="mb-0"
              />
            </AppCard>
          </div>
          <div className="col">
            <AppCard customStyles={{ height: "250px" }}>
              <img src={Portal3} alt="portal3" className="mb-3" />
              <AppTitle3
                text={t("home_section_3_content_3")}
                isBold
                otherClassNames="mb-0"
              />
            </AppCard>
          </div>
        </div>
      </div>

      <div className="page_section_1">
        <AppTitleAndText isTitle={false} text={t("home_section_4_title_1")} />
        <AppText
          text={t("home_section_4_content_1")}
          isMultiLine
          otherClassNames="font-family-regular"
        />
        <AppFaqsList
          otherClassNames="no_app_row_padded_columns_fix_1"
          data={faqsData.map((faq) => ({
            key: faq.id,
            question: t(faq.identity),
            answer: t(faq.description),
            answer2: t(faq.description2),
            link: t(faq?.link),
            path: faq?.path,
          }))}
          accordionId="accordionFaq"
        />
      </div>

      {/* Scroll To Top Button */}
      {/* <AppButton
          color="light"
          icon={<MdOutlineKeyboardArrowUp />}
          otherClassNames={`app_scroll_top_button ${
            false ? "d-flex" : "d-none"
          }`}
          // onClick={handleScrollTop}
        /> */}
    </AppLayout>
  );
};

export default Home;
