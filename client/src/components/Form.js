import React, { useEffect, useState } from "react";
import axios from "axios";
import "./form.css";
import Datepicker from "./Date";
import Offer from "./Offer";

function Form() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [allOffers, setAllOffers] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    title: "",
    description: "",
    type: "Precentage discount",
    discountPercent: "",
    applicableOn: "All orders",
    minOrderValue: "",
    maxDiscount: "",
    startDate: "",
    expirationDate: "Never Expires",
    numCustomers: "Limited",
    totalCustomers: "",
    usePerCustomer: "Limited",
    usagePerCustomer: "",
  });
  const [numCustomers, setNumCustomers] = useState("limited");
  const [usageCustomers, setUsageCustomers] = useState("limited");

  useEffect(() => {
    if (selectedDate) {
      setFormData({
        ...formData,
        expirationDate: selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
      // console.log(formData);
    }
  }, [selectedDate]);

  const handleNumCustomers = (e) => {
    e.target.getAttribute("name") === "limited"
      ? setNumCustomers("limited")
      : setNumCustomers("unlimited");

    e.target.getAttribute("name") === "limited"
      ? setFormData({ ...formData, numCustomers: "Limited" })
      : setFormData({ ...formData, numCustomers: "Unlimited" });
  };

  const handleUsageCustomers = (e) => {
    e.target.getAttribute("name") === "limited"
      ? setUsageCustomers("limited")
      : setUsageCustomers("unlimited");

    e.target.getAttribute("name") === "limited"
      ? setFormData({ ...formData, usePerCustomer: "Limited" })
      : setFormData({ ...formData, usePerCustomer: "Unlimited" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const res = await axios.post("/api/offers", formData);
    console.log(res.data);
    setFormData({
      code: "",
      title: "",
      description: "",
      type: "Precentage discount",
      discountPercent: "",
      applicableOn: "All orders",
      minOrderValue: "",
      maxDiscount: "",
      startDate: "",
      expirationDate: "Never Expires",
      numCustomers: "Limited",
      totalCustomers: "",
      usePerCustomer: "Limited",
      usagePerCustomer: "",
    });
    setSelectedDate(null);
    setSubmitted(!submitted);
  };

  //fetching data
  useEffect(() => {
    async function fetch() {
      console.log("effect");
      let res = await axios.get("/api/offers");
      let data = await res.data;
      setAllOffers(data);
    }
    fetch();
  }, [submitted]);

  let loadCircle = (
    <div className="productCont">
      <span className="loader"></span>
    </div>
  );

  return (
    <>
      <div className="formStyle">
        <h2>Create Offer</h2>
        <form onSubmit={handleSubmit}>
          <div className="label">
            <label htmlFor="code">Offer Code*</label>
          </div>
          <input
            id="code"
            type="text"
            name="code"
            required={true}
            maxLength={8}
            value={formData.code}
            onChange={handleChange}
          />
          <br />

          <div className="label">
            <label htmlFor="title">Offer Title*</label>
          </div>
          <input
            type="text"
            name="title"
            required={true}
            maxLength={60}
            value={formData.title}
            onChange={handleChange}
          />
          <br />

          <div className="label">
            <label htmlFor="description">Offer Description</label>
          </div>

          <input
            type="text"
            name="description"
            maxLength={140}
            value={formData.description}
            onChange={handleChange}
            style={{
              width: "500px",
            }}
          />
          <br />

          <div className="label">
            <label htmlFor="type">Offer Type*</label>
          </div>

          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Precentage discount">Precentage discount</option>
            <option value="Flat discount">Flat discount</option>
            <option value="Free Gift">Free Gift</option>
          </select>
          <br />

          <div className="label">
            <label htmlFor="discountPercent">Discount %*</label>
          </div>

          <input
            type="number"
            min={0}
            name="discountPercent"
            value={formData.discountPercent}
            onChange={handleChange}
          />
          <br />

          <div className="label">
            <label htmlFor="applicableOn">Applicable on*</label>
          </div>

          <select
            name="applicableOn"
            value={formData.applicableOn}
            onChange={handleChange}
          >
            <option value="All orders">All orders</option>
            <option value="Orders above certain amount">
              Orders above certain amount
            </option>
            <option value="Select services">Select services</option>
          </select>
          <br />

          <div className="label">
            <label htmlFor="minOrderValue">Minimum order value*</label>
          </div>

          <input
            type="number"
            min={0}
            name="minOrderValue"
            value={formData.minOrderValue}
            onChange={handleChange}
          />
          <br />

          <div className="label">
            <label htmlFor="maxDiscount">Maximum discount*</label>
          </div>

          <input
            type="number"
            min={0}
            name="maxDiscount"
            value={formData.maxDiscount}
            onChange={handleChange}
          />
          <br />

          <div className="label">
            <label htmlFor="startDate">Start Date*</label>
          </div>

          <input
            type="date"
            name="startDate"
            required={true}
            value={formData.startDate}
            onChange={handleChange}
          />

          <div className="label">
            <label htmlFor="expirationDate">Expiration Date*</label>
          </div>

          <Datepicker
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <br />

          <div className="label">
            <label htmlFor="">Number of customers</label>
          </div>

          <div className="buttoncont">
            <div
              onClick={handleNumCustomers}
              name="limited"
              className={numCustomers === "limited" ? "selected" : ""}
            >
              Limited
            </div>
            <div
              onClick={handleNumCustomers}
              name="unlimited"
              className={numCustomers === "unlimited" ? "selected" : ""}
            >
              Unimited
            </div>
          </div>

          {numCustomers === "limited" && (
            <>
              <div className="label">
                <label htmlFor="totalCustomers">Total customers</label>
              </div>

              <input
                type="text"
                name="totalCustomers"
                required={true}
                value={formData.totalCustomers}
                onChange={handleChange}
              />
            </>
          )}
          <br />

          <div className="label">
            <label htmlFor="">Offer use per customer</label>
          </div>

          <div className="buttoncont">
            <div
              onClick={handleUsageCustomers}
              name="limited"
              className={usageCustomers === "limited" ? "selected" : ""}
            >
              Limited
            </div>
            <div
              onClick={handleUsageCustomers}
              name="unlimited"
              className={usageCustomers === "unlimited" ? "selected" : ""}
            >
              Unimited
            </div>
          </div>

          {usageCustomers === "limited" && (
            <>
              <div className="label">
                <label htmlFor="usagePerCustomer">Usage per customer</label>
              </div>

              <input
                type="text"
                name="usagePerCustomer"
                required={true}
                value={formData.usagePerCustomer}
                onChange={handleChange}
              />
            </>
          )}
          <br />
          <div className="submitcont">
            <button type="submit">Create Offer</button>
          </div>
        </form>
      </div>

      {allOffers && allOffers.length == 0 ? (
        <div className="offercont">No offers created</div>
      ) : allOffers && allOffers.length > 0 ? (
        <>
          <h1
            style={{
              textAlign: "center",
              marginTop: "50px",
              borderTop: "solid",
              paddingTop: "40px",
            }}
          >
            List of offers
          </h1>
          <div className="offercont">
            {allOffers.map((offer) => (
              <Offer key={offer._id} offer={offer} />
            ))}
          </div>
        </>
      ) : (
        loadCircle
      )}
    </>
  );
}

export default Form;
