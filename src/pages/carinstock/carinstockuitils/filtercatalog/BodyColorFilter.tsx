import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useFilterDropdown } from "../../../../hooks/useFilterDropdownHook";

type Colors = {
  id: number;
  code: string;
};

const ColorsData: Colors[] = [
  {
    id: 1,
    code: "#FF4759",
  },
  {
    id: 2,
    code: "##F3F3F3",
  },
  {
    id: 3,
    code: "#000000",
  },
  {
    id: 4,
    code: "#1D60F0",
  },
  {
    id: 5,
    code: "#91FF47",
  },
  {
    id: 6,
    code: "#FFCE47",
  },
  {
    id: 7,
    code: "#A6A6A6",
  },
];

const BodyColorFilter: React.FC = () => {
  const { dropdown, handleDropdown } = useFilterDropdown();

  const [selectedColor, setSelectedColor] = React.useState<{ [key: number]: boolean }>({});

  const handleSelectColor = (id: number) => {
    setSelectedColor((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="filter-header">
      <div className="head-link" onClick={() => handleDropdown("models")}>
        <span>Body color</span>
        <FaAngleDown className={`down-icon ${dropdown === "models" ? "active" : ""}`} />
      </div>
      <div className={`component-for-filter ${dropdown === "models" ? "active" : ""}`}>
        <div className={`items-filter ${dropdown === "models" ? "active" : ""}`}>
          <div className="colors">
            {ColorsData?.map((colors: Colors) => (
              <span
                className={`color-item ${selectedColor[colors?.id] ? "active" : ""}`}
                onClick={() => handleSelectColor(colors?.id)}
                style={{ backgroundColor: colors?.code }}
                key={colors?.id}></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyColorFilter;
