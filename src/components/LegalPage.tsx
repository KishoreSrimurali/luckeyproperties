import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export function LegalPage({ title, slug, updated, intro, sections }: { title: string; slug: string; updated: string; intro: ReactNode; sections: { id: string; h: string; body: ReactNode }[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lede={intro} crumbs={[{ label: title, href: `/${slug}` }]} aside={<p className="small muted mt-s">Last updated {updated}</p>} />
      <div className="section--tight">
        <div className="wrap legal-layout">
          <nav className="toc" aria-label="Contents">
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    {i + 1}. {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="prose">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} style={i === 0 ? { marginTop: 0 } : undefined}>
                  {i + 1}. {s.h}
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
