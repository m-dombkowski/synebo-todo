import HeaderDesktop from "../../public/images/bg-desktop-light.jpg";

export default function Header() {
  return (
    <div className="fixed top-0 z-[-1]">
      <img
        src={HeaderDesktop}
        alt="picture of mountains on a purple blue gradient background"
      />
    </div>
  );
}
