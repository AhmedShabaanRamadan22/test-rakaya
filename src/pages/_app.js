import Layout from "@/components/layout/Layout";
import { useIsRTL } from "@/hooks/useIsRTL";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "@/context/DarkModeContext";

export default function MyApp({ Component, pageProps }) {
  const isRTL = useIsRTL();

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, [isRTL]);

  // Wrap the component with the Layout if noLayout is not true
  const renderComponent = () => (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossOrigin="anonymous"
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-WK6D3JZL9S"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WK6D3JZL9S');
      `}
      </Script>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <I18nextProvider i18n={i18n}>
      {Component.noLayout ? (
        <QueryClientProvider client={queryClient}>
          {renderComponent()}
        </QueryClientProvider>
      ) : (
        <DarkModeProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>{renderComponent()}</Layout>
          </QueryClientProvider>
        </DarkModeProvider>
      )}
    </I18nextProvider>
  );
}
