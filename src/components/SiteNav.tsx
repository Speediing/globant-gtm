import { BrandLockup } from "./BrandLockup";

export function SiteNav() {
  return (
    <header className="site-header site-header-over">
      <a href="#top" className="nav-brand">
        <BrandLockup size="sm" />
      </a>
      <nav className="header-actions" aria-label="On this page">
        <a className="text-button" href="#jobs">
          Scenes
        </a>
        <a className="text-button" href="#roster">
          Agent fleet
        </a>
        <a className="text-button" href="#compare">
          Compare
        </a>
        <a className="text-button" href="#testimonials">
          Proof
        </a>
      </nav>
    </header>
  );
}
