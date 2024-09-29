import React from "react";
import { HeaderDropdownState, HeaderItems } from "../Header";
import { useRecoilState } from "recoil";
import { HeaderItemsTypes, HeaderSubItem } from "../../types/HeaderTypes";
import { Link } from "react-router-dom";
import { base, useRequests } from "../../hooks/useRequests";
import { ModelsType } from "../../types/ApiTypes";

const Model: React.FC = () => {
  const [dropdown, setDropdown] = useRecoilState(HeaderDropdownState);

  //FIND MODELS
  const itemModels = HeaderItems?.find((items: HeaderItemsTypes) => {
    return dropdown === items?.id;
  })?.subitems;

  //SELECT OR CHANGE TABS
  const [tabs, setTabs] = React.useState<string>();

  const handleNavigator = (id: string) => {
    setTabs(id);
  };

  // COMPONENT REFRESH SET TABS ID ON DEFAULT INITIAL ID
  React.useEffect(() => {
    if (itemModels && itemModels.length > 0) {
      setTabs(itemModels[0].id.toString()); // Set initial tab to the first item-tab
    }
  }, [itemModels]);

  const { ModelsData } = useRequests();

  return (
    <div className="model-dropdown">
      <div className="tab-navigator-wrapper">
        <div className="tab-navigator">
          {itemModels?.map((models: HeaderSubItem) => (
            <div
              className={`item-tab ${tabs === models?.id ? "active-tab" : ""}`}
              key={models?.id}
              onClick={() => handleNavigator(models?.id)}>
              <span>{models?.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="models">
        {ModelsData &&
          ModelsData?.map((item: ModelsType) => (
            <Link
              to={`/${item?._id}`}
              onClick={() => {
                setDropdown(null);
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
          ))}
      </div>
    </div>
  );
};

export default Model;
