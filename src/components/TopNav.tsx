// eslint-disable-next-line @typescript-eslint/no-unused-vars
import sunSvg from "../../public/images/icon-sun.svg";
import moonSvg from "../../public/images/icon-moon.svg";

export default function TopNav() {
  return (
    <div className="flex justify-between w-full mb-6 md:mb-12">
      <h1 className="font-josefinSansBold tracking-[0.55em] text-l-very-light-gray text-2xl md:text-4xl">
        TODO
      </h1>
      <button>
        <img
          className="w-[18px] h-[18px] md:w-7 md:h-7"
          src={moonSvg}
          alt="moon icon"
        ></img>
      </button>
    </div>
  );
}
