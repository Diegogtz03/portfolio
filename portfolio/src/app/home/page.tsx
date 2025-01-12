import { Girassol } from "next/font/google";
import { NavigationMenu } from "@/components/NavigationMenu/NavigationMenu";

const girassol = Girassol({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#1a1a1a] w-screen h-screen">
      <NavigationMenu />

      <div className="w-fit h-fit absolute top-[50%] right-[50%] translate-x-1/2 -translate-y-1/2">
        <p className={`${girassol.className} text-12xl text-white select-none`}>
          DIEGO
        </p>
      </div>

      {/* <LiveMusicDisplay /> */}
      {/* <EmailBtn /> */}
    </main>
  );
}
