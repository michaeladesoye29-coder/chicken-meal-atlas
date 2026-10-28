import Link from "@/components/native-link";
import { ArrowUpRight, ChefHat } from "lucide-react";

export function SiteHeader() {
  return <header className="site-header" id="top"><div className="wrap header-inner"><Link href="/" className="brand" aria-label="The Daily Plate homepage"><span className="brand-icon"><ChefHat size={24} strokeWidth={1.8} /></span><span className="brand-wordmark"><strong>THE DAILY PLATE</strong><small>THE CHICKEN EDITION</small></span></Link><nav className="header-nav" aria-label="Main navigation"><Link href="/#recipes">Discover recipes</Link><a href="https://www.themealdb.com/api/json/v1/1/search.php?s=chicken" target="_blank" rel="noreferrer">View API <ArrowUpRight size={16} /></a></nav></div></header>;
}
