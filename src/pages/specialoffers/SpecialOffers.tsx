import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type SpecOfferType = {
  id: number;
  image: string;
  title: string;
  description?: string;
};

const SpecOfferData: SpecOfferType[] = [
  {
    id: 1,
    title: "Korporativ müştərilər üçün təkliflər",
    image: "/h.png",
    description: "",
  },
  {
    id: 2,
    title: "Korporativ müştərilər üçün təkliflər",
    image: "/h.png",
    description: "",
  },
  {
    id: 3,
    title: "Korporativ müştərilər üçün təkliflər",
    image: "/h.png",
    description: "",
  },
  {
    id: 4,
    title: "Korporativ müştərilər üçün təkliflər",
    image: "/h.png",
    description: "",
  },
  {
    id: 5,
    title: "Korporativ müştərilər üçün təkliflər",
    image: "/h.png",
    description: "",
  },
];

const SpecialOffers: React.FC = () => {
  return (
    <main className="specoffers-wrapper">
      <div className="specoffers-page">
        <h2>Xüsusi təkliflər</h2>

        <div className="grid-cards">
          {SpecOfferData &&
            SpecOfferData?.length > 0 &&
            SpecOfferData?.map((data: SpecOfferType) => (
              <article key={data?.id} className="spec-offer-item">
                <div className="image">
                  <img src={data?.image || ""} alt={`${data?.id}`} title={data?.title} />
                </div>
                <div className="description-button">
                  <h1>{data?.title}</h1>
                  <div className="button-more">
                    <Link to="" className="button">
                      <span>Daha çox</span>
                      <FaAngleRight className="right" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </main>
  );
};

export default SpecialOffers;
