// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { CarsStockInterface } from "../../../types/CarsInStockType";
// import { v4 as uuidv4 } from "uuid";
// import "swiper/css";
// import { api, base, useRequests } from "../../../hooks/useRequests";
// import { CarsType, ModelsType } from "../../../types/ApiTypes";
// import axios from "axios";
// import { RiVerifiedBadgeFill } from "react-icons/ri";
// import { atom, useRecoilState } from "recoil";

// export const SelectedModelFilterState = atom<{[key: string]: any}>({
//   key: "SelectedModelForfilterStateKey",
//   default: {}
// });

// export const CarsForSelectedModel = atom<CarsType[]>({
//   key: "CarsForSelectedModelState",
//   default: [],
// });

// export const CarsStockData: CarsStockInterface[] = [
//   {
//     id: uuidv4(),
//     image: "/car1.jpg",
//     title: "Lorem 5",
//     color: "gray",
//   },
//   {
//     id: uuidv4(),
//     image: "/car2.jpg",
//     title: "Lorem 4",
//     color: "red",
//   },
//   {
//     id: uuidv4(),
//     image: "/car1.jpg",
//     title: "Lorem 5",
//     color: "gray",
//   },

//   {
//     id: uuidv4(),
//     image: "/car2.jpg",
//     title: "Lorem 4",
//     color: "red",
//   },
// ];

// const CarsCategory: React.FC = () => {
//   const { ModelsData } = useRequests();

//   const hasModels = ModelsData && ModelsData?.length > 0;

//   // Selected models state
//   const [selectedModel, setSelectedModel] = useRecoilState(SelectedModelFilterState);
//   const [_, setCars] = useRecoilState(CarsForSelectedModel);

//   const fetchCarsByModel = async (modelIds: string[]) => {
//     try {
//       const responses = await Promise.all(
//         modelIds?.map((modelId) =>
//           axios.get(`${api}/add-car-front`, {
//             params: {
//               selected_model: modelId,
//               page: 1,
//               limit: 9,
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

//   return (
//     <section className="carscategory">
//       <Swiper
//         breakpoints={{
//           968: {
//             slidesPerView: 6,
//           },
//           568: {
//             slidesPerView: 2.6,
//           },
//           468: {
//             slidesPerView: 2,
//           },
//         }}
//         spaceBetween={16}>
//         {hasModels &&
//           ModelsData?.map((items: ModelsType) => (
//             <SwiperSlide
//               className={`${selectedModel[items?._id] === items?._id ? "actived" : ""}`}
//               key={items?._id}
//               onClick={() => {
//                 handleModelSelect(items?._id);
//                 console.log(items?._id);
//               }}>
//               <RiVerifiedBadgeFill className={`select-icon ${selectedModel[items?._id] ? "selected-icon" : ""}`} />
//               <div className="image-car">
//                 <img src={`${base}${items?.image}`} alt={`${items.title}-car`} title={items?.title} />
//               </div>
//               <h2 className="title-car">{items?.title}</h2>
//             </SwiperSlide>
//           ))}
//       </Swiper>
//     </section>
//   );
// };

// export default CarsCategory;
