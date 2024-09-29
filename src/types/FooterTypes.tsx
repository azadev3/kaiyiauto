export type FooterDropdownType = {
  id: string;
  title: string;
};

export interface FooterTypes {
  id: string;
  mainTitle: string;
  dropdown?: FooterDropdownType[];
}
