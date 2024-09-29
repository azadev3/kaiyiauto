import React from "react";

export type ChildrenSub = {
  id: any;
  [key: string]: any;
  to?: string;
};

export type HeaderSubItem = {
  id: any;
  children?: ChildrenSub[];
  title?: string;
  to?: string;
};

export interface HeaderItemsTypes {
  id: any;
  title: string;
  to?: string;
  icon?: React.JSX.Element;
  subitems?: HeaderSubItem[];
}
