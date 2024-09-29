import React from "react";
import { IoChevronUp } from "react-icons/io5";
import { useButtonScroll } from "../hooks/useButtonScroll";

const ScrollDownButton: React.FC = () => {
  // clicked btn reset scroll position
  const resetScrollPosition = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  const showBtn = useButtonScroll();

  return (
    <button onClick={resetScrollPosition} className={`scroll-down-btn ${showBtn ? "show" : ""}`}>
      <IoChevronUp className="upicon" />
    </button>
  );
};

export default ScrollDownButton;
