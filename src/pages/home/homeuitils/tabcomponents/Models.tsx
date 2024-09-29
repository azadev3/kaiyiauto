import React from "react";
import { Link } from "react-router-dom";
import { base, useRequests } from "../../../../hooks/useRequests";
import { ModelsType } from "../../../../types/ApiTypes";
const Models: React.FC = () => {

  const { ModelsData } = useRequests();

  return (
    <section className="models-component-wrapper">
      <div className="models-component">
        <h2>Modellər</h2>
        <div className="models-container">
          {ModelsData &&
            ModelsData?.map((items: ModelsType) => (
              <Link to={`/${items?._id}`} key={items?._id} className="item-grid">
                <div className="image-car">
                  <img src={`${base}${items?.image}` || ""} alt={`${items?._id}-image`} title={items?.title} />
                </div>

                <article className="description">
                  <h3>{items?.title}</h3>
                  <div className="text">
                    <p>{items?.slogan}</p>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Models;
