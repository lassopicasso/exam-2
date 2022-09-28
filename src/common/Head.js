import React from "react";
import { Helmet } from "react-helmet-async";

const defaultTitle = "Holidaze";
const defaultDescription = "Holidaze, we offers accommodations in Bergen. Take a look and see what we can offer.";

const postfixTitle = " - Holidaze";

export default function Head({ title = defaultTitle, description = defaultDescription, addPostFixTitle }) {
  const metaTitle = addPostFixTitle ? title + postfixTitle : title;
  const metaDesc = description;
  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta property="og:image" content="%PUBLIC_URL%/backgroundImg.jpg" />
    </Helmet>
  );
}
