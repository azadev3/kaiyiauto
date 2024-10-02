import React from "react";
import CarsCategory from "./carinstockuitils/CarsCategory";
import MainFilteredArea from "./carinstockuitils/MainFilteredArea";
import { useTranslates } from "../../hooks/useTranslates";

const CarsInStock: React.FC = () => {

  const { translations } = useTranslates(); 

  return (
    <main className="cars-in-stock-page-wrapper">
      <div className="cars-in-stock-page">
        <h1>{translations['elde_olan_masinlar']}</h1>

        <CarsCategory />
        <MainFilteredArea />
      </div>
    </main>
  );
};

export default CarsInStock;
