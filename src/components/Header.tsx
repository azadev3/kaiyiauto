import React from "react";
import { HeaderItemsTypes } from "../types/HeaderTypes";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";
import MobileHeader from "./MobileHeader";

export const HeaderDropdownState = atom<string | null>({
  key: "HeaderDropdownState",
  default: null,
});

export const HeaderItems: HeaderItemsTypes[] = [
  {
    id: uuid(),
    title: "Model çeşidləri",
    icon: <IoChevronDown className="downicon" />,
    subitems: [
      {
        id: uuid(),
        children: [
          { id: uuid(), title: "LOREM 5", description: "Dynamic Modern Sedan", image: "/car1.jpg" },
          { id: uuid(), title: "LOREM 6", description: "Dynamic Modern Sedan", image: "/car2.jpg" },
          { id: uuid(), title: "LOREM 7", description: "Dynamic Modern Sedan", image: "/car1.jpg" },
          { id: uuid(), title: "LOREM 8", description: "Dynamic Modern Sedan", image: "/car2.jpg" },
          { id: uuid(), title: "LOREM 9", description: "Dynamic Modern Sedan", image: "/car1.jpg" },
          { id: uuid(), title: "LOREM 10", description: "Dynamic Modern Sedan", image: "/car2.jpg" },
        ],
        title: "Sedan, Crossovers",
        to: "",
      },
    ],
  },
  {
    id: uuid(),
    title: "əldə olan maşınlar",
    to: "/new-cars",
  },
  {
    id: uuid(),
    title: "satış nöqtəsi tap",
    to: "/find-dealer",
  },
  {
    id: uuid(),
    title: "alıcılar üçün",
    to: "",
    icon: <IoChevronDown className="downicon" />,
    subitems: [
      {
        id: uuid(),
        title: "",
        children: [
          { id: uuid(), title: "Test sürüşü üçün qeydiyyatdan keç", to: "/test-drive" },
          { id: uuid(), title: "Korporativ müştərilər üçün", to: "/corporate-customer" },
          // { id: uuid(), title: "Xüsusi təkliflər", to: "/special-offers" },
          // { id: uuid(), title: "Maşın siğortası", to: "/car-insurance" },
          // { id: uuid(), title: "Lending" },
        ],
      },
    ],
  },
  {
    id: uuid(),
    title: "Sahiblərinə",
    to: "",
    icon: <IoChevronDown className="downicon" />,
    subitems: [
      {
        id: uuid(),
        title: "",
        children: [
          { id: uuid(), title: "KAIYI Qarantiya Xidməti", to: "/guarantee" },
          { id: uuid(), title: "Yol qaydaları", to: "/road-rules" },
          { id: uuid(), title: "Təmir və Baxım", to: "/repair-rules" },
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
    id: uuid(),
    title: "ey kaıyı",
    to: "",
    icon: <IoChevronDown className="downicon" />,
    subitems: [
      {
        id: uuid(),
        title: "",
        children: [
          { id: uuid(), title: "Marka KAIYI", to: "/brend-kaiyi" },
          { id: uuid(), title: "Blog", to: "/blogs" },
          { id: uuid(), title: "News", to: "/news" },
          { id: uuid(), title: "Əlaqə", to: "/contact" },
        ],
      },
    ],
  },
];

const Header: React.FC = () => {
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
