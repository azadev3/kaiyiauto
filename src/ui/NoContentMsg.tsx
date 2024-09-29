import React from "react";
import { MdNoPhotography } from "react-icons/md";

const NoContentMsg: React.FC = () => {
  return (
    <section className="no-content-msg-wrapper">
      <div className="no-content-msg">
        <div className="title">
          <MdNoPhotography className="no-photo" />
          <span>Hələ ki, bu tab içərisinə heç nə əlavə olunmayıb.</span>
        </div>
      </div>
    </section>
  );
};

export default NoContentMsg;
