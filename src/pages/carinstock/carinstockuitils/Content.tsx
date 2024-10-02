import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { base, useRequests } from "../../../hooks/useRequests";
import { CarsType } from "../../../types/ApiTypes";
import { useRecoilState, useRecoilValue } from "recoil";
import { CarsForSelectedModel } from "./CarsCategory";
import { carColorsData, selectedColorState } from "./filtercatalog/BodyColorFilter";
import { RefreshButtonClickedState } from "./Filter";
import { useTranslates } from "../../../hooks/useTranslates";

export type Descriptions = {
  id: string;
  title: string;
  icon: string;
};

export interface FilterDataType {
  id: string;
  title: string;
  year: string;
  vin: string;
  description: Descriptions[];
  inStock: string;
  price: string;
  companyTitle: string;
  carImage: string;
  miniDesc?: string;
}

export const FilterData: FilterDataType[] = [
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
    miniDesc:
      "Lorem okfoewkfkeokoe owkrjgreigjriegj regpojregipreoigrio ergiojriojgriogjiorejg iorejigoregjioerjoigrjiogrejiog jreig04  irjgoirjgorjiggo erjgeri ",
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
    miniDesc:
      "Lorem okfoewkfkeokoe owkrjgreigjriegj regpojregipreoigrio ergiojriojgriogjiorejg iorejigoregjioerjoigrjiogrejiog jreig04  irjgoirjgorjiggo erjgeri ",
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
    miniDesc:
      "Lorem okfoewkfkeokoe owkrjgreigjriegj regpojregipreoigrio ergiojriojgriogjiorejg iorejigoregjioerjoigrjiogrejiog jreig04  irjgoirjgorjiggo erjgeri ",
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
    miniDesc:
      "Lorem okfoewkfkeokoe owkrjgreigjriegj regpojregipreoigrio ergiojriojgriogjiorejg iorejigoregjioerjoigrjiogrejiog jreig04  irjgoirjgorjiggo erjgeri ",
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
    miniDesc:
      "Lorem okfoewkfkeokoe owkrjgreigjriegj regpojregipreoigrio ergiojriojgriogjiorejg iorejigoregjioerjoigrjiogrejiog jreig04  irjgoirjgorjiggo erjgeri ",
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
    miniDesc:
      "Lorem okfoewkfkeokoe owkrjgreigjriegj regpojregipreoigrio ergiojriojgriogjiorejg iorejigoregjioerjoigrjiogrejiog jreig04  irjgoirjgorjiggo erjgeri ",
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "true",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
  {
    id: uuidv4(),
    title: "Lorem 5",
    year: "2023",
    vin: "XUUJA2G2*P0****58",
    carImage: "/car1.jpg",
    companyTitle: "AutoGERMES",
    inStock: "false",
    price: "12.000 ₼",
    description: [
      { id: uuidv4(), title: "1.5 l., 147 hp, Petrol", icon: "/crant.svg" },
      { id: uuidv4(), title: "Variator", icon: "/crant.svg" },
      { id: uuidv4(), title: "Front", icon: "/crant.svg" },
    ],
  },
];

const Content: React.FC = () => {

  const { translations } = useTranslates();

  //Refresh filter
  const [refreshFilters, setRefreshFilters] = useRecoilState(RefreshButtonClickedState);

  //for handle sort
  const [rotateState, setRotateState] = React.useState(2);

  const handleSort = () => {
    setRotateState((prev) => (prev + 1) % 3);
  };

  //hover show info modal on the card item
  const [infoModal, setInfoModal] = React.useState<string | null>(null);

  const handleInfoModal = (id: string | null) => {
    setInfoModal(id);
  };

  //GET CARS
  const { KaiyiCarsData } = useRequests();

  const hasCars = KaiyiCarsData && KaiyiCarsData?.length > 0;

  //if selected models set new cars in the filters
  const filteredCarsForModel = useRecoilValue(CarsForSelectedModel);

  // Simple pagination
  const [viewPage, setViewPage] = React.useState<number>(9);

  const handleLoadPag = () => {
    setViewPage((prevPag) => prevPag + 9);
  };

  //filter price high to low
  const [sortedCarsData, setSortedCarsData] = React.useState<CarsType[]>([]);

  // useEffect to handle sorting based on rotateState
  React.useEffect(() => {
    let sortedData: CarsType[] = [];

    if (KaiyiCarsData?.length > 0) {
      if (rotateState === 1) {
        // Sort by price high to low
        sortedData = KaiyiCarsData.slice().sort((a: CarsType, b: CarsType) => Number(b.price) - Number(a.price));
      } else if (rotateState === 2) {
        // Sort by price low to high
        sortedData = KaiyiCarsData.slice().sort((a: CarsType, b: CarsType) => Number(a.price) - Number(b.price));
      } else {
        // Reset sorting when rotateState is 0
        sortedData = KaiyiCarsData.slice(); // Original order
      }
    }

    // Update sorted data state
    setSortedCarsData(sortedData);

    // Reset filters when sorting is reset
    if (rotateState === 0) {
      setRefreshFilters("");
    }
  }, [rotateState, KaiyiCarsData]);

  //render for models
  const RenderCarsForModel = () => {
    return filteredCarsForModel?.slice(0, viewPage)?.map((data: CarsType) => (
      <Link to={`/new-cars/${data?._id}`} className="card-item" key={data?._id}>
        <div className="car-image">
          <img src={`${base}${data?.carImage}` || ""} alt={`${data?._id}`} title={data?.title} />
        </div>
        <div className="description-card">
          <h1>{data?.title}</h1>
          <div className="bottom">
            <div className="vin-and-year">
              <span>{data?.year}</span>
              <span>{data?.vin}</span>
            </div>
            <section className="in-stock">
              <span className="title">{data?.inStock}</span>
            </section>
          </div>
        </div>
        <div className="price-and-autogerm">
          <div className="price">
            <span>{data?.price}</span>
            <img
              src="/infoimg.svg"
              alt="info"
              onMouseEnter={() => handleInfoModal(data?._id)}
              onMouseLeave={() => setInfoModal(null)}
            />
          </div>
          <div className="bottom-title">
            <img src="/cursor.svg" alt="cursor" title={data?.companyTitle} />
            <strong>{data?.companyTitle}</strong>
            <div className={`modal-information ${infoModal === data?._id && data?.miniDesc ? "active" : ""}`}>
              <p>{data?.miniDesc}</p>
            </div>
          </div>
        </div>
      </Link>
    ));
  };

  //render only all cars
  const RenderAllCars = () => {
    return (
      hasCars &&
      KaiyiCarsData &&
      KaiyiCarsData?.slice(0, viewPage)?.map((data: CarsType) => (
        <Link to={`/new-cars/${data?._id}`} className="card-item" key={data?._id}>
          <div className="car-image">
            <img src={`${base}${data?.carImage}` || ""} alt={`${data?._id}`} title={data?.title} />
          </div>
          <div className="description-card">
            <h1>{data?.title}</h1>
            <div className="bottom">
              <div className="vin-and-year">
                <span>{data?.year}</span>
                <span>{data?.vin}</span>
              </div>
              <section className="in-stock">
                <span className="title">{data?.inStock}</span>
              </section>
            </div>
          </div>
          <div className="price-and-autogerm">
            <div className="price">
              <span>{data?.price}</span>
              <img
                src="/infoimg.svg"
                alt="info"
                onMouseEnter={() => handleInfoModal(data?._id)}
                onMouseLeave={() => setInfoModal(null)}
              />
            </div>
            <div className="bottom-title">
              <img src="/cursor.svg" alt="cursor" title={data?.companyTitle} />
              <strong>{data?.companyTitle}</strong>
              <div className={`modal-information ${infoModal === data?._id && data?.miniDesc ? "active" : ""}`}>
                <p>{data?.miniDesc}</p>
              </div>
            </div>
          </div>
        </Link>
      ))
    );
  };

  //render price high to low
  const RenderPriceFilter = () => {
    return (
      sortedCarsData &&
      sortedCarsData?.slice(0, viewPage)?.map((data: CarsType) => (
        <Link to={`/new-cars/${data?._id}`} className="card-item" key={data?._id}>
          <div className="car-image">
            <img src={`${base}${data?.carImage}` || ""} alt={`${data?._id}`} title={data?.title} />
          </div>
          <div className="description-card">
            <h1>{data?.title}</h1>
            <div className="bottom">
              <div className="vin-and-year">
                <span>{data?.year}</span>
                <span>{data?.vin}</span>
              </div>
              <section className="in-stock">
                <span className="title">{data?.inStock}</span>
              </section>
            </div>
          </div>
          <div className="price-and-autogerm">
            <div className="price">
              <span>{data?.price}</span>
              <img
                src="/infoimg.svg"
                alt="info"
                onMouseEnter={() => handleInfoModal(data?._id)}
                onMouseLeave={() => setInfoModal(null)}
              />
            </div>
            <div className="bottom-title">
              <img src="/cursor.svg" alt="cursor" title={data?.companyTitle} />
              <strong>{data?.companyTitle}</strong>
              <div className={`modal-information ${infoModal === data?._id && data?.miniDesc ? "active" : ""}`}>
                <p>{data?.miniDesc}</p>
              </div>
            </div>
          </div>
        </Link>
      ))
    );
  };

  //render for selected colors cars
  const [carForColorsData, setCarForColorsData] = useRecoilState(carColorsData);
  const RenderCarsForColors = () => {
    return (
      carForColorsData &&
      carForColorsData?.slice(0, viewPage)?.map((data: CarsType) => (
        <Link to={`/new-cars/${data?._id}`} className="card-item" key={data?._id}>
          <div className="car-image">
            <img src={`${base}${data?.carImage}` || ""} alt={`${data?._id}`} title={data?.title} />
          </div>
          <div className="description-card">
            <h1>{data?.title}</h1>
            <div className="bottom">
              <div className="vin-and-year">
                <span>{data?.year}</span>
                <span>{data?.vin}</span>
              </div>
              <section className="in-stock">
                <span className="title">{data?.inStock}</span>
              </section>
            </div>
          </div>
          <div className="price-and-autogerm">
            <div className="price">
              <span>{data?.price}</span>
              <img
                src="/infoimg.svg"
                alt="info"
                onMouseEnter={() => handleInfoModal(data?._id)}
                onMouseLeave={() => setInfoModal(null)}
              />
            </div>
            <div className="bottom-title">
              <img src="/cursor.svg" alt="cursor" title={data?.companyTitle} />
              <strong>{data?.companyTitle}</strong>
              <div className={`modal-information ${infoModal === data?._id && data?.miniDesc ? "active" : ""}`}>
                <p>{data?.miniDesc}</p>
              </div>
            </div>
          </div>
        </Link>
      ))
    );
  };

  const [_, setSelectedColor] = useRecoilState(selectedColorState);

  React.useEffect(() => {
    if (refreshFilters === "refreshed") {
      setSortedCarsData([]);
      setRotateState(2);
      setCarForColorsData([]);
      setSelectedColor(null);
      setRefreshFilters("");
    }
  }, [refreshFilters]);

  return (
    <div className="content">
      <div className="sorted-by-price">
        <span>{translations['sort_by']}</span>
        <div className={`icon ${`class-${rotateState}`}`} onClick={handleSort}>
          <strong>{translations['price']}</strong>
          <img src="/sorticon.svg" alt="sort-by-price" onClick={handleSort} />{" "}
        </div>
      </div>

      <div className="cards">
        {filteredCarsForModel?.length > 0
          ? RenderCarsForModel()
          : sortedCarsData?.length > 0
          ? RenderPriceFilter()
          : carForColorsData && carForColorsData?.length > 0
          ? RenderCarsForColors()
          : carForColorsData?.length === 0
          ? RenderAllCars()
          : filteredCarsForModel?.length === 0
          ? RenderAllCars()
          : RenderAllCars()}
      </div>
      {(filteredCarsForModel?.length > viewPage || KaiyiCarsData?.length > viewPage) && (
        <div className="more-btn">
          <button onClick={handleLoadPag}>Daha çox</button>
        </div>
      )}
    </div>
  );
};

export default Content;
