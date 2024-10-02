import React from "react";
import { HeaderItemsTypes } from "../types/HeaderTypes";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
// import { v4 as uuid } from "uuid";
import MobileHeader from "./MobileHeader";
import { useTranslates } from "../hooks/useTranslates";

export const HeaderDropdownState = atom<string | null>({
  key: "HeaderDropdownState",
  default: null,
});


const Header: React.FC = () => {

  const { translations } = useTranslates(); 

  
  const HeaderItems: HeaderItemsTypes[] = [
    {
      id: 1,
      title: `${translations['model_cesidleri']}`,
      icon: <IoChevronDown className="downicon" />,
      subitems: [],
    },
    {
      id: 2,
      title: `${translations['elde_olan_masinlar']}`,
      to: "/new-cars",
    },
    {
      id: 3,
      title: `${translations['satis_noqtesi_tap']}`,
      to: "/find-dealer",
    },
    {
      id: 4,
      title: `${translations['alicilar_ucun']}`,
      to: "",
      icon: <IoChevronDown className="downicon" />,
      subitems: [
        {
          id: 55,
          title: "",
          children: [
            { id: 654, title: `${translations['test_surusu_ucun_qeydiyyatdan_kec']}`, to: "/test-drive" },
            { id: 656, title: `${translations['korporativ_musteriler_ucun']}`, to: "/corporate-customer" },
            // { id: uuid(), title: "Xüsusi təkliflər", to: "/special-offers" },
            // { id: uuid(), title: "Maşın siğortası", to: "/car-insurance" },
            // { id: uuid(), title: "Lending" },
          ],
        },
      ],
    },
    {
      id: 5,
      title: `${translations['sahiblerine']}`,
      to: "",
      icon: <IoChevronDown className="downicon" />,
      subitems: [
        {
          id: 1233,
          title: "",
          children: [
            { id: 323333, title: `${translations['kaiyi_garantiya_xidmeti']}`, to: "/guarantee" },
            { id: 2323223232, title: `${translations['yol_qaydalari']}`, to: "/road-rules" },
            { id: 11111121112, title: `${translations['temir_ve_baxim']}`, to: "/repair-rules" },
          ],
        },
      ],
    },
    // {
    //   id: uuid(),
    //   title: "Diler ol",
    //   to: "/become-dealer",
    // },
    {
      id: 6,
      title: "EY KAIYI",
      to: "",
      icon: <IoChevronDown className="downicon" />,
      subitems: [
        {
          id: 994,
          title: "",
          children: [
            { id: 9193, title: `${translations['marka_kaiyi']}`, to: "/brend-kaiyi" },
            { id: 9293, title: `${translations['blog']}`, to: "/blogs" },
            { id: 9393, title: `${translations['yenilikler']}`, to: "/news" },
            { id: 9493, title: `${translations['elaqe']}`, to: "/contact" },
          ],
        },
      ],
    },
  ];
  
  //OPEN DROPDOWN
  const [dropdown, setDropdown] = useRecoilState(HeaderDropdownState);

  const handleDropdown = (id: string | null) => {
    setDropdown((prev) => (prev === id ? null : id));
  };

  //Mobile header
  const [mobile, setMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const controlWindow = () => {
      if (window.innerWidth <= 1000) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    controlWindow();

    window.addEventListener("resize", controlWindow);
    return () => window.removeEventListener("resize", controlWindow);
  }, []);

  return (
    <header className="header-wrapper">
      {mobile ? (
        <MobileHeader />
      ) : (
        <div className="header">
          <nav className="navbar">
            {HeaderItems?.map((items: HeaderItemsTypes) => (
              <React.Fragment key={items?.id}>
                {items.subitems ? (
                  <div className="dropdown" onClick={() => handleDropdown(items?.id)}>
                    <span>{items?.title}</span>
                    <span
                      style={{
                        transform: dropdown === items?.id ? "rotate(180deg)" : "",
                        transition: "200ms ease-in-out",
                      }}>
                      {items?.icon}
                    </span>
                  </div>
                ) : (
                  <Link to={items?.to || ""} onClick={() => setDropdown(null)}>
                    {items?.title}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
