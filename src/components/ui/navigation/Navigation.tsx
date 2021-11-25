import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./Navigation.scss";
import LogoImage from "./../../../assets/images/hauspunkt-logo.svg";
import ChaveronIcon from "./../../../assets/icons/chaveron-right.svg";

const Navigation = () => {
  const getNavElements = (endIndex: number) => {
    const links = [
      <NavLink to="/">Konfigurator</NavLink>,
      <NavLink to="/config">Einbausituation</NavLink>,
      <NavLink to="/elements">Elemente</NavLink>,
      <NavLink to="/result">Ergebnis</NavLink>,
    ];
    const elements = links.slice(0, endIndex).map((e, index) => {
      if (index < endIndex - 1)
        return (
          <>
            {e}
            <span key={index}>
                <img src={ChaveronIcon} alt="chaveron icon" />
            </span>
          </>
        );
      return e;
    });
    return <>{elements}</>;
  };

  return (
    <nav className="main-navigation">
      <div className="content-wrapper">
        <div className="links-wrapper">
          <Routes>
            <Route path="/" element={getNavElements(1)} />
          </Routes>
          <Routes>
            <Route path="/config" element={getNavElements(2)} />
          </Routes>
          <Routes>
            <Route path="/elements" element={getNavElements(3)} />
          </Routes>
          <Routes>
            <Route path="/result" element={getNavElements(4)} />
          </Routes>
        </div>
        <div className="logo-wrapper">
          <img src={LogoImage} alt="hauspunkt logo" />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
