import { Navbar, Hero, Footer } from "../components";

export default function Home({ comics, user, view, mangaID, chapterNumber }) {
  return (
    <section className="h-full bg-secondary flex flex-col items-center">
      <Navbar comics={comics} user={user} />
      <Hero
        comics={comics}
        view={view}
        mangaID={mangaID}
        chapterNumber={chapterNumber}
      />
      <Footer />
    </section>
  );
}
