import React from "react";
import { HeaderDropdownState } from "../Header";
import { useRecoilState } from "recoil";
import { ChildrenSub, HeaderItemsTypes, HeaderSubItem } from "../../types/HeaderTypes";
import { Link } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { useTranslates } from "../../hooks/useTranslates";

const Owner: React.FC = () => {
  const { translations } = useTranslates();

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
      title: `${translations["sahiblerine"]}`,
      to: "",
      icon: <IoChevronDown className="downicon" />,
      subitems: [
        {
          id: 1233,
          title: "",
          children: [
            { id: 9911, title: `${translations['kaiyi_garantiya_xidmeti']}`, to: "/guarantee" },
            { id: 9812, title: `${translations['yol_qaydalari']}`, to: "/road-rules" },
            { id: 2239, title: `${translations['temir_ve_baxim']}`, to: "/repair-rules" },
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

  const [dropdown, setDropdown] = useRecoilState(HeaderDropdownState);

  //FIND MODELS
  const itemModels = HeaderItems?.find((items: HeaderItemsTypes) => {
    return dropdown === items?.id;
  })?.subitems;

  return (
    <div className="owner-dropdown">
      {itemModels?.map((items: HeaderSubItem) =>
        items?.children?.map((child: ChildrenSub) => (
          <Link
            onClick={() => {
              setDropdown(null);
            }}
            to={child?.to || ""}
            key={child?.id}>
            {child?.title}
          </Link>
        ))
      )}
    </div>
  );
};

export default Owner;
