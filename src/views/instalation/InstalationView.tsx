import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import InstalationTypePreview from "../../components/ui/instalation-type-preview/InstalationTypePreview";
import { ConfigContext } from "../../context/config-context";
import Room from "../../models/Room";
import { RoomWithSchacht } from "../../models/RoomWithSchacht";
import { instalationTypes } from "../../utils/constants";
import "./InstalationView.scss";
import PrewallHeightModal from "./prewall-height-modal/PrewallHeightModal";

const InstalationView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [configContext, setCofigContext] = useContext(ConfigContext);
  const [heightModalVisible, setHeightModalVisible] = useState(false);

  const openStandardHeightsModal = () => {
    setHeightModalVisible(true);
  };

  const closeStandardHeightsModal = () => {
    setHeightModalVisible(false);
  };

  const handleInstalationClick = (room: Room) => {
    setCofigContext({
      ...configContext,
      room,
    });

    if (room?.hasFixedPrewallHeight())
      navigate(`/elements?type=${room.instalationType}`);
    else {
      openStandardHeightsModal();
    }
  };
  const handleContactClick = () => alert("contact");

  const handlePrewallHeightSelection = (height: number) => {
    const value = height ? height : 116;
    const adjustableHeight = height === 0 ? true : false;
    if (configContext.room) {
      configContext.room.setPrewallHeight(value);
      if (height === 0) configContext.room.setPrewallHeightAdjustable(true);
    }
    closeStandardHeightsModal();
    navigate(
      `/elements?type=${configContext.room.instalationType}&height=${value}&adjustable=${adjustableHeight}`
    );
  };

  return (
    <div id="instalation" className="content-wrapper">
      <div className="text-wrapper">
        <section className="top">
          <h2>{t("instalationPage.title")}</h2>
          <p className="pre-line small">{t("instalationPage.text1")}</p>
        </section>
        <section className="bottom">
          <p className="small">{t("instalationPage.text2")}</p>
          <Button
            text={t("instalationPage.button")}
            clickHandler={() => handleContactClick()}
          />
        </section>
      </div>
      <div className="selection-wrapper">
        {instalationTypes.map((room) => (
          <InstalationTypePreview
            isPrewallFullHeight={room.isPrewallFullHeight}
            hasSchacht={room.hasSchacht}
            hasRoomDivider={room.hasRoomDivider}
            hasPartitionWall={room.hasPartitionWall}
            instalationType={t(
              `instalationPage.instalationTypes.${room.instalationType}`
            )}
            clickHandler={() => handleInstalationClick(room)}
          />
        ))}
      </div>
      <PrewallHeightModal
        isVisible={heightModalVisible}
        selectHandler={(height: number) => handlePrewallHeightSelection(height)}
      />
    </div>
  );
};

export default InstalationView;
