import { ArrowDownRight, ArrowUpRight, Globe2, UtensilsCrossed } from "lucide-react";
import { ExploreGrid } from "@/components/explore-grid";
import { SiteHeader } from "@/components/site-header";
import { getMeals } from "@/lib/meals";

export const dynamic = "force-dynamic";

export default async function Home() {
  const meals = await getMeals();
  const regions = new Set(meals.map((meal) => meal.strArea).filter(Boolean));
  const featured = meals[0];
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> The chicken collection <span className="eyebrow-line" /></div>
            <h1>One ingredient.<br /><em>Endless inspiration.</em></h1>
            <p className="hero-intro">From comforting classics to bold new flavors, discover chicken recipes from kitchens around the world.</p>
            <a className="primary-button" href="#recipes">Explore the recipes <ArrowDownRight size={19} strokeWidth={2} /></a>
            <div className="hero-stats">
              <div><strong>{meals.length || "—"}</strong><span>Chicken recipes</span></div>
              <span className="stat-divider" />
              <div><strong>{regions.size || "—"}</strong><span>Global cuisines</span></div>
              <span className="stat-divider" />
              <div className="stat-curation"><Globe2 size={22} /><span>Powered by<br />TheMealDB API</span></div>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-image-frame">
              {featured ? <img src={featured.strMealThumb || ""} alt={featured.strMeal || "Featured chicken dish"} className="hero-photo" /> : <div className="image-placeholder" />}
              <span className="photo-caption">A world of flavor, one plate at a time.</span>
            </div>
            <div className="hero-stamp"><UtensilsCrossed size={22} strokeWidth={1.6} /><span>GOOD FOOD<br />GOOD MOOD</span></div>
            {featured && <div className="feature-label"><span>FEATURED DISH</span><strong>{featured.strMeal}</strong><small>{featured.strArea || "Worldwide"} cuisine <ArrowUpRight size={13} /></small></div>}
          </div>
        </section>
        <section className="collection-section" id="recipes">
          <div className="wrap collection-wrap">
            <div className="section-heading"><div><div className="eyebrow small"><span className="eyebrow-dot" /> BROWSE & DISCOVER</div><h2>The recipe <em>collection.</em></h2><p>Something delicious is just a click away.</p></div><div className="section-count"><strong>{String(meals.length).padStart(2, "0")}</strong><span>RECIPES TO EXPLORE</span></div></div>
            <ExploreGrid meals={meals} />
          </div>
        </section>
      </main>
      <footer className="site-footer"><div className="wrap footer-inner"><span>THE DAILY PLATE <span className="footer-spark">✳</span></span><p>Made for curious cooks. Recipe data from <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">TheMealDB</a>.</p><a href="#top">Back to top ↑</a></div></footer>
    </div>
  );
}
