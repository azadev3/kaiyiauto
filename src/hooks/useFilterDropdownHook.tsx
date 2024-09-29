import React from "react";

export const useFilterDropdown = () => {
  const [dropdown, setDropdown] = React.useState<string>("");

  const handleDropdown = (id: string) => {
    setDropdown((prev) => prev ? "" : id);
  };

  return { dropdown, handleDropdown };
};
