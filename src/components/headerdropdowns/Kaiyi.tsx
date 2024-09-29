import React from "react";
import { HeaderDropdownState, HeaderItems } from "../Header";
import { useRecoilState } from "recoil";
import { ChildrenSub, HeaderItemsTypes, HeaderSubItem } from "../../types/HeaderTypes";
import { Link } from "react-router-dom";

const Kaiyi: React.FC = () => {
  const [dropdown, setDropdown] = useRecoilState(HeaderDropdownState);

  //FIND MODELS
  const itemModels = HeaderItems?.find((items: HeaderItemsTypes) => {
    return dropdown === items?.id;
  })?.subitems;

  return (
    <div className="kaiyi-dropdown">
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

export default Kaiyi;
