import React, { ChangeEvent } from "react";
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

const EngineCapacity: React.FC = () => {
  const { dropdown, handleDropdown } = useFilterDropdown();

  const [minVal, setMinVal] = React.useState(10);
  const [maxVal, setMaxVal] = React.useState(100);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
  };

  return (
    <div className="filter-header">
      <div className="head-link" onClick={() => handleDropdown("models")}>
        <span>Engine capacity (l.)</span>
        <FaAngleDown className={`down-icon ${dropdown === "models" ? "active" : ""}`} />
      </div>
      <div className={`component-for-filter ${dropdown === "models" ? "active" : ""}`}>
        <div className={`items-filter ${dropdown === "models" ? "active" : ""}`}>
          <div className="capacity-calculator">
            <div className="from-to-content">
              <div className="from">
                <label htmlFor="capacity">From</label>
                <input defaultValue={minVal || ""} type="number" placeholder="1.5" id="capacity" name="capacity" />
              </div>
              <div className="to">
                <label htmlFor="capacity">To</label>
                <input defaultValue={maxVal || ""} type="number" placeholder="1.5" id="capacity" name="capacity" />
              </div>
            </div>

            <div className="range-slider">
              <input
                type="range"
                min="0"
                max="100"
                value={minVal || 0}
                onChange={handleMinChange}
                className="thumb thumb-left"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={maxVal || 0}
                onChange={handleMaxChange}
                className="thumb thumb-right"
              />
              <div className="slider-track"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineCapacity;
