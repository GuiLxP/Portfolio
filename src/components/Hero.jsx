import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { MdOutlineBadge } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import PROFILE_PIC_2 from "../assets/profile-pic-2.jpeg";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Hero() {
  const [profileData, setProfileData] = useState({});

  const fetchAPI = async () => {
    try {
      const response = await axios.get(`${apiUrl}/PROFILE_DATA`);
      const data = response.data.profile_data;

      const nameData = data.find((item) => item.name);
      const taglineData = data.find((item) => item.tagline);
      const jobTitleData = data.find((item) => item.jobTitle);
      const yearsOfExperienceData = data.find((item) => item.yearsOfExperience);
      const locationData = data.find((item) => item.location);
      const emailData = data.find((item) => item.email);
      const profilePicture = data.find((item) => item.profilePicture);
      const skills = data.find((item) => item.skills);

      setProfileData((prevData) => ({
        ...prevData,
        ...nameData,
        ...taglineData,
        ...jobTitleData,
        ...yearsOfExperienceData,
        ...locationData,
        ...emailData,
        ...profilePicture,
        ...skills,
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
      <section
        className="max-w-screen-xl flex flex-col gap-14 md:flex-row md:items-center pt-16 md:pt-28 pb-20 px-6 mx-auto"
        id="hero"
      >
        <div className="flex-1 text-center md:text-left z-[1]">
          <span className="text-xs md:text-sm text-blue-200 font-thin">
            A Full Stack Developer
          </span>
          {profileData.name && (
            <h2 className="text-3xl mt-3 md:text-5xl md:mt-5">
              {profileData.name} 👋
            </h2>
          )}

          {profileData.tagline && (
            <p className="w-full text-xs font-light text-neutral-50 leading-5 my-6 lg:w-[38vw] md:text-sm md:leading-6 md:my-8">
              {profileData.tagline}
            </p>
          )}

          <button className="primary-btn">
            <Link to="contact" smooth spy>
              Contact
            </Link>
          </button>
        </div>
        <div className="flex gap-2 justify-center md:gap-3 lg:gap-5 z-[1]">
          <div className="w-[403px] bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-950 p-6">
            <div className="flex items-center justify-center">
              <img className="hero-img" src={PROFILE_PIC_2} alt="img one" />
            </div>

            <div className="bg-cardbg rounded-md text-center mt-3 p-4">
              {profileData.name && (
                <h5 className="text-sm md:text-base text-white">
                  {profileData.name}
                </h5>
              )}

              {profileData.jobTitle && (
                <p className="text-slate-500 text-xs md:font-medium mt-1">
                  {profileData.jobTitle}
                </p>
              )}

              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs mt-1">
                <HiOutlineLocationMarker />
                {profileData.location && (
                  <p className="font-medium">{profileData.location}</p>
                )}
              </div>
            </div>

            <InfoTile
              icon={<FiMail size={20} className="text-sky-400" />}
              text={profileData.email}
            />

            <InfoTile
              icon={<MdOutlineBadge size={20} className="text-sky-400" />}
              text={`${profileData.yearsOfExperience} Years of Experience`}
            />

            {profileData.skills && (
              <div className="flex items-center gap-2 flex-wrap my-3">
                {profileData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="text-[11px] bg-blue-800/30 rounded md:text-xs px-3 py-1"
                  >
                    {skill}
                    {index < profileData.skills.length - 1 && " "}
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-blue-800/30 p-2 rounded">
                <FaGithub
                  className="text-lg md:text-xl hover:cursor-pointer"
                  onClick={() =>
                    window.open("https://github.com/guilxp", "_blank")
                  }
                />
              </div>
              <div className="bg-blue-800/30 p-2 rounded">
                <FaLinkedin
                  className="text-lg md:text-xl hover:cursor-pointer"
                  onClick={() =>
                    window.open("https://www.linkedin.com/in/guilxp/", "_blank")
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ui-circle absolute top-6 md:top-10 -left-10 md:left-0"></div>
      </section>
    </>
  );
}

const InfoTile = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-4 bg-cardbg p-4 mt-3 rounded-md">
      {icon}
      <p className="text-xs md:text-sm font-normal">{text}</p>
    </div>
  );
};
