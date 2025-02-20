import YearsTag from "./YearsTag";
import FunDisplay from "./FunDisplay";

export default function HomeText() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 backdrop-blur-sm p-5 rounded-2xl w-max">
      <div className="flex flex-row items-center justify-center gap-2">
        <h1 className="text-4xl font-thin">I'm Guti, a </h1>
        <YearsTag />
      </div>
      <FunDisplay />
    </div>
  );
}
