import { Navbar, Footer, Popular, Stored } from "../components";

export default function Bookmarks() {
  return (
    <section className="h-full bg-secondary flex flex-col items-center">
      <Navbar />
      <div id="body" className="flex mt-16">
        <Stored />
        <Popular />
      </div>
      <Footer />
    </section>
  );
}
