import React, { useEffect, useState } from "react";
import api from "../utilities/api";
import { Link } from "react-router-dom";
export default function PhoneBook() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDeleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  

  return (
    <div>
      
      <div className="container mx-auto px-4 py-2 mb-11">
        <div className="flex flex-row justify-between mb-20">
          {" "}
          <h1 className="text-3xl font-bold mb-4">Contacts</h1>
          
          <Link to="/add-contact" className="flex items-center bg-blue-600 rounded-lg pl-4 pr-4 mt-1 mb-1 text-white">Add Contact</Link>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white text-center">
              <th className="px-2 py-3 border-2 border-gray-300">Name</th>
              <th className="px-2 py-3 border-2 border-gray-300">Last Name</th>
              <th className="px-2 py-3 border-2 border-gray-300">Address</th>
              <th className="px-2 py-3 border-2 border-gray-300">City</th>
              <th className="px-2 py-3 border-2 border-gray-300">Country</th>
              <th className="px-2 py-3 border-2 border-gray-300">Email</th>
              <th className="px-2 py-3 border-2 border-gray-300">Number</th>
              <th className="px-2 py-3 border-2 border-gray-300">Edit</th>
              <th className="px-2 py-3 border-2 border-gray-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr
                key={contact.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-2 py-3 border-2 border-gray-300 text-center">
                  {contact.name}
                </td>
                <td className="px-2 py-3 border-2 border-gray-300 text-center">
                  {contact.last_name}
                </td>
                <td className="px-2 py-3 border-2 border-gray-300 text-center">
                  {contact.address}
                </td>
                <td className="px-2 py-3 border-2 border-gray-300 text-center">
                  {contact.city}
                </td>
                <td className="px-2 py-3 border-2 border-gray-300 text-center">
                  {contact.country}
                </td>
                <td className="px-2 py-3 border-2 border-gray-300 text-center">
                  <ul>
                    {contact.emails &&
                      contact.emails.map((email) => (
                        <li key={email.id}>{email.email}</li>
                      ))}
                  </ul>
                </td>
                <td className="px-2 py-3 border-2 border-gray-300 text-center">
                  <ul>
                    {contact.phone_numbers &&
                      contact.phone_numbers.map((phoneNumber) => (
                        <li key={phoneNumber.id}>{phoneNumber.phone_number}</li>
                      ))}
                  </ul>
                </td>
                <td className="px-2 py-3 border-2 border-gray-300 text-center">
                  <Link to={`/edit-contact/${contact.id}`} className="text-white hover:text-green-800 bg-green-700 pt-2 pb-2 pl-3 pr-3 rounded-md">
                    Edit
                  </Link>
                </td>
                <td className="px-2 py-3 border-2 border-gray-300 text-center">
                  <button onClick={() => handleDeleteContact(contact.id)} className="text-white hover:text-red-800 bg-red-600 pt-2 pb-2 pl-3 pr-3 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
