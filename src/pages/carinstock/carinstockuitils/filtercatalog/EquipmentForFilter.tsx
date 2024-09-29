import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useFilterDropdown } from "../../../../hooks/useFilterDropdownHook";

type ModelsFilterType = {
  id: number;
  title: string;
};

export const ModelsFilterData: ModelsFilterType[] = [
  { id: 1, title: "Kaiyi 23" },
  { id: 2, title: "Kaiyi 10" },
  { id: 3, title: "Kaiyi 10" },
  { id: 4, title: "Kaiyi 23" },
];

const EquipmentForFilter: React.FC = () => {
  const { dropdown, handleDropdown } = useFilterDropdown();

  return (
    <div className="filter-header">
      <div className="head-link" onClick={() => handleDropdown("models")}>
        <span>Equipment</span>
        <FaAngleDown className={`down-icon ${dropdown === "models" ? "active" : ""}`} />
      </div>
      <div className={`component-for-filter ${dropdown === "models" ? "active" : ""}`}>
        <div className={`items-filter ${dropdown === "models" ? "active" : ""}`}>
          {ModelsFilterData.map(({ id, title }) => (
            <div key={id} className="filter-item">
              <input type="checkbox" id={`model-${id}`} />
              <label htmlFor={`model-${id}`}>{title}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentForFilter;
