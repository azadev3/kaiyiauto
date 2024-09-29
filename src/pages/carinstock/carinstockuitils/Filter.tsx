import React from "react";
import ModelsForFilter from "./filtercatalog/ModelsForFilter";
import BodyColorFilter from "./filtercatalog/BodyColorFilter";
import { useRequests } from "../../../hooks/useRequests";
import { useRecoilValue } from "recoil";
import { CarsForSelectedModel } from "./CarsCategory";

const Filter: React.FC = () => {

  const { KaiyiCarsData } = useRequests();
  
  const filteredCars = useRecoilValue(CarsForSelectedModel);

  return (
    <div className="filter">
     {/* search count */}
      <span className="searched-count-title">
        {KaiyiCarsData && !filteredCars ? (
          `${KaiyiCarsData?.length} Maşın tapıldı`
        ) : filteredCars?.length > 0 ? (
          `${filteredCars?.length} Maşın tapıldı`
        ) : ""}
      </span>

      {/* filter main container */}
      <div className="filter-container">
          <ModelsForFilter />
          {/* <EquipmentForFilter /> */}
          {/* <EngineCapacity /> */}
          <BodyColorFilter />
      </div>


    </div>
  );
};

export default Filter;
