import Head from "next/head";

// Defining constants outside the component to avoid re-declaration on re-renders
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap";
const BOOTSTRAP_ICONS_URL =
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
const GTAG_SRC = "https://www.googletagmanager.com/gtag/js?id=G-WK6D3JZL9S";

export default function CustomHead({
  title,
  customTitle,
  description,
  url,
  imageUrl = "/rakaya.png",
  keywords = "اتقان الرقمية, جودة التشغيل, عمر خان, ركايا للاستشارات الادارية, شركة ركايا, ركايا البديعة, وظائف ركايا, ركايا استوديو",
}) {
  const fullTitle = customTitle || `ركايا  ${title ? `- ${title}` : ""}`;
  const canonicalUrl = "https://www.rakaya.sa/";

  // Schema.org JSON-LD structure for SEO
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    url,
    name: title,
    alternateName: "Rakaya",
    image: imageUrl,
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content="ar" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rakaya" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      <link rel="stylesheet" href={BOOTSTRAP_ICONS_URL} />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      {/* <script async src={GTAG_SRC}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WK6D3JZL9S');
        `,
        }}
      /> */}
    </Head>
  );
}
