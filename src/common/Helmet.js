import React from "react";
import Helmet from "react-helmet-async";

const defaultTitle = "Holidaze";
const defaultDescription = "Enjoy your stay in Bergen with the nice accommodations that the city can offer!";

const postfixTitle = " - My website";

export default function Helmet({ title = defaultTitle, description = defaultDescription, addPostFixTitle }) {
  const metaTitle = addPostFixTitle ? title + postfixTitle : title;
  const metaDesc = description;

  return (
    <Helmet>
      <html lang="en" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
    </Helmet>
  );
}
