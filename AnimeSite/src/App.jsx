import { Navbar, Hero, PopularToday } from "./components";

export default function App() {
  return (
    <section className="h-screen bg-secondary flex flex-col items-center">
      <Navbar />
      <div>
        <Hero />
        <PopularToday />
      </div>
    </section>
  );
}
