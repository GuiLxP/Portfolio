import axios from "axios";
import React, { useEffect, useState } from "react";

import { IoMdMail } from "react-icons/io";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlineWeb } from "react-icons/md";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}/send-email`, {
        fullname,
        email,
        message,
      });
      setSuccessMessage("Email enviado com sucesso!");
      setFullname("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setSuccessMessage("Falha ao enviar o email. Por favor, tente novamente.");
    }
  };

  const [contactData, setContactData] = useState({});
  const fetchAPI = async () => {
    try {
      const response = await axios.get(`${apiUrl}/CONTACT_DATA`);
      const data = response.data.contact_data;

      const idData = data.find((item) => item.id);
      const emailData = data.find((item) => item.email);
      const phoneData = data.find((item) => item.phone);
      const websiteData = data.find((item) => item.website);

      setContactData((prevData) => ({
        ...prevData,
        ...idData,
        ...emailData,
        ...phoneData,
        ...websiteData,
      }));
    } catch (error) {
      console.error("Erro ao buscar dados da API: ", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <section className="max-w-screen-xl mx-auto px-6 pb-20" id="contact">
        <h5 className="text-primary text-2xl md:text-4xl font-semibold text-center pb-8 md:pb-14">
          Contact
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
          <div className="">
            <ContactInfoCard icon={<IoMdMail />} text={contactData.email} />
            <ContactInfoCard
              icon={<IoPhonePortraitOutline />}
              text={contactData.phone}
            />
            <ContactInfoCard
              icon={<MdOutlineWeb />}
              text={contactData.website}
            />
          </div>
          <div className="">
            <h5 className="md:hidden text-cyan-300 text-lg font-medium mt-4 pb-5">
              Contact Form
            </h5>
            <form className="flex flex-col" onSubmit={sendEmail}>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                className="input-box"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                autoComplete="off"
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows="3"
                className="input-box"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
              ></textarea>
              <button className="primary-btn">SUBMIT</button>
              {successMessage && (
                <p className="mt-2 text-green-500">{successMessage}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

const ContactInfoCard = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-5 bg-gradient-to-br from-blue-950 to-slate-900 rounded border border-blue-800/40 px-4 py-3 mb-5">
      <div className="w-10 h-10 text-xl text-cyan-300 flex items-center justify-center bg-sky-950 rounded border border-cyan-700">
        {icon}
      </div>
      <p className="text-cyan-100 text-xs md:text-sm">{text}</p>
    </div>
  );
};
