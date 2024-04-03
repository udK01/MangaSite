import { Navbar, Footer, Popular, Stored } from "../components";

export default function Bookmarks({ comics, user }) {
  return (
    <section className="h-full bg-secondary flex flex-col items-center">
      <Navbar user={user} />
      <div id="body" className="flex mt-16">
        <Stored />
        <Popular comics={comics} />
      </div>
      <Footer />
    </section>
  );
}
