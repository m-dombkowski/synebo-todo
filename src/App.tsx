import Header from "./components/Header";
import TopNav from "./components/TopNav";

function App() {
  return (
    <div className="max-w-[1440px] w-full flex justify-center items-center m-auto">
      <Header />
      <div className="md:w-[550px] flex justify-between mt-20">
        <TopNav />
      </div>
    </div>
  );
}

export default App;
