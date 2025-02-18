// import React from "react";
// import ModelsForFilter from "./filtercatalog/ModelsForFilter";
// import BodyColorFilter from "./filtercatalog/BodyColorFilter";
// import { useRequests } from "../../../hooks/useRequests";
// import { atom, useRecoilState, useRecoilValue } from "recoil";
// import { CarsForSelectedModel } from "./CarsCategory";
// import { useTranslates } from "../../../hooks/useTranslates";

// //if refresh button clicked
// export const RefreshButtonClickedState = atom<string>({
//   key: "RefreshButtonClickedStateKey",
//   default: "",
// });

// const Filter: React.FC = () => {
//   const { translations } = useTranslates();

//   const { KaiyiCarsData } = useRequests();

//   const filteredCars = useRecoilValue(CarsForSelectedModel);

//   const [_, setRefreshFilters] = useRecoilState(RefreshButtonClickedState);

//   return (
//     <div className="filter">
//       {/* search count */}
//       <span className="searched-count-title">
//         {KaiyiCarsData && !filteredCars
//           ? `${KaiyiCarsData?.length} Maşın tapıldı`
//           : filteredCars?.length > 0
//           ? `${filteredCars?.length} Maşın tapıldı`
//           : ""}
//       </span>

//       {/* filter main container */}
//       <div className="filter-container">
//         <ModelsForFilter />
//         {/* <EquipmentForFilter /> */}
//         {/* <EngineCapacity /> */}
//         {/* <BodyColorFilter /> */}
//         <button
//           className="refresh-filters"
//           onClick={() => {
//             setRefreshFilters("refreshed");
//           }}>
//           {translations["filterleri_sifirla"]}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Filter;
