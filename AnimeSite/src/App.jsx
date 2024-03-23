import { Navbar, Hero } from "./components";

export default function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center mx-auto w-[800px]">
        <Hero />
      </div>
    </>
  );
}
