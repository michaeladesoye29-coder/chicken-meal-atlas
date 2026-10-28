import Link from "@/components/native-link";

export default function MealNotFound() { return <main className="not-found"><span>✳</span><h1>Recipe not found.</h1><p>That meal isn’t available in the chicken collection.</p><Link className="primary-button" href="/">Browse recipes</Link></main>; }
