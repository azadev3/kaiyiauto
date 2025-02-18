// import React from "react";
// import { FaAngleDown } from "react-icons/fa6";
// import { useFilterDropdown } from "../../../../hooks/useFilterDropdownHook";
// import { api, useRequests } from "../../../../hooks/useRequests";
// import { ModelsType } from "../../../../types/ApiTypes";
// import { CarsForSelectedModel, SelectedModelFilterState } from "../CarsCategory";
// import { useRecoilState, useRecoilValue } from "recoil";
// import axios from "axios";
// import { SelectedLanguageState } from "../../../../recoil/Atom";
// import { RefreshButtonClickedState } from "../Filter";
// import { useTranslates } from "../../../../hooks/useTranslates";

// const ModelsForFilter: React.FC = () => {

//   const { translations } = useTranslates();

//   const { ModelsData } = useRequests();
//   const { dropdown, handleDropdown } = useFilterDropdown();

//   const hasModels = ModelsData && ModelsData?.length > 0;

//   //if selected model CarsCategory component, select chekcbox automatic
//   const [selectedModel, setSelectedModel] = useRecoilState(SelectedModelFilterState);
//   const [_, setCars] = useRecoilState(CarsForSelectedModel);
//   const selectedLanguage = useRecoilValue(SelectedLanguageState);

//   const fetchCarsByModel = async (modelIds: string[]) => {
//     try {
//       const responses = await Promise.all(
//         modelIds?.map((modelId) =>
//           axios.get(`${api}/add-car-front`, {
//             params: {
//               selected_model: modelId,
//               selected_language: selectedLanguage,
//             },
//           })
//         )
//       );

//       const allCars = responses?.flatMap((response) => response.data);
//       setCars(allCars);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleModelSelect = (modelId: string) => {
//     const newSelectedModel = {
//       ...selectedModel,
//       [modelId]: selectedModel[modelId] ? undefined : modelId,
//     };

//     setSelectedModel(newSelectedModel);

//     const modelIds = Object.values(newSelectedModel).filter(Boolean);
//     fetchCarsByModel(modelIds);
//   };

//   //If refreshed button refresh filters
//   const [refreshFilters, setRefreshFilters] = useRecoilState(RefreshButtonClickedState);

//   React.useEffect(() => {
//     setCars([]);
//     setRefreshFilters("");
//     setSelectedModel({});
//   }, [refreshFilters]);

//   return (
//     <div className="filter-header">
//       <div className="head-link" onClick={() => handleDropdown("models")}>
//         <span>{translations['modeller_title']}</span>
//         <FaAngleDown className={`down-icon ${dropdown === "models" ? "active" : ""}`} />
//       </div>
//       <div className={`component-for-filter ${dropdown === "models" ? "active" : ""}`}>
//         <div className={`items-filter ${dropdown === "models" ? "active" : ""}`}>
//           {hasModels &&
//             ModelsData?.map((models: ModelsType) => (
//               <div key={models?._id} className="filter-item">
//                 <input
//                   onChange={() => {
//                     handleModelSelect(models?._id);
//                   }}
//                   checked={selectedModel[models?._id] === models?._id} //control by selected model
//                   type="checkbox"
//                   id={`model-${models?._id}`}
//                 />
//                 <label htmlFor={`model-${models?._id}`}>{models?.title}</label>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModelsForFilter;
