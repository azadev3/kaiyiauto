import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useFilterDropdown } from "../../../../hooks/useFilterDropdownHook";
import { useRequests } from "../../../../hooks/useRequests";
import { CarsType } from "../../../../types/ApiTypes";
import { atom, useRecoilState } from "recoil";
import { useTranslates } from "../../../../hooks/useTranslates";

export const carColorsData = atom<CarsType[] | null>({
  key: "carcolorsDataKey",
  default: null,
});

export const selectedColorState = atom<string | null>({
  key: "slcColorStateKey",
  default: null,
});

const BodyColorFilter: React.FC = () => {
  
  const { translations } = useTranslates(); 

  const { KaiyiCarsData } = useRequests();
  const hasKaiyiCars = KaiyiCarsData && KaiyiCarsData?.length > 0;

  const extractCarColors =
    hasKaiyiCars &&
    KaiyiCarsData?.map((cars: CarsType) => ({
      id: cars?._id,
      code: cars?.color,
    }));

  const { dropdown, handleDropdown } = useFilterDropdown();

  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorState);

  const handleSelectColor = (id: string) => {
    setSelectedColor((prev) => (prev === id ? null : id));
  };

  const [_, setCarForColors] = useRecoilState(carColorsData);
  React.useEffect(() => {
    if (selectedColor) {
      const renderedCarsForColor =
        hasKaiyiCars &&
        KaiyiCarsData?.filter((cars: CarsType) => {
          return selectedColor === cars?._id;
        });

      setCarForColors(renderedCarsForColor ? renderedCarsForColor : []);
    }
  }, [selectedColor, KaiyiCarsData]);

  return (
    <div className="filter-header">
      <div className="head-link" onClick={() => handleDropdown("models")}>
        <span>{translations['body_color']}</span>
        <FaAngleDown className={`down-icon ${dropdown === "models" ? "active" : ""}`} />
      </div>
      <div className={`component-for-filter ${dropdown === "models" ? "active" : ""}`}>
        <div className={`items-filter ${dropdown === "models" ? "active" : ""}`}>
          <div className="colors">
            {extractCarColors
              ? extractCarColors?.map((colors: any) => (
                  <span
                    className={`color-item ${selectedColor === colors?.id ? "active" : ""}`}
                    onClick={() => handleSelectColor(colors?.id)}
                    style={{ backgroundColor: colors?.code }}
                    key={colors?.id}></span>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyColorFilter;
