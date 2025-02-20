import Image from "next/image";

const baseUrl = "https://guti.sfo3.digitaloceanspaces.com/skills";

const languageImages = [
  {
    name: "C++",
    image: `C++.png`,
  },
  {
    name: "JavaScript",
    image: `JS.png`,
  },
  {
    name: "TypeScript",
    image: `ts.png`,
  },
  {
    name: "Python",
    image: `Python.png`,
  },
  {
    name: "React",
    image: `React.png`,
  },
  {
    name: "C#",
    image: `c-sharp.png`,
  },
  {
    name: "Java",
    image: `java.png`,
  },
  {
    name: "C",
    image: `c.png`,
  },
  {
    name: "Swift",
    image: `swift.png`,
  },
  {
    name: "SQL",
    image: `sql.png`,
  },
  {
    name: "Postgres",
    image: `postgres.png`,
  },
  {
    name: "Tailwind",
    image: `tailwind.png`,
  },
  {
    name: "Docker",
    image: `docker.jpg`,
  },
  {
    name: "Git",
    image: `git.png`,
  },
];

export default function LanguageScroll() {
  languageImages.sort(() => Math.random() - 0.5);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-light-bg to-transparent z-10" />
      <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-light-bg to-transparent z-10" />

      <div className="flex flex-row whitespace-nowrap animate-scroll">
        <div className="flex gap-2 items-center">
          {languageImages.map((language) => (
            <div
              key={language.name}
              className="flex flex-col items-center gap-2 min-w-[100px] inline-block"
            >
              <Image
                src={`${baseUrl}/${language.image}`}
                alt={language.name}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100%));
          }
        }

        .animate-scroll {
          animation: scroll 10s linear infinite;
          animation-direction: alternate;
        }
      `}</style>
    </div>
  );
}
