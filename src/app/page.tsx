import SiteHeader from "@/components/site-header";
import Hero from "@/components/home/hero";
import Benefits from "@/components/home/benefits";
import Categories from "@/components/home/categories";
import Oils from "@/components/home/oils";
import Selection from "@/components/home/selection";
import Contacts from "@/components/home/contacts";


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <div className="site-container flex flex-col gap-12 py-8 md:gap-16">
        <Hero />
        <Benefits />
        <Categories />
        <Oils />
        <Selection />
        <Contacts />
      </div>
    </main>
  );
}