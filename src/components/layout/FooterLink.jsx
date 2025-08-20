import Link from "next/link";

const FooterLink = ({ href, children, ariaLabel }) => (
  <Link
    href={`${href}`}
    className="text-dark fw-semibold p-2 text-decoration-none text_Dark"
    aria-label={ariaLabel}
    target="_blank"
    
  >
    {children}
  </Link>
);

export default FooterLink;
