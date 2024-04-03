import { Navbar, Hero, Footer } from "../components";

export default function Home({ comics, user, view }) {
  return (
    <section className="h-full bg-secondary flex flex-col items-center">
      <Navbar user={user} />
      <Hero comics={comics} view={view} />
      <Footer />
    </section>
  );
}
