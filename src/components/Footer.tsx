import React from "react";
import "../styles/footer.scss";
import { Link } from "react-router-dom";
import { FooterDropdownType, FooterTypes } from "../types/FooterTypes";
import { v4 as uuidv4 } from "uuid";
import { base, useRequests } from "../hooks/useRequests";
import { ModelsType, Socials } from "../types/ApiTypes";
import { useTranslates } from "../hooks/useTranslates";

const Footer: React.FC = () => {
  const { translations } = useTranslates();

  const { ModelsData } = useRequests();

  const hasModels = ModelsData && ModelsData?.length > 0;

  const FooterData: FooterTypes[] = [
    {
      id: uuidv4(),
      mainTitle: `${translations['modeller_title']}`,
      dropdown: hasModels
        ? ModelsData?.map((data: ModelsType) => ({
            id: data?._id,
            title: data?.title,
            to: `/${data?._id}`,
          }))
        : [],
    },
    {
      id: uuidv4(),
      mainTitle: `${translations["alicilar_ucun"]}`,
      dropdown: [
        { id: uuidv4(), title: `${translations["test_surusu_ucun_qeydiyyatdan_kec"]}`, to: "/test-drive" },
        { id: uuidv4(), title: `${translations["korporativ_musteriler_ucun"]}`, to: "/corporate-customer" },
      ],
    },
    {
      id: uuidv4(),
      mainTitle: `${translations["sahiblerine"]}`,
      dropdown: [
        { id: uuidv4(), title: `${translations["kaiyi_garantiya_xidmeti"]}`, to: "/guarantee" },
        { id: uuidv4(), title: `${translations["temir_ve_baxim"]}`, to: "/repair-rules" },
        { id: uuidv4(), title: `${translations["yol_qaydalari"]}`, to: "/road-rules" },
      ],
    },
    {
      id: uuidv4(),
      mainTitle: "EY KAIYI",
      dropdown: [
        { id: uuidv4(), title: `${translations["marka_kaiyi"]}`, to: "/brend-kaiyi" },
        { id: uuidv4(), title: `${translations["blog"]}`, to: "/blogs" },
        { id: uuidv4(), title: `${translations["yenilikler"]}`, to: "/news" },
        { id: uuidv4(), title: `${translations["elaqe"]}`, to: "/contact" },
      ],
    },
    // {
    //   id: uuidv4(),
    //   mainTitle: "Diler tap",
    //   to: "/become-dealer",
    // },
    {
      id: uuidv4(),
      mainTitle: `${translations["stokdaki_masinlar"]}`,
    },
    // {
    //   id: uuidv4(),
    //   mainTitle: "Diler ol",
    // },
  ];

  const { SocialsData } = useRequests();

  const hasSocials = SocialsData && SocialsData?.length > 0;

  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <section className="icons">
          {hasSocials &&
            SocialsData?.map((items: Socials) => (
              <Link target="_blank" to={items.link || ""} key={items?._id} className="item-social">
                <img src={`${base}${items?.icon}` || ""} alt={`${items?._id}-icon`} title={items?.title} />
              </Link>
            ))}
        </section>

        <section className="navbars">
          {FooterData?.map((items: FooterTypes, i: number) => (
            <div className="navbar-item" key={items?.id}>
              {i === 4 ? (
                <Link to={"/new-cars"} className="main-title">
                  {items?.mainTitle}
                </Link>
              ) : (
                <div className="main-title">{items?.mainTitle}</div>
              )}
              <div className="dropdown">
                {items?.dropdown &&
                  items?.dropdown?.map((dropdown: FooterDropdownType) => (
                    <Link to={dropdown?.to || ""} key={dropdown?.id} className="link-dropdown">
                      {dropdown?.title}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </section>

        <section className="privacy-policy">
          <p>
            {translations['footer_description']}
          </p>
        </section>

        <article className="bottom-title">
          <span>{translations['all_rights_reserved']}</span>
        </article>
      </div>
    </footer>
  );
};

export default Footer;
