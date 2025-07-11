import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { HeaderDropdownState } from "./Header";
import LanguageSelector from "./LanguageSelector";
import { base, useRequests } from "../hooks/useRequests";

const TopHeader: React.FC = () => {
  const { LogoData, TopHeaderLocation, TopHeaderTelephone } = useRequests();
  const [, setDropdown] = useRecoilState(HeaderDropdownState);

  const navigate = useNavigate();

  return (
    <header className="topheader-wrapper">
      <div className="topheader">
        <Link onClick={() => setDropdown(null)} to="/" className="logo">
          {LogoData && <img src={`${base}${LogoData[0]?.logo || ""}`} alt="logo" />}
        </Link>

        <section className="right-informations">
          {TopHeaderLocation && (
            <article className="item-info">
              <img
                src={`${base}${TopHeaderLocation[0]?.icon}` || ""}
                alt={`${TopHeaderLocation[0]?._id}-icon`}
                title={TopHeaderLocation[0]?.title}
              />
              <div className="descript">
                <span 
                onClick={() => {
                  navigate("/guarantee");
                }}
                className="title">{TopHeaderLocation[0]?.title}</span>
              </div>
            </article>
          )}

          {TopHeaderTelephone && (
            <article className="item-info">
              <img
                src={`${base}${TopHeaderTelephone[0]?.icon}` || ""}
                alt={`${TopHeaderTelephone[0]?._id}-icon`}
                title={TopHeaderTelephone[0]?.title}
              />
              <div className="descript">
                <a href={`tel:${TopHeaderTelephone[0]?.telephone}`} className="title">{TopHeaderTelephone[0]?.title}</a>
              </div>
            </article>
          )}
          <LanguageSelector />
        </section>
      </div>
    </header>
  );
};

export default TopHeader;
