import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utilities/api"
export default function AddContact() {
  const [emailPositionButton, setEmailPositionButton] = useState(false);
  const [numberPositionButton, setNumberPositionButton] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    address: "",
    city: "",
    country: "",
    emails: [""],
    phone_numbers: [""],
  });

  const navigate = useNavigate();

  const handleChange = (e, index, field) => {
    const { value } = e.target;
    if (index !== null) {
      setFormData((prevFormData) => {
        const newFormData = { ...prevFormData };
        newFormData[field][index] = value;
        return newFormData;
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: value,
      }));
    }
  };
  const handleAddField = (field) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };
      newFormData[field] = [...newFormData[field], ""];
      if (field === "emails" ) setEmailPositionButton(true);
      else if (field === "phone_numbers" &&  newFormData[field].length > 1) setNumberPositionButton(true);
      return newFormData;
    });
  };

  const handleRemoveField = (index, field) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };
      newFormData[field] = newFormData[field].filter((_, idx) => idx !== index);
      if (field === "emails"&& newFormData[field].length === 1 ) setEmailPositionButton(false);
      else if (field === "phone_numbers" && newFormData[field].length === 1) setNumberPositionButton(false);
      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to API
      const response = await api.post("/contacts", formData);
      console.log("Form submitted successfully:", response.data);
      // After submitting the form, navigate to another page
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-2/4 m-9">
        <div className="flex justify-start w-full mb-10">
          {" "}
          <h2 className="text-3xl font-bold mb-4">Register new contact</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <div className="flex flex-col">
            <label>Name:</label>{" "}
            <input
              type="text"
              name="name"
              className="border rounded flex w-full pl-2 pt-1 pb-1 pr-2"
              value={formData.name}
              onChange={(e) => handleChange(e, null, "name")}
              placeholder="Enter the Name"
            />
          </div>
          <div className="flex flex-col">
            {" "}
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              className="border rounded flex w-full pl-2 pt-1 pb-1 pr-2"
              value={formData.last_name}
              onChange={(e) => handleChange(e, null, "last_name")}
              placeholder="Enter Last Name"
            />
          </div>
          <div className="flex flex-col">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              className="border flex w-full rounded pl-2 pt-1 pb-1 pr-2"
              value={formData.address}
              onChange={(e) => handleChange(e, null, "address")}
              placeholder="Enter Address"
            />
          </div>
          <div className="flex flex-col">
            <label>City:</label>{" "}
            <input
              type="text"
              name="city"
              className="border flex w-full rounded pl-2 pt-1 pb-1 pr-2"
              value={formData.city}
              onChange={(e) => handleChange(e, null, "city")}
              placeholder="Enter City"
            />
          </div>
          <div className="flex flex-col">
            {" "}
            <label>Country:</label>{" "}
            <input
              type="text"
              name="country"
              className="border flex w-full rounded pl-2 pt-1 pb-1 pr-2"
              value={formData.country}
              onChange={(e) => handleChange(e, null, "country")}
              placeholder="Enter Country"
            />
          </div>
          <div className="flex flex-col">
            <label>Emails: </label>
            <div
              className={
                (emailPositionButton ? "flex-col flex" : "flex flex-row") + " gap-3"
              }
            >
              {formData.emails.map((email, index) => (
                <div key={index} className="flex w-full gap-3 items-center">
                  <input
                    type="text"
                    value={email}
                    className="border flex w-full rounded pl-2 pt-1 pb-1 pr-2"
                    onChange={(e) => handleChange(e, index, "emails")}
                    placeholder="Enter the Email"
                  />
                  {formData.emails.length > 1 && index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index, "emails")} className=" border-2 border-blue-600 rounded-lg pl-2 pr-2 pt-1 pb-1 text-blue-600 "
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button type="button" onClick={() => handleAddField("emails")} className="bg-blue-600 rounded-lg pl-4 pr-4 pt-1 pb-1 text-white">
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label>Phone Numbers:</label>
            <div
              className={
                (numberPositionButton ? "flex-col flex" : "flex flex-row") + " gap-3"
              }
            >
              {formData.phone_numbers.map((number, index) => (
                <div key={index} className="flex w-full gap-3 items-center">
                  <input
                    type="text"
                    value={number}
                    className="border flex w-full rounded pl-2 pt-1 pb-1 pr-2"
                    onChange={(e) => handleChange(e, index, "phone_numbers")}
                    placeholder="Enter the Number"
                  />
                  {formData.phone_numbers.length > 1 && index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index, "phone_numbers")} className=" border-2 border-blue-600 rounded-lg pl-2 pr-2 pt-1 pb-1 text-blue-600 "
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleAddField("phone_numbers")}
                  className="bg-blue-600 rounded-lg pl-4 pr-4 pt-1 pb-1  text-white"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <button type="submit" className="bg-blue-600 rounded-lg pl-4 pr-4 pt-1 pb-1 mt-12  text-white">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
