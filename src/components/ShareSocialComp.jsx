import React from "react";
import FaceBockIcon from "./icons/FaceBockIcon";
import FooterLink from "./layout/FooterLink";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";

const ShareSocialComp = ({ url }) => {
  const style = {
    root: {
      display: "flex",
      padding: "0",
      marginTop: "10px",
      alignItems: "center",
      minWidth: "160px",
    },
    copyContainer: {
      display: "none",
    },
    title: {
      color: "aquamarine",
      fontStyle: "italic",
    },
    icon: {
      cursor: "pointer",
      color: "#c9b171",
    },
  };

  const socialLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      label: "Follow us on Facebook",
      Component: FaceBockIcon,
    },
    {
      href: `https://twitter.com/share?url=${encodeURIComponent(url)}`,
      label: "Follow us on Twitter",
      // iconClass: "bi bi-twitter",
      Component:FaXTwitter 
    },
    {
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      label: "Contact us on WhatsApp",
      iconClass: "bi bi-whatsapp",
    },
    {
      href: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`,
      label: "Connect with us on LinkedIn",
      Component: SlSocialLinkedin,
      style: {marginTop:"-5px"},
    },
    {
      href: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
      label: "Follow us on Instagram",
      iconClass: "bi bi-instagram",
    },
  ];

  return (
    <div style={style.root}>
      {socialLinks.map((link, index) => (
        <FooterLink key={index} href={link.href} ariaLabel={link.label}>
          {link.Component ? (
            <link.Component style={{ ...style.icon, ...link.style }} />
          ) : (
            <i className={link.iconClass} style={style.icon}></i>
          )}
        </FooterLink>
      ))}
    </div>
  );
};

export default ShareSocialComp;
