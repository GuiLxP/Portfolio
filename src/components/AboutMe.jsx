import axios from "axios";
import React, { useEffect, useState } from "react";
import PROFILE_PIC_1 from "../assets/profile-pic-1.jpg";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AboutMe() {
  const [aboutData, setAboutData] = useState({});

  const fetchAPI = async () => {
    try {
      const response = await axios.get(`${apiUrl}/ABOUT_ME_DATA`);
      const data = response.data.about_data;

      const idData = data.find((item) => item.id);
      const introductionData = data.find((item) => item.introduction);
      const backgroundData = data.find((item) => item.background);
      const skillsData = data.find((item) => item.skills);
      const projectsData = data.find((item) => item.projects);
      const interestsData = data.find((item) => item.interests);
      const careerGoals = data.find((item) => item.careerGoals);
      const statsData = data.find((item) => item.stats);

      setAboutData((prevData) => ({
        ...prevData,
        ...idData,
        ...introductionData,
        ...backgroundData,
        ...skillsData,
        ...projectsData,
        ...interestsData,
        ...careerGoals,
        ...statsData,
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
        className="max-w-screen-xl px-6 mx-auto py-10 md:py-24"
        id="about"
      >
        <h5 className="text-primary text-2xl md:text-4xl font-semibold text-center md:text-left pb-10 md:pb-14">
          About Me
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
          <img
            className="w-full h-80 object-cover rounded-lg mb-4 md:mb-0"
            src={PROFILE_PIC_1}
            alt="profile pic"
          />

          <div className="col-span-2 bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 p-6">
            <p className="text-blue-50 text-xs md:text-[13px] font-normal text-justify leading-6">
              {aboutData.introduction} {aboutData.background}
              &nbsp;{aboutData.interests}
            </p>

            <br />

            <p className="text-blue-50 text-xs md:text-[13px] font-normal text-justify leading-6">
              {aboutData.skills} {aboutData.careerGoals}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {aboutData.stats && (
            <>
              <InfoCard
                count={aboutData.stats.yearsOfExperience}
                label="Years of Experience"
              />
              <InfoCard
                count={aboutData.stats.numberOfProjects}
                label="Projects Completed Successfully"
              />
              <InfoCard
                count={aboutData.stats.certificationsEarned}
                label="Certifications Earned"
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
const InfoCard = ({ label, count }) => {
  return (
    <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 px-4 md:px-6 py-3">
      <h6 className="text-primary text-xl md:text-2xl font-semibold">
        {count}
      </h6>

      <span className="text-blue-300 text-xs md:text-sm font-normal">
        {label}
      </span>
    </div>
  );
};
