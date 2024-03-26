import { Navbar, Hero } from "./components";

export default function App() {
  return (
    <section className="h-screen bg-secondary flex flex-col items-center">
      <Navbar />
      <div className="w-[800px]">
        <Hero />
      </div>
    </section>
  );
}
