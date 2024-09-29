import React from "react";
import "../styles/footer.scss";
import { SocialsInterface } from "../types/SocialTypes";
import { Link } from "react-router-dom";
import { FooterDropdownType, FooterTypes } from "../types/FooterTypes";
import { v4 as uuidv4 } from "uuid";

export const SocialData: SocialsInterface[] = [
  {
    id: 1,
    title: "Telegram",
    icon: "/tg.svg",
    link: "",
  },
  {
    id: 2,
    title: "Telegram",
    icon: "/tg.svg",
    link: "",
  },
  {
    id: 3,
    title: "Telegram",
    icon: "/tg.svg",
    link: "",
  },
];

export const FooterData: FooterTypes[] = [
  {
    id: uuidv4(),
    mainTitle: "Modellər",
    dropdown: [
      { id: uuidv4(), title: "Model 1" },
      { id: uuidv4(), title: "Model 2" },
      { id: uuidv4(), title: "Model 3" },
      { id: uuidv4(), title: "Model 4" },
      { id: uuidv4(), title: "Model 5" },
    ],
  },
  {
    id: uuidv4(),
    mainTitle: "Alıcılar üçün",
    dropdown: [
      { id: uuidv4(), title: "Test sürüşü üşün qeydiyyatdan keç" },
      { id: uuidv4(), title: "Korporativ müştərilər üçün" },
      // { id: uuidv4(), title: "Xüsusi təkliflər" },
      { id: uuidv4(), title: "Maşın siğortası" },
      { id: uuidv4(), title: "Lending" },
    ],
  },
  {
    id: uuidv4(),
    mainTitle: "Sahiblər üçün",
    dropdown: [
      { id: uuidv4(), title: "Qarantiya xidməti" },
      { id: uuidv4(), title: "Baxım qaydaları" },
      { id: uuidv4(), title: "Yolkənarı yardım" },
    ],
  },
  {
    id: uuidv4(),
    mainTitle: "Lorem Haqqında",
    dropdown: [
      { id: uuidv4(), title: "Brand Lorem" },
      { id: uuidv4(), title: "Blog" },
      { id: uuidv4(), title: "Əlaqə" },
    ],
  },
  {
    id: uuidv4(),
    mainTitle: "Diler tap",
  },
  {
    id: uuidv4(),
    mainTitle: "Stokdakı maşınlar",
  },
  // {
  //   id: uuidv4(),
  //   mainTitle: "Diler ol",
  // },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <section className="icons">
          {SocialData?.map((items: SocialsInterface) => (
            <Link to={items.link || ""} key={items?.id} className="item-social">
              <img src={items?.icon} alt={`${items?.id}-icon`} title={items?.title} />
            </Link>
          ))}
        </section>

        <section className="navbars">
          {FooterData?.map((items: FooterTypes) => (
            <div className="navbar-item" key={items?.id}>
              <Link to="" className="main-title">
                {items?.mainTitle}
              </Link>
              <div className="dropdown">
                {items?.dropdown &&
                  items?.dropdown?.map((dropdown: FooterDropdownType) => (
                    <Link to="" key={dropdown?.id} className="link-dropdown">
                      {dropdown?.title}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </section>

        <section className="privacy-policy">
          <p>
            Privacy PolicyThe images of cars presented on the site may differ from the cars available at dealerships.
            The display of colors on the screens of various devices may differ from the color of the real car. Some
            options and colors of the car in the images may not be available at dealerships.All information on the site
            regarding cars is for informational purposes only and is not a public offer. Actual specifications are
            subject to change at any time. All prices indicated on the site are not final and are set by dealerships
            individually.KAI RUS LLC does not guarantee the timeliness, accuracy and completeness of the information on
            the site, as well as unhindered access to the site at any time. Published information can be changed at any
            time without prior notice.Information on the relevant models and configurations and their availability,
            prices, possible benefits and terms of purchase is available from official KAIYI dealers. The product is
            certified.For the media - marketing@kaiyi-auto.ruHotline: 8 800 600 81 47
          </p>
        </section>

        <article className="bottom-title">
          <span>© 2024, all rights reserved</span>
        </article>
      </div>
    </footer>
  );
};

export default Footer;
