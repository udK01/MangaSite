import { Navbar, Hero, Footer } from "../components";

export default function Home({ comics, user, view, mangaID, chapterID }) {
  return (
    <section className="h-full bg-secondary flex flex-col items-center">
      {console.log(chapterID)}
      <Navbar user={user} />
      <Hero
        comics={comics}
        view={view}
        mangaID={mangaID}
        chapterID={chapterID}
      />
      <Footer />
    </section>
  );
}
