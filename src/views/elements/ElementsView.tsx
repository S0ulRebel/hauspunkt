import React from "react";
import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import DimensionsInputGroup from "../../components/ui/dimensions-input-group/DimensionsInputGroup";
import "./ElementsView.scss";
import { ConfigContext } from "../../context/config-context";
import BathroomElement, {
  BathroomElementType,
} from "../../models/BathroomElement";
import { elementsMinDistance, elementWidth } from "../../utils/constants";
import Expandable from "../../components/ui/expandable/Expandable";
import { SpecialInputOption } from "../../components/ui/special-input/SpecialInput";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import Viewport from "../../components/meshes/Viewport";
import SideSelectButton from "./side-select-button/SideSelectButton";
import AddElementButton from "./add-element-button/AddElementButton";
import ToiletImage from "./../../assets/images/toilet.png";
import SinkImage from "./../../assets/images/sink.png";
import BidetImage from "./../../assets/images/bidet.png";
import UrinalImage from "./../../assets/images/urinal.png";

const prewallHeightOptions: SpecialInputOption[] = [
  { label: "Standardhöhe 86 cm", value: 86 },
  { label: "Standardhöhe 102 cm", value: 102 },
  { label: "Standardhöhe 116 cm", value: 116 },
  { label: "Standardhöhe 134 cm", value: 134 },
];

const ElementsView = () => {
  const navigate = useNavigate();
  const [configContext, setConfigContext] = useContext(ConfigContext);
  const { room } = configContext;

  const {
    roomWidth,
    roomHeight,
    minRoomWidth,
    maxRoomWidth,
    minRoomHeight,
    maxRoomHeight,
    floorThickness,
    minFloorThickness,
    maxFloorThickness,
    prewallWidth,
    minPrewallWidth,
    maxPrewallWidth,
    minPrewallHeight,
    prewallHeight,
    prewallLeft,
    maxPrewallLeft,
    prewallRight,
    maxPrewallRight,
    isPrewallHeightAdjustable,
    isPrewallPositionAdjustable,
    hasSchacht,
    schachtSide,
    schachtWidth,
    minSchachtWidth,
    maxSchachtWidth,
  } = room;

  const updateRoomInContext = () => {
    setConfigContext({
      ...configContext,
      room,
    });
  };

  const roomlWidthHandler = (v: number) => {
    room.setRoomWidth(v);
    updateRoomInContext();
  };

  const roomlHeightHandler = (v: number) => {
    room.setRoomHeight(v);
    updateRoomInContext();
  };

  const roomlFloorThicknessHandler = (v: number) => {
    room.setFloorThickness(v);
    updateRoomInContext();
  };

  const schachtSideSelectionHandler = (v: "left" | "right") => {
    room.setSchachtSide(v);
    updateRoomInContext();
  };

  const schachtWidthHandler = (v: number) => {
    room.setSchachtWidth(v);
    updateRoomInContext();
  };

  const prewallWidthHandler = (v: number) => {
    room.setPrewallWidth(v);
    updateRoomInContext();
  };

  const prewallHeightHandler = (v: number) => {
    room.setPrewallHeight(v);
    updateRoomInContext();
  };

  const prewallLeftHandler = (v: number) => {
    room.setPrewallLeft(v);
    updateRoomInContext();
  };

  const prewallRightHandler = (v: number) => {
    room.setPrewallRight(v);
    updateRoomInContext();
  };

  const addBathroomElement = (type: BathroomElementType) => {
    room.addBathroomElement(type);
    setConfigContext({
      ...configContext,
      ...JSON.parse(JSON.stringify(room)),
    });
  };

  return (
    <div className="room-view">
      <div className="controls-wrapper">
        <Expandable title={"Raum bearbeiten"}>
          <DimensionsInputGroup
            label={"Room width:"}
            value={roomWidth}
            min={minRoomWidth}
            max={maxRoomWidth}
            handler={(v) => roomlWidthHandler(v)}
          />
          <DimensionsInputGroup
            label={"Room height:"}
            value={roomHeight}
            min={minRoomHeight}
            max={maxRoomHeight}
            handler={(v) => roomlHeightHandler(v)}
          />
          <DimensionsInputGroup
            label={"Floor thickness:"}
            value={floorThickness}
            min={minFloorThickness}
            max={maxFloorThickness}
            tooltipText={"Fußbodenaufbau bis Oberkante Fertigfußboden"}
            handler={(v) => roomlFloorThicknessHandler(v)}
          />
        </Expandable>
        {hasSchacht && (
          <Expandable title={"Schacht"}>
            <div className="schacht-side-wrapper">
              <SideSelectButton
                title="links"
                side="left"
                active={schachtSide === "left"}
                clickHandler={() => schachtSideSelectionHandler("left")}
              />
              <SideSelectButton
                title="rechts"
                side="right"
                active={schachtSide === "right"}
                clickHandler={() => schachtSideSelectionHandler("right")}
              />
            </div>
            <DimensionsInputGroup
              label={"Schacht width:"}
              value={schachtWidth}
              min={minSchachtWidth}
              max={maxSchachtWidth}
              handler={(v) => schachtWidthHandler(v)}
            />
          </Expandable>
        )}

        <Expandable title={"Vorwand bearbeiten"}>
          {isPrewallHeightAdjustable && (
            <DimensionsInputGroup
              label={"Prewall height:"}
              value={prewallHeight}
              min={minPrewallHeight}
              max={roomHeight}
              options={prewallHeightOptions}
              handler={(v) => prewallHeightHandler(v)}
            />
          )}
          <DimensionsInputGroup
            label={"Prewall width:"}
            value={prewallWidth}
            min={minPrewallWidth}
            max={maxPrewallWidth}
            handler={(v) => prewallWidthHandler(v)}
          />
          {isPrewallPositionAdjustable && (
            <>
              <DimensionsInputGroup
                label={"Prewall left:"}
                value={prewallLeft}
                min={0}
                max={maxPrewallLeft}
                handler={(v) => prewallLeftHandler(v)}
              />
              <DimensionsInputGroup
                label={"Prewall right:"}
                value={prewallRight}
                min={0}
                max={maxPrewallRight}
                handler={(v) => prewallRightHandler(v)}
              />
            </>
          )}
        </Expandable>

        <Expandable title={"Elemente"}>
          <div className="add-element-wrapper">
            <AddElementButton
              img={ToiletImage}
              label="Toilette"
              clickHandler={() => addBathroomElement("toilet")}
            />
            <AddElementButton
              img={SinkImage}
              label="Waschbecken"
              clickHandler={() => addBathroomElement("sink")}
            />
            <AddElementButton
              img={UrinalImage}
              label="Pissoir"
              clickHandler={() => addBathroomElement("urinal")}
            />
            <AddElementButton
              img={BidetImage}
              label="Bidet"
              clickHandler={() => addBathroomElement("bidet")}
            />
          </div>
        </Expandable>

        <Button text={"Bestätigen"} clickHandler={() => navigate("/result")} />
      </div>

      <div className="viewport-wrapper">
        <Canvas shadows style={{ background: "white" }}>
          <ConfigContext.Provider value={[configContext, setConfigContext]}>
            <Viewport />
          </ConfigContext.Provider>
        </Canvas>
      </div>
    </div>
  );
};

export default ElementsView;
