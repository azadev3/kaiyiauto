import React from "react";
import { PiListThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { base, useRequests } from "../hooks/useRequests";
import { useRecoilState } from "recoil";
import { HeaderDropdownState } from "./Header";
import { IoChevronDown, IoCloseOutline } from "react-icons/io5";
import { ChildrenSub, HeaderItemsTypes, HeaderSubItem } from "../types/HeaderTypes";
import { useTranslates } from "../hooks/useTranslates";
import { FaChevronLeft } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";
import { ModelsType } from "../types/ApiTypes";

const MobileHeader: React.FC = () => {
  const { translations } = useTranslates();

  const { ModelsData } = useRequests();

  const hasModels = ModelsData && ModelsData?.length > 0;

  const HeaderItems: HeaderItemsTypes[] = [
    {
      id: 1,
      title: `${translations["model_cesidleri"]}`,
      icon: <IoChevronDown className="downicon" />,
      subitems: [],
    },
    {
      id: 2,
      title: `${translations["elde_olan_masinlar"]}`,
      to: "/new-cars",
    },
    {
      id: 3,
      title: `${translations["satis_noqtesi_tap"]}`,
      to: "/find-dealer",
    },
    {
      id: 4,
      title: `${translations["alicilar_ucun"]}`,
      to: "",
      icon: <IoChevronDown className="downicon" />,
      subitems: [
        {
          id: 55,
          title: "",
          children: [
            { id: 654, title: `${translations["test_surusu_ucun_qeydiyyatdan_kec"]}`, to: "/test-drive" },
            { id: 656, title: `${translations["korporativ_musteriler_ucun"]}`, to: "/corporate-customer" },
            // { id: uuid(), title: "Xüsusi təkliflər", to: "/special-offers" },
            // { id: uuid(), title: "Maşın siğortası", to: "/car-insurance" },
            // { id: uuid(), title: "Lending" },
          ],
        },
      ],
    },
    {
      id: 5,
      title: `${translations["sahiblerine"]}`,
      to: "",
      icon: <IoChevronDown className="downicon" />,
      subitems: [
        {
          id: 1233,
          title: "",
          children: [
            { id: 90001, title: `${translations["kaiyi_garantiya_xidmeti"]}`, to: "/guarantee" },
            { id: 90002, title: `${translations["yol_qaydalari"]}`, to: "/road-rules" },
            { id: 90003, title: `${translations["temir_ve_baxim"]}`, to: "/repair-rules" },
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
            { id: 9193, title: `${translations["marka_kaiyi"]}`, to: "/brend-kaiyi" },
            { id: 9293, title: `${translations["blog"]}`, to: "/blogs" },
            { id: 9393, title: `${translations["yenilikler"]}`, to: "/news" },
            { id: 9493, title: `${translations["elaqe"]}`, to: "/contact" },
          ],
        },
      ],
    },
  ];

  const { LogoData } = useRequests();
  const [_, setDropdown] = useRecoilState(HeaderDropdownState);
  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);

  const handleToggleMenu = () => {
    setToggleMenu(true);
  };

  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<any>(null);

  React.useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      const targetMenuRef = menuRef && menuRef?.current && !menuRef?.current?.contains(e.target as Node);
      const targetButtonRef = buttonRef && buttonRef?.current && !buttonRef?.current?.contains(e.target as Node);

      if (targetMenuRef && targetButtonRef) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("mousedown", outsideClick);

    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, []);

  const [dropdownmenu, setDropdownmenu] = React.useState<number | null>(null);

  const handleDropdownMenu = (id: number) => {
    console.log(id);
    if (dropdownmenu === id) {
      setDropdownmenu(null);
    } else {
      setDropdownmenu(id);
    }
  };

  return (
    <div className="mobile-header">
      <Link onClick={() => setDropdown(null)} to="/" className="logo">
        {LogoData && <img src={`${base}${LogoData[0]?.logo || ""}`} alt="logo" />}
      </Link>

      <div className="menu-icon-cont" onClick={handleToggleMenu} ref={buttonRef}>
        <PiListThin className="menu-icon" />
      </div>

      <div className={`toggle-menu-overlay ${toggleMenu ? "active" : ""}`}>
        <div className="toggle-menu" ref={menuRef}>
          <div className="head">
            <IoCloseOutline className="close-icon" onClick={() => setToggleMenu(false)} />
          </div>

          <div className="navbar-menu">
            {HeaderItems?.map((items: HeaderItemsTypes) => (
              <React.Fragment key={items?.id}>
                {items.subitems ? (
                  <div className="dropdown" onClick={() => handleDropdownMenu(items?.id)}>
                    <span>{items?.title}</span>
                    <span style={{ transform: "rotate(-90deg)" }}>{items?.icon}</span>
                  </div>
                ) : (
                  <Link
                    to={items?.to || ""}
                    onClick={() => {
                      setToggleMenu(false);
                    }}>
                    {items?.title}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>

          {HeaderItems?.map((items: HeaderItemsTypes) => (
            <div key={items.id} className={`dropdown-menu-side ${dropdownmenu === items.id ? "active" : ""}`}>
              <div className="head" onClick={() => setDropdownmenu(null)}>
                <FaChevronLeft className="close-icon" />
              </div>
              <div className="subitems">
                {items?.id === 1 && hasModels
                  ? ModelsData?.map((item: ModelsType) => (
                      <Link
                        to={`/${item?._id}`}
                        onClick={() => {
                          setDropdown(null);
                          setToggleMenu(false);
                        }}
                        className="model-item"
                        key={item?._id}>
                        <div className="car-image">
                          <img src={`${base}${item?.image}`} alt="car-image" />
                        </div>
                        <div className="description">
                          <h1>{item?.title}</h1>
                          <p>{item?.slogan}</p>
                        </div>
                      </Link>
                    ))
                  : items?.subitems?.map((subitems: HeaderSubItem) =>
                      subitems?.children?.map((child: ChildrenSub) => (
                        <Link
                          to={child?.to || ""}
                          key={child?.id}
                          onClick={() => {
                            setToggleMenu(false);
                          }}>
                          {child?.title}
                        </Link>
                      ))
                    )}
              </div>
            </div>
          ))}

          <div className="language-area">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
