import React from "react";
import ChaveronDownIcon from "./../../../assets/icons/chaveron-down.svg";
import ChaveronUpIcon from "./../../../assets/icons/chaveron-up.svg";

interface DropdownToggleProps {
  active?: boolean;
  toggleHandler: () => void;
}

const DropdownToggle = ({
  active = false,
  toggleHandler,
}: DropdownToggleProps) => {
  return (
    <div className="dropdown-toggle" onClick={() => toggleHandler()}>
      {active ? (
        <img src={ChaveronUpIcon} alt="chaveron up icon" />
      ) : (
        <img src={ChaveronDownIcon} alt="chaveron down icon" />
      )}
    </div>
  );
};

export default DropdownToggle;
