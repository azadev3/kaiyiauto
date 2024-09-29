import React from "react";
import { PiListThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { base, useRequests } from "../hooks/useRequests";
import { useRecoilState } from "recoil";
import { HeaderDropdownState } from "./Header";
import { IoCloseOutline } from "react-icons/io5";
import { ChildrenSub, HeaderItemsTypes, HeaderSubItem } from "../types/HeaderTypes";
import { FaAngleRight, FaChevronLeft } from "react-icons/fa6";
import { ModelsType } from "../types/ApiTypes";

const MobileHeader: React.FC = () => {
  const { ModelsData } = useRequests();

  const HeaderItems: HeaderItemsTypes[] = [
    {
      id: 1,
      title: "Model çeşidləri",
      icon: <FaAngleRight className="downicon" />,
      subitems: [
        {
          id: 2,
          children: ModelsData?.map((data: ModelsType) => ({
            id: data?._id,
            title: data?.title,
            image: data?.image,
            slogan: data?.slogan,
            to: data?._id,
          })),
          title: "Sedan, Crossovers",
          to: "",
        },
      ],
    },
    {
      id: 2,
      title: "alıcılar üçün",
      to: "",
      icon: <FaAngleRight className="downicon" />,
      subitems: [
        {
          id: 4,
          title: "",
          children: [
            { id: 14, title: "Test sürüşü üçün qeydiyyatdan keç", to: "/test-drive" },
            { id: 15, title: "Korporativ müştərilər üçün", to: "/corporate-customer" },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Sahiblərinə",
      to: "",
      icon: <FaAngleRight className="downicon" />,
      subitems: [
        {
          id: 33,
          title: "",
          children: [
            { id: 133, title: "KAIYI Qarantiya Xidməti", to: "/guarantee" },
            { id: 1333, title: "Yol qaydaları", to: "/road-rules" },
            { id: 13333, title: "Təmir və Baxım", to: "/repair-rules" },
          ],
        },
      ],
    },
    {
      id: 6,
      title: "ey kaıyı",
      to: "",
      icon: <FaAngleRight className="downicon" />,
      subitems: [
        {
          id: 16,
          title: "",
          children: [
            { id: 166, title: "Marka KAIYI", to: "/brend-kaiyi" },
            { id: 1666, title: "Blog", to: "/blogs" },
            { id: 16666, title: "News", to: "/news" },
            { id: 166666, title: "Əlaqə", to: "/contact" },
          ],
        },
      ],
    },
    {
      id: 8,
      title: "əldə olan maşınlar",
      to: "/new-cars",
    },
    {
      id: 243,
      title: "satış nöqtəsi tap",
      to: "/find-dealer",
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
                    <span>{items?.icon}</span>
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
                {items?.id === 1
                  ? items?.subitems?.map(
                      (subitems: HeaderSubItem) =>
                        subitems?.id === 2 &&
                        subitems?.children?.map((child: ChildrenSub) => (
                          <Link
                            to={`/${child?.to}`}
                            onClick={() => {
                              setDropdown(null);
                              setToggleMenu(false);
                            }}
                            className="model-item"
                            key={child?._id}>
                            <div className="car-image">
                              <img src={`${base}${child?.image}`} alt="car-image" />
                            </div>
                            <div className="description">
                              <h1>{child?.title}</h1>
                              <p>{child?.slogan}</p>
                            </div>
                          </Link>
                        ))
                    )
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
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
