export function BrandLockup({
  size = "md",
  invert = false,
}: {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  return (
    <div
      className={`brand-lockup brand-lockup-${size}${invert ? " is-invert" : ""}`}
    >
      <img
        src="https://stayrelevant.globant.com/wp-content/uploads/2022/03/logo-globant.svg"
        alt="Globant"
        className="brand-customer"
        width="512"
        height="100"
      />
      <span className="brand-times" aria-hidden>
        ×
      </span>
      <img src="/brand/spacexai.svg" alt="SpaceXAI" className="brand-sxai" />
    </div>
  );
}
