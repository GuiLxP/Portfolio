import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  IoLogoJavascript,
  IoLogoHtml5,
  IoLogoNodejs,
  IoLogoReact,
  IoLogoPython,
} from "react-icons/io5";
import { SiNextdotjs, SiOracle, SiPhp } from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { BsFiletypeSql } from "react-icons/bs";
import { RiTailwindCssFill } from "react-icons/ri";

const iconMap = {
  IoLogoJavaScript: IoLogoJavascript,
  IoLogoHtml5: IoLogoHtml5,
  IoLogoNodejs: IoLogoNodejs,
  IoLogoReact: IoLogoReact,
  SiNextdotjs: SiNextdotjs,
  FaGolang: FaGolang,
  BsFiletypeSql: BsFiletypeSql,
  IoLogoPython: IoLogoPython,
  SiOracle: SiOracle,
  RiTailwindCssFill: RiTailwindCssFill,
  SiPhp: SiPhp,
};

export default function Skills() {
  const [skillsData, setSkills] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:5000/SKILLS_DATA");
      const data = response.data.skills_data;
      setSkills(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API: ", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <section className="max-w-screen-xl px-6 mx-auto pb-20" id="skills">
        <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-lg border border-blue-800/40 p-4 md:p-8">
          <h5 className="text-xl font-medium mb-5">Skills</h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillsData.map((skill) => {
              const Icon = iconMap[skill.icon];
              return (
                <SkillsCard
                  key={skill.id}
                  icon={Icon}
                  iconProps={skill.iconProps}
                  title={skill.title}
                  comment={skill.comment}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

const SkillsCard = ({ icon: Icon, iconProps, title, comment }) => {
  return (
    <div className="bg-slate-900 rounded border border-blue-900 p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-base">{title}</p>
        {Icon && <Icon className="text-primary text-3xl" {...iconProps} />}
      </div>
      <p className="text-xs font-light leading-5 opacity-80">{comment}</p>
    </div>
  );
};
