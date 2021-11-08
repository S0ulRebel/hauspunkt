import React from "react";
import RoomImage from "./../../../assets/images/room.png";
import "./InstalationTypePreview.scss";

interface InstalationTypeProps {
  instalationType: string;
  isPrewallFullHeight?: Boolean;
  hasRoomDivider?: Boolean;
  hasPartitionWall?: Boolean;
  hasSchacht?: Boolean;
  clickHandler?: () => any | void;
}

const InstalationTypePreview = ({
  instalationType,
  isPrewallFullHeight = false,
  hasRoomDivider = false,
  hasPartitionWall = false,
  hasSchacht = false,
  clickHandler = () => {}
}: InstalationTypeProps) => {
  const getPrewallClassName = () => {
    let className = "prewall";
    if (isPrewallFullHeight) className += " full-height";
    if (hasRoomDivider) className += " room-divider";
    if (hasPartitionWall) className += " partition-wall";
    return className;
  };

  return (
    <div className="instalation-type-wrapper">
      <div className="instalation-type-preview" onClick={() => clickHandler()}>
        <img src={RoomImage} alt="instalation type preview" />
        <div className={getPrewallClassName()}></div>
        {hasSchacht && <div className="schacht"></div>}
      </div>
      <div className="instalation-type-title">{instalationType}</div>
    </div>
  );
};

export default InstalationTypePreview;
