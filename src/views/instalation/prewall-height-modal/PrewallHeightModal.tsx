import React from "react";
import { useTranslation } from "react-i18next";
import Overlay from "../../../components/ui/overlay/Overlay";
import "./PrewallHeightModal.scss";

interface PrewallHeightModalProps {
  isVisible: boolean;
  selectHandler: (val: number) => any | void;
}

const standardPrewallHeights = [86, 102, 116, 134];

const PrewallHeightModal = ({ isVisible, selectHandler }: PrewallHeightModalProps) => {
  const { t } = useTranslation();
  return (
    <Overlay isVisible={isVisible}>
      <div className="prewall-height-modal">
        <h2>{t("instalationPage.modal.title")}</h2>
        {standardPrewallHeights.map((height) => (
          <div className="height-option" onClick={() => selectHandler(height)}>{`${t(
            "instalationPage.modal.standardHeight"
          )} ${height} cm`}</div>
        ))}
        <div className="height-option" onClick={() => selectHandler(0)}>
          {t("instalationPage.modal.individualHeight")}
        </div>
      </div>
    </Overlay>
  );
};

export default PrewallHeightModal;
