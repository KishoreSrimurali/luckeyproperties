import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { Arrow } from "@/components/Icons";
import { ContactSection, Expertise, FeaturedProperties, Locations, Story, Team, Testimonials, WhyDubai } from "@/components/Sections";
import { Skyline } from "@/components/Skyline";
import { mediaFile, media } from "@/lib/media";

export const metadata = {
  alternates: { canonical: "/" },
};

function HeroMedia() {
  const video = mediaFile("/media/hero/hero.mp4");
  const poster = media("hero/hero");
  if (video) {
    return (
      <div className="hero__media">
        <video autoPlay muted loop playsInline poster={poster ?? undefined} aria-hidden="true">
          <source src={video} type="video/mp4" />
        </video>
      </div>
    );
  }
  if (poster) {
    return (
      <div className="hero__media">
        <Image src={poster} alt="" fill priority sizes="100vw" />
      </div>
    );
  }
  return (
    <div className="hero__art">
      <Skyline />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <HeroMedia />
        <div className="wrap hero__content">
          <p className="eyebrow">{site.tagline}</p>
          <h1 className="display hero__title mt-s" id="hero-title">
            A better way to navigate <em>Dubai</em> real estate.
          </h1>
          <div className="hero__row">
            <p className="hero__copy">Explore Dubai property opportunities with guidance tailored to your goals, budget, and plans for the future.</p>
            <div className="hero__ctas">
              <Link className="btn btn--light" href="/properties">
                Explore Properties <Arrow />
              </Link>
              <Link className="btn btn--ghost" href="#enquire">
                Speak With Our Team
              </Link>
            </div>
          </div>
          <div className="hero__meta">
            <span>Business Bay, Dubai</span>
            <span>Buy · Sell · Invest · Manage</span>
            <a href="#enquire">Enquiries from India welcome</a>
          </div>
        </div>
      </section>
      <FeaturedProperties />
      <Expertise />
      <WhyDubai />
      <Story />
      <Locations />
      <Team />
      <Testimonials />
      <ContactSection />
    </>
  );
}
