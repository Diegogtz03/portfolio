import { ProjectType, SimplifiedProjectType } from "@/interfaces/projects";

export const projects: ProjectType[] = [
  // Know-X
  {
    id: "knowx",
    name: "Know-X",
    date: "March 2024",
    tag: "website",
    subtitle: "AI web research and solution comparison tool",
    accentColor: "#9A68CB",
    icon: "icon.svg",
    backdrop: "backdrop.png",
    images: [
      {
        src: "2.png",
        width: 2300,
        height: 900,
        aspect_ratio: "13 / 9"
      },
      {
        src: "3.png",
        width: 2300,
        height: 900,
        aspect_ratio: "13 / 9"
      },
      {
        src: "4.png",
        width: 2300,
        height: 900,
        aspect_ratio: "13 / 9"
      },
      {
        src: "5.png",
        width: 2300,
        height: 900,
        aspect_ratio: "13 / 9"
      },
      {
        src: "6.png",
        width: 2300,
        height: 900,
        aspect_ratio: "13 / 9"
      },
    ],
    links: [
      { 
        name: "site", 
        link: "https://dnutds2j3jjcr.cloudfront.net/auth"
      }, 
      { 
        name: "repo",
        link: "https://github.com/wizelineacademy/itesm-socioformador-feb-jun-2024-Croods"
      }
    ],
    description:
      `KnowX is a web application that allows users to search and compare information about specific topics. The application uses various web scraping methods and AI to search and analyze relevant information.Users can view and compare results to form better opinions about products and/or services.

      The website was build as part of a project trying to understand the limitations of AI and the use it could be given inside a well established company structure. We found that much of the time consumption came from the research soem people on the team had to do before proceeding with a project.  Because of this, we decided to build this that would help at least reduce the time in gathering sources to reasearch.

      I personally worked on both the front-end and AI client that fed the website. It was really interesting to observe the behaviour of the LLM's with the information that was fed to it. I remember struggling to find the correct structure to feed the context in when scraping the websites, given that every so small changing structure would affect the overall quality of the answer.`,
    shown: true,
  },
  // Kofy
  {
    id: "kofy",
    name: "Kofy",
    date: "November 2023",
    tag: "iOS app",
    subtitle: "iOS App for inclussion",
    accentColor: "#E186DB",
    icon: "icon.svg",
    backdrop: "backdrop.png",
    images: [
      {
        src: "1.png",
        width: 1290,
        height: 2796,
        aspect_ratio: " 0.46"
      },
      {
        src: "2.png",
        width: 1290,
        height: 2796,
        aspect_ratio: "0.46"
      },
      {
        src: "3.png",
        width: 1290,
        height: 2796,
        aspect_ratio: "0.46"
      },
      {
        src: "4.png",
        width: 1290,
        height: 2796,
        aspect_ratio: "0.46"
      },
    ],
    links: [
      { 
        name: "app", 
        link: "https://apps.apple.com/mx/app/kofy-dilo-en-se%C3%B1as/id6476424346"
      }, 
      { 
        name: "repo",
        link: "https://github.com/Diegogtz03/kofy-app"
      },
      {
        name: "note",
        link: "https://www.linkedin.com/posts/ingenieriaycienciastec_findingtheway-kofy-diloenseaehas-ugcPost-7275941318411857921-0V3W"
      }
    ],
    description: `
      During one of my semesters, a team and I interviewd a non-profit organization with the goal of finding a struggle that we as students could help build a solution for. This organization named "Dilo en señas" helps deaf children find an eduction seeking at the same time solutions for the deaf community in general. Through multiple interviews, we found that one of the biggest struggles was within communication inside the medical industry. This is where Kofy comes in.

      Kofy is an AI iOS app for inclusion designed with deaf people in mind to bridge the communication gap  within the medical industry. During medical consultations, patients can use the app's speech-to-text and text-to-speech features to maintain clear two-way communication with their healthcare providers. 
      
      To ensure nothing is missed during these important visits, the app leverages OpenAI's API to create comprehensive summaries of each session, which doctors can review and approve for accuracy. When prescriptions are given,  the app's generative AI capabilities can scan and break down complex medical instructions into clear, understandable summaries, while also suggesting appropriate reminder schedules. To help patients better understand medical procedures, the app uses machine learning to recognize medical instruments in real-time, providing detailed information cards that explain their purpose using sign language. Finally, to support ongoing treatment, Kofy includes a medication management system that helps users stay on track with their prescribed medicine intake through timely reminders.
    `,
    shown: true,
  },
  // Brain-Pods
  {
    id: "brain-pods",
    name: "Brain Pods",
    date: "October 2025",
    tag: "website",
    subtitle: "AI powered education kahoot style website",
    accentColor: "#EB7FD0",
    icon: "icon.svg",
    backdrop: "backdrop.png",
    images: [
      {
        src: "1.png",
        width: 1200,
        height: 800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "2.png",
        width: 1200,
        height: 800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "3.png",
        width: 1200,
        height: 800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "4.png",
        width: 1200,
        height: 800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "5.png",
        width: 1200,
        height: 800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "6.png",
        width: 1200,
        height: 800,
        aspect_ratio: "13 / 9"
      },
    ],
    links: [
      { 
        name: "devpost", 
        link: "https://devpost.com/software/brain-pods"
      }, 
      { 
        name: "repo",
        link: "https://github.com/franciscoerramuspe/brain-pods"
      }
    ],
    description: `
      Brain Pods is a project created @ CalHacks 11.0. This platform is an educational website similar to kahoot. It was created as a way to help students study for their upcoming exams using tools like AI to gamify the experience.

      During this hackaton, we found that many students, especially with the current situation of attention span, struggle to find a way to study that is entertaining but also information packed. Given this situation, many also struggle to prepare any kind of study guide that could help them. This is the reason we created "Brain Pods".

      Brain Pods allows people to create "pods", these are rooms that are filled with content at the moment of creation. Students can upload things like the slides for the course, PDF's, notes and other files to give the session a context of what the topic of study is about. Once these "pods" are created, students can share the "pod" code with friends or make the "pod" public so anyone from around the world could join.

      When joining a pod, it would be a similar experience to Google Meet, where you can see all of the people in the "pod" and chat with them. However, when beginning the seesion, a popup appears like "Kahoot" with AI generated questions that the pod has a certain time to answer. Once everyone has answered, the same AI gives feedback on how everyone answered the questions. For a future version, we believe that we could add things like a white board and other types of games that could make the experience a lot more fun! 
    `,
    shown: true,
  },
  // GT-Dent
  {
    id: "gt-dent",
    name: "GT-Dent",
    date: "September 2025",
    tag: "website",
    subtitle: "Private Dental Patient Record Website",
    accentColor: "#3DA0D2",
    icon: "icon.png",
    backdrop: "backdrop.png",
    images: [
      {
        src: "1.png",
        width: 1600,
        height: 1100,
        aspect_ratio: "13 / 9"
      },
      {
        src: "2.png",
        width: 1600,
        height: 1100,
        aspect_ratio: "13 / 9"
      },
      {
        src: "3.png",
        width: 1600,
        height: 1100,
        aspect_ratio: "13 / 9"
      },
      {
        src: "4.png",
        width: 1600,
        height: 1100,
        aspect_ratio: "13 / 9"
      },
      {
        src: "5.png",
        width: 1600,
        height: 1100,
        aspect_ratio: "13 / 9"
      },
      {
        src: "6.png",
        width: 1600,
        height: 1100,
        aspect_ratio: "13 / 9"
      },
    ],
    links: [
      {
        name: "repo",
        link: "https://github.com/Diegogtz03/GT-Dent-V2"
      },
      {
        name: "old repo",
        link: "https://github.com/Diegogtz03/GT-DENT"
      }
    ],
    description: `
      GT-DENT is a dental patient records application that I developed to help digitize and streamline my parents' dental office operations. The project began as a Java desktop application, but I later decided to migrate it to a web-based platform to make updates and maintenance easier.

      The application was designed specifically for dental practices, with custom formats and fields tailored to dental record-keeping. One of its key goals was to reduce paper waste by transitioning all patient records to a digital format. The system includes smart features like duplicate patient detection and automatic save functionality to prevent data loss.

      To ensure ease of use, I implemented a robust search system that allows staff to quickly find patient records by either name or date of birth. All sensitive patient data is securely stored on a local RAID NAS setup for redundancy and data protection. The application also includes a prescription system that allows dentists to generate and print custom prescriptions directly from the platform.

      This project taught me a lot about building practical, industry-specific solutions and the importance of user-friendly design in healthcare applications. The migration from Java to web technologies also gave me valuable experience in modernizing legacy applications while maintaining core functionality.

      The RAID NAS setup was super fun to build! I love working with physical stuff as well, so having something of both worlds was trully amazing! :D
    `,
    shown: true,
  },
  // Dots
  {
    id: "dots",
    name: "Dots",
    date: "Coming Soon...",
    tag: "hardware",
    subtitle: "Flip dot display and control software powered by AI",
    accentColor: "#F87518",
    icon: "icon.svg",
    backdrop: "backdrop.png",
    images: [],
    links: [],
    description: `
      This is a project that I'm still planning and budgeting for LOL! But I've always loved physical and tangible tech, AKA hardware. I recently stumbled on something called a "flip-dot", which surprisingly is a very old technology but looks SUPER COOL! I like to think about them as old-school LED's LOL, it's essentially a two-state device which flips a tiny magnetic disc into two different positions. When it's magnetized to one pole it's white and when magnetized to the other it's black.

      Researching a bit, I found that other people had already built something like this and gave me the inspiration to give it a shot! My plan is to have a multi-modal assistant, meaning havign something that changes to my needs. At some point it can be a clock, it could be artwork, a spotify player, an AI assistant, and so many other things!

      I want to open source this for other builders but I have yet to start! But soon!
    `,
    shown: true,
  },
  // Clip-it
  {
    id: "clip-it",
    name: "Clip-it",
    date: "January 2024",
    tag: "iOS app",
    subtitle: "...",
    accentColor: "#F87518",
    icon: "icon.svg",
    backdrop: "backdrop.png",
    images: [
      {
        src:"1.png", 
        width: 900, 
        height: 1900, 
        aspect_ratio: "8 / 18"
      },
      {
        src:"2.png", 
        width: 900, 
        height: 1900, 
        aspect_ratio: "8 / 16"
      },
      {
        src:"3.png", 
        width: 900, 
        height: 1900, 
        aspect_ratio: "8 / 16"
      },
      {
        src:"4.png", 
        width: 900, 
        height: 1900, 
        aspect_ratio: "8 / 16"
      },
      {
        src:"5.png", 
        width: 900, 
        height: 1900,  
        aspect_ratio: "8 / 16"
      },
      {
        src:"6.png", 
        width: 900, 
        height: 1900,  
        aspect_ratio: "8 / 16"
      },
    ],
    links: [
      {
        name: "repo",
        link: "https://github.com/Diegogtz03/clip-it"
      },
      {
        name: "x post",
        link: "https://x.com/diego_trevin/status/1762341139690959050"
      }
    ],
    description: `
      Clip-it was my 2024 WWDC student challenge submission. Inspired by my grandfather's Alzheimer's diagnosis, I created this iPhone app to help people cherish and preserve their daily moments and memories. The app allows users to quickly capture photos and audio recordings with annotations - whether it's a great song heard at the mall or a tasty snack at a friend's house. Built specifically for iOS, Clip-it serves as a reminder to value life's small but meaningful experiences, while honoring those affected by memory loss conditions. The app features an intuitive interface for recording, annotating and reviewing memories, though some features like photo capture require physical device testing rather than simulation.

      I'm a fan of music, so having something that I can quickly grab and capture an audio is an amazing feature to me. Compared to things like Shazam, this allows to to have a place to re-listen to the recording, giving you an opportunity to maybe find the song. The amount of times this has happend to me is unbelievable!
    `,
    shown: true,
  },
  // OCAI
  {
    id: "ocai",
    name: "OCAI",
    date: "September 2024",
    tag: "Hackathon",
    subtitle: "...",
    accentColor: "#EA1B22",
    icon: "icon.svg",
    backdrop: "backdrop.jpeg",
    images: [
      {
        src: "1.jpg",
        width: 1600,
        height: 1100,
        aspect_ratio: "13 / 9"
      },
      {
        src: "2.jpg",
        width: 1600,
        height: 1100,
        aspect_ratio: "13 / 9"
      },
    ],
    links: [
      {
        name: "repo",
        link: "https://github.com/Diegogtz03/OCAI"
      }
    ],
    description: `
      Winner of regional Oracle's internal MadHacks 2024 Hackathon!

      A team and I built OCAI as an integral solution to a problem many cloud solutions have. We found that most people decide to stay with some clouds due to their nice interfaces and clear undestranding of things like prices and the solution being offered with a service.

      We found that people struggled to find information within OCI, which is where OCAI came in. This was a service integrated with LLM's that automatically updated itself with the latest OCI information up-to-date. We used scraping technologies and language parsers to come up with a simple to read format for LLM's. Given this, it was simple enough to integrate a chatbot within a mock page of OCI where this chatbot can offer a full plan and budget of the items needed to build the described solution and the estimated cost for it.
    `,
    shown: true,
  },
  // PC-Power
  {
    id: "pc-power",
    name: "PC-Power",
    date: "June 2024",
    tag: "hardware",
    subtitle: "ESP32 powered PC power monitor and switch",
    accentColor: "#BCBCBC",
    icon: "icon.svg",
    backdrop: "backdrop.jpeg",
    images: [
      {
        src: "1.png",
        width: 1600,
        height: 1100,
        aspect_ratio: "14 / 8"
      },
      {
        src: "2.jpg",
        width: 1400,
        height: 1200,
        aspect_ratio: "13 / 13"
      },
      {
        src: "3.jpg",
        width: 1400,
        height: 1200,
        aspect_ratio: "13 / 13"
      },
    ],
    links: [
      {
        name: "repo",
        link: "https://github.com/Diegogtz03/PCPower"
      },
      {
        name: "esp repo",
        link: "https://github.com/Diegogtz03/ESP-PC"
      },
    ],
    description: `
      PC-Power was a really fun project built in a couple of days due to a storm.

      I was just a few weeks out of leaving my home for 6 months for my internship, which meant saying goodbye to my PC for those 6 months. Denying this, I thought to myself "there has to be a solution", which is where this project came in. I knew there was ways for me to connect remotely to my PC, but that meant having my PC 24/7 on which I didn't specifically want.

      I instead decided to "hack" my PC by integrating a small ESP based circuit that fit in the middle of my physical button. This combined with a secure websocket server allowed me at any remote location to communicate with this small circuit in my PC. When sent a signal to turn on, a small "octocoupler" turned on for a few milliseconds, simulating a signal generated from pressing the button.

      This just meant I had to configure the remote client to connect when the PC turned on and BOOM! I can now access my PC from anywhere in the world without relying on someone :)
    `,
    shown: true,
  },
  // xauto
  {
    id: "xauto",
    name: "Xauto",
    date: "November 2024",
    tag: "automation",
    subtitle: "File saving mail automation for dental office",
    accentColor: "#D13840",
    icon: "icon.svg",
    backdrop: "backdrop.png",
    images: [],
    links: [],
    description: `
      This project is sort of part 2 of GT-Dent. My parents also started struggling with handling the X-Rays that arrived at their medical office. This process was still done with CD's and some rare times by email. As time passed by, this started to become a problem because finding someone's X-rays meant having to look through hundreds of CD's.

      Given that I had already installed a private NAS at the office, I decided to implement a fairly simple but effective automation. Leveraged by google's gmail API, I created a hook that gets called every time an email is received. When this happens and the email is part of the allowed emails, the contents get parsed, the attachments downloaded and uploaded to a folder with the patients' name separated by year and month folders. This reduced the search process to just a few seconds.
    `,
    shown: true,
  },
  // tms
  {
    id: "tms",
    name: "TMS",
    date: "June 2023",
    tag: "website",
    subtitle: "Personalized corporate trainee management system",
    accentColor: "#124C92",
    icon: "icon.svg",
    backdrop: "backdrop.png",
    images: [
      {
        src: "1.png",
        width: 2600,
        height: 1800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "2.png",
        width: 2600,
        height: 1800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "3.png",
        width: 2500,
        height: 1700,
        aspect_ratio: "13 / 9"
      },
      {
        src: "4.png",
        width: 2600,
        height: 1800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "5.png",
        width: 2600,
        height: 1800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "6.png",
        width: 2600,
        height: 1800,
        aspect_ratio: "13 / 9"
      },
      {
        src: "7.png",
        width: 2600,
        height: 1800,
        aspect_ratio: "13 / 9"
      },
    ],
    links: [
      {
        name: "repo",
        link: "https://github.com/Diegogtz03/TMS"
      },
    ],
    description: `
      TMS is a Trainee Management System developed for an undisclosed company in Mexico. It was specifically built to help streamline the process of getting new interns adapted to the company while tracking their progress. One of the main problems was that the content was extremely slow which meant a lot of the trainees didn't finish their training before turning into full-time employees.

      To fix this, we made a webpage (Next JS) that allowed the admins to register these trainees and at the same time follow their progress in the courses. This allowed the HR team to ditch their old excel solution to a more modern and easy to use one. For the Trainees, we designed an integrated game made with Unity that followed their progress. So depending on their advancement, they could collect items that would later be exchangable for company merch.
    `,
    shown: true,
  },
  // Kronos
  {
    id: "kronos",
    name: "Kronos",
    date: "December 2022",
    tag: "Discord Bot",
    subtitle: "Personal music bot for discord servers",
    accentColor: "#FF8011",
    icon: "icon.svg",
    backdrop: "backdrop.png",
    images: [
      {
        src: "1.png",
        width: 1204,
        height: 1560,
        aspect_ratio: "9 / 13"
      },
      {
        src: "2.png",
        width: 1042,
        height: 742,
        aspect_ratio: "13 / 9"
      },
      {
        src: "3.png",
        width: 812,
        height: 348,
        aspect_ratio: "13 / 6"
      },
    ],
    links: [],
    description: `
      Kronos was just a fun little side project. Being a music lover, I always try to find ways to incorporate tech with music. So in this case, I decided to bring back to life one of the most loved bots in discord that allowed friends to enjoy music together.

      I quickly built this using some previous knowledge I had on scraping the music from Youtube (FOR PERSONAL USE HAHAHA). While this seemed easy at first, it was really fun and challenging to work with limiting compute resources on where I was hosting the bot to download the music and keep a queue, while also not completely filling up the memory and compute power of the tiny machine.
    `,
    shown: true,
  },
]

export function getSimplifiedProjectList(): SimplifiedProjectType[] {
  return projects.filter((project) => project.shown);
}

export async function getProject(id: string): Promise<ProjectType | null> {
  const res = projects.filter((projects) => projects.id === id)

  if (res.length == 1) {
    return res[0]
  }

  return null
}