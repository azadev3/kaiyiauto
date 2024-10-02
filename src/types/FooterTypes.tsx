export type FooterDropdownType = {
  id: string;
  title: string;
  to?: string;
};

export interface FooterTypes {
  id: string;
  to?: string;
  mainTitle: string;
  dropdown?: FooterDropdownType[];
}
