import React from "react";
import CarsCategory from "./carinstockuitils/CarsCategory";
import MainFilteredArea from "./carinstockuitils/MainFilteredArea";

const CarsInStock: React.FC = () => {
  return (
    <main className="cars-in-stock-page-wrapper">
      <div className="cars-in-stock-page">
        <h1>əldə olan maşınlar</h1>

        <CarsCategory />
        <MainFilteredArea />
      </div>
    </main>
  );
};

export default CarsInStock;
