import Link from "@/components/native-link";
import { ArrowLeft, ArrowUpRight, BookOpenText, CodeXml, ListChecks, MapPin, UtensilsCrossed } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import type { Meal } from "@/lib/meals";

type Tab = "overview" | "properties" | "ingredients";

export function MealShell({ meal, tab, children }: { meal: Meal; tab: Tab; children: React.ReactNode }) {
  const base = `/meals/${meal.idMeal}`;
  const tabs = [
    { id: "overview", label: "Overview & method", icon: BookOpenText, url: base },
    { id: "properties", label: "Object properties", icon: CodeXml, url: `${base}/properties` },
    { id: "ingredients", label: "Ingredient children", icon: ListChecks, url: `${base}/ingredients` },
  ];
  return <div className="site-shell detail-shell"><SiteHeader /><main><section className="detail-heading-section"><div className="wrap"><div className="breadcrumb"><Link href="/#recipes"><ArrowLeft size={16} /> All recipes</Link><span>/</span><span>{meal.strMeal}</span></div><div className="detail-hero"><div className="detail-hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> A RECIPE FROM THE COLLECTION</div><div className="detail-tags"><span><MapPin size={14} />{meal.strArea || "Worldwide"}</span><span><UtensilsCrossed size={14} />{meal.strCategory || "Chicken"}</span></div><h1>{meal.strMeal}<span>.</span></h1><p>Explore this dish, inspect its API properties, and discover the ingredients that bring it to life.</p>{meal.strYoutube ? <a className="outline-button" href={meal.strYoutube} target="_blank" rel="noreferrer">Watch recipe video <ArrowUpRight size={17} /></a> : <Link className="outline-button" href={`${base}/ingredients`}>See ingredients <ArrowUpRight size={17} /></Link>}</div><div className="detail-image-wrap"><img src={meal.strMealThumb || ""} alt={meal.strMeal} /><div className="detail-image-badge"><span>THE DAILY<br />PLATE</span><span>✳</span></div></div></div></div></section><div className="tab-scroller"><div className="wrap tab-list" role="navigation" aria-label="Meal pages">{tabs.map(({ id, label, icon: Icon, url }) => <Link key={id} href={url} aria-current={tab === id ? "page" : undefined} className={`meal-tab ${tab === id ? "active" : ""}`}><Icon size={18} />{label}</Link>)}</div></div><section className="wrap detail-content">{children}</section><div className="wrap back-bottom"><Link href="/#recipes"><ArrowLeft size={17} /> Back to all chicken recipes</Link></div></main><footer className="site-footer"><div className="wrap footer-inner"><span>THE DAILY PLATE <span className="footer-spark">✳</span></span><p>All recipe data comes from <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">TheMealDB</a>.</p><Link href="/#recipes">Explore more recipes ↑</Link></div></footer></div>;
}
