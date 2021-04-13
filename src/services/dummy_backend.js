import backendIMG from "../assests/backend.jpg";
import databaseIMG from "../assests/databse.png";
import frontendIMG from "../assests/frontend.png";
import angularIMG from "../assests/angular.png";
import reactIMG from "../assests/react.png";
import nodeIMG from "../assests/node.png";
import vueIMG from "../assests/vue.jpeg";
import springIMG from "../assests/spring.jpg";
import sqlIMG from "../assests/sql.jpg";
import mongoIMG from "../assests/mongo.jpeg";

export let allSkills = [
  {
    id: "BT01",
    key: "backend",
    topSkill: true,
    latestSkill: false,
    title: "NodeJs",
    image: nodeIMG,
    description: "dummy--description",
  },
  {
    id: "BT02",
    key: "backend",
    topSkill: false,
    latestSkill: true,
    title: "SpringBoot",
    image: springIMG,
    description: "dummy--description",
  },
  {
    id: "FT01",
    key: "frontend",
    topSkill: true,
    latestSkill: false,
    title: "Angular",
    image: angularIMG,
    description: "dummy--description",
  },
  {
    id: "FT02",
    key: "frontend",
    topSkill: true,
    latestSkill: false,
    title: "React",
    image: reactIMG,
    description: "dummy--description",
  },
  {
    id: "FT03",
    key: "frontend",
    title: "VueJs",
    topSkill: false,
    latestSkill: true,
    image: vueIMG,
    description: "dummy--description",
  },
  {
    id: "DT01",
    key: "database",
    title: "MongoDB",
    topSkill: false,
    latestSkill: true,
    image: mongoIMG,
    description: "dummy--description",
  },
  {
    id: "DT02",
    key: "database",
    topSkill: true,
    latestSkill: false,
    title: "SQL",
    image: sqlIMG,
    description: "dummy--description",
  },
];

export let categoryDetails = [
  {
    id: "01",
    image: backendIMG,
    title: "BackEnd Technologies",
    description: "dummy--description",
    technologies: allSkills.filter((e) => e.key === "backend"),
  },
  {
    id: "02",
    image: frontendIMG,
    title: "FrontEnd Technologies",
    description: "dummy--description",
    technologies: allSkills.filter((e) => e.key === "frontend"),
  },
  {
    id: "03",
    image: databaseIMG,
    title: "DataBase Technologies",
    description: "dummy--description",
    technologies: allSkills.filter((e) => e.key === "database"),
  },
];

export let TopSkills = allSkills.filter((e) => e.topSkill);

export let LatestSkills = allSkills.filter((e) => e.latestSkill);
