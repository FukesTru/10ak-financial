import { firm, confirmed, isSet } from "@/config/firm";

/**
 * Real Google reviews only. Hidden until the Google Business Profile is verified
 * AND at least one review is entered in /config/firm.ts. Never add sample reviews.
 */
export function ReviewsBlock() {
  const gbp = firm.googleBusinessProfile;
  if (!gbp.verified || !firm.reviews.length) return null;
  const disclosure = confirmed(firm.testimonialDisclosure);
  return (
    <section aria-labelledby="reviews-heading" className="bg-white py-20 on-light">
      <div className="container-site">
        <p className="eyebrow mb-3 text-burgundy">Client reviews</p>
        <h2 id="reviews-heading" className="text-3xl text-midnight sm:text-4xl">
          What clients say on Google
        </h2>
        {gbp.rating > 0 && gbp.reviewCount > 0 && (
          <p className="mt-3 text-slate">
            Rated {gbp.rating.toFixed(1)} out of 5 from {gbp.reviewCount} Google reviews.
          </p>
        )}
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {firm.reviews.map((r) => (
            <li key={`${r.author}-${r.date}`} className="rounded-2xl border border-mist bg-ivory p-6">
              <p className="text-champagne" aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(Math.round(r.rating))}
              </p>
              <blockquote className="mt-3 text-ink">“{r.text}”</blockquote>
              <p className="mt-4 text-sm font-semibold text-midnight">
                {r.author} · <span className="font-normal text-slate">Google review</span>
              </p>
            </li>
          ))}
        </ul>
        {isSet(gbp.url) && (
          <a href={gbp.url} target="_blank" rel="noopener noreferrer" className="link-body mt-8 inline-block">
            Read all reviews on Google<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        {disclosure && <p className="mt-6 max-w-3xl text-sm text-slate">{disclosure}</p>}
      </div>
    </section>
  );
}
