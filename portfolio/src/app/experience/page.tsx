import { Experience } from "@/interfaces/experience";
import ExperienceCard from "@/components/experience/ExperienceCard";

export const experience: Experience[] = [
  {
    id: "1",
    company: "Microsoft",
    position: "Software Engineer Intern",
    startDate: "2025",
    endDate: "Now",
    description: `Currently interning with Microsoft's M365 Substrate team, working on implementing early regression detection tools in critical workflows.
    
To be continued...`,
    company_logo:
      "https://guti.sfo3.digitaloceanspaces.com/experience/microsoft.svg",
  },
  {
    id: "2",
    company: "Oracle",
    position: "Software Engineer Intern",
    startDate: "2024",
    endDate: "2025",
    description: `During this 6 month period I worked with a team of developers to design, build and test an internal tool to ease the validation of system integrations.

I personally focused on a major visual redesign of the tool itself and the systems running it, integrating things like SSL certificates, data validation, error handling and custom visual components.

Towards the end of my internship, I had the opportunity to build a robust credential validation microservice which safeguarded critical internal integrations, thus eliminating 100% of incomplete requests across more than 30 critical services. All of this using Bash, JavaScript, Node, Python and PL/SQL.`,
    company_logo:
      "https://guti.sfo3.digitaloceanspaces.com/experience/oracle.svg",
  },
  {
    id: "3",
    company: "Meta & MLH",
    position: "Site Reliability Engineer Fellow",
    startDate: "2023",
    endDate: "2024",
    description: `During the 12-week program, I followed a structured curriculum covering core Production Engineering topics using Python, React and Flask, while attending events and workshops hosted by Meta experts.

Through hands-on experience, I built, tested, and deployed a portfolio website hosted on a VPS using Nginx and Jinja templating. I implemented automated testing with Unittest and CI/CD deployment workflows.

I worked extensively with Prometheus and Grafana for monitoring system metrics, and gained experience with MySQL for database management.

This experience provided me with comprehensive understanding of Production Engineering through practical, real-world projects.`,
    company_logo:
      "https://guti.sfo3.digitaloceanspaces.com/experience/meta.svg",
  },
  {
    id: "4",
    company: "ITESM",
    position: "Project Leader",
    startDate: "2022",
    endDate: "2023",
    description: `Led a team of 3 programmers in creating interactive web courses, managing project timelines, design decisions and user interactions. Responsible for delivering 6 five-hour courses by June 2023, focusing on providing quality educational content.

Oversaw all aspects of course development from planning to implementation, ensuring consistent design language and engaging user experience across all courses while meeting project deadlines.`,
    company_logo:
      "https://guti.sfo3.digitaloceanspaces.com/experience/itesm.svg",
  },
  {
    id: "5",
    company: "ITESM ",
    position: "Front-end Developer",
    startDate: "2022",
    endDate: "2023",
    description: `Created interactive and fun web courses, providing low-income communities a way to learn new things in an entertaining way impacting more than 40,000 people around Mexico.The site where the courses are uploaded to just surpassed 16 million visits. The courses were created using a combination of HTML, CSS, JavaScript and SCSS.
    
Worked with the organization to create a total new experience for the users, making the framework even more interactive. Updated the currently used framework and old processes to make the course creation experience a lot simpler and friendly to new programmers joining the group.`,
    company_logo:
      "https://guti.sfo3.digitaloceanspaces.com/experience/itesm.svg",
  },
];

export default function Experiences() {
  return (
    <main className="overflow-hidden w-screen h-screen pb-40">
      <div className="flex flex-col justify-center items-center gap-14 h-full mx-4">
        <h1 className="sm:text-[90px] text-[60px] font-[10] absolute top-12 left-0 right-0 m-auto text-center text-black opacity-50 w-fit mt-3 sm:mt-0">
          experience
        </h1>
        <ExperienceCard experiences={experience} />
      </div>
    </main>
  );
}
