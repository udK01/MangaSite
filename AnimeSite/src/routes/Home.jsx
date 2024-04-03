import { Navbar, Hero, Footer } from "../components";

export default function Home({ comics }) {
  return (
    <section className="h-full bg-secondary flex flex-col items-center">
      <Navbar />
      <Hero comics={comics} />
      <Footer />
    </section>
  );
}
