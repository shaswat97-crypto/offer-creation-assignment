import React from "react";
import "./offer.css";
function Offer({ offer }) {
  return (
    <div className="o-cont">
      <div className="o-base">
        <button>{offer.code}</button>
        <h1>
          get <span>{offer.discountPercent}</span> % off
        </h1>
        <h2>On {offer.applicableOn} salon & spa services</h2>
        <h3>Valid till {offer.expirationDate}</h3>
        <h4>Anjana Beauty Salon</h4>
        <h4>23, Sector 3, Rajiv Nagar, Raigad</h4>
    </div>
    </div>
  );
}

export default Offer;
