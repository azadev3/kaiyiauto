import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SelectedLanguageState } from "../recoil/Atom";
import { FaAngleDown } from "react-icons/fa6";

const options = [
  { label: "AZ", value: "az" },
  { label: "EN", value: "en" },
  { label: "RU", value: "ru" },
];

const LanguageSelector: React.FC = () => {
  const [selectedLang, setSelectedLang] = useRecoilState(SelectedLanguageState);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selected_lang_n");
    if (savedLanguage) {
      setSelectedLang(savedLanguage);
    } else {
      setSelectedLang("az");
      localStorage.setItem("selected_lang_n", "az");
    }
  }, [setSelectedLang]);

  const handleChangeLanguage = (value: string) => {
    setSelectedLang(value);
    localStorage.setItem("selected_lang_n", value);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click was outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false); // Close the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup the event listener
    };
  }, []);

  return (
    <section className="language-selector">
      <div className="dropdown" ref={dropdownRef}>
        <div className="dropdown-control" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <span>{options.find((option) => option.value === selectedLang)?.label}</span>
          <span className="dropdown-arrow">
            <FaAngleDown
              fontSize={17}
              style={{
                transition: "150ms ease-in-out",
                transform: isDropdownOpen ? "rotate(180deg)" : "",
              }}
            />
          </span>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-options">
            {options
              .filter((option) => option.value !== selectedLang) // Filter out the selected language
              .map((option) => (
                <div
                  key={option.value}
                  className={`dropdown-option ${selectedLang === option.value ? "selected" : ""}`}
                  onClick={() => handleChangeLanguage(option.value)}>
                  {option.label}
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LanguageSelector;
