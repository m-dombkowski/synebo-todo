// eslint-disable-next-line @typescript-eslint/no-unused-vars
import sunSvg from "../../public/images/icon-sun.svg";
import moonSvg from "../../public/images/icon-moon.svg";

export default function TopNav() {
  return (
    <div className="flex justify-between w-full mb-12">
      <h1 className="font-josefinSansBold tracking-[0.5em] text-l-very-light-gray text-4xl">
        TODO
      </h1>
      <button>
        <img src={moonSvg} alt="moon icon"></img>
      </button>
    </div>
  );
}
