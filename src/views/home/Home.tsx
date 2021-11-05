import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import LandingPagePhoto from "./../../assets/images/landing-page-image.png";
import "./Home.scss";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div id="home-page" className="content-wrapper">
      <div className="text-wrapper">
        <h1>{t("landingPage.title")}</h1>
        <p>{t("landingPage.text")}</p>
        <Button text={t("landingPage.button")} clickHandler={() => navigate("/config")} />
      </div>
      <div className="image-wrapper">
        <img src={LandingPagePhoto} alt="bathroom" />
      </div>
    </div>
  );
};

export default Home;
