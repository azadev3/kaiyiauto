import React from "react";

export const useButtonScroll = () => {
  const [showBtn, setShowBtn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const setScrolled = () => {
      const scrollwindow = window.scrollY;
      if (scrollwindow >= 300) {
        setShowBtn(true);
      } else if (scrollwindow <= 300) {
        setShowBtn(false);
      }
    };

    window.addEventListener("scroll", setScrolled);
    return () => {
      window.removeEventListener("scroll", setScrolled);
    };
  }, []);

  return showBtn;
};
