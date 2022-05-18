import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, lang }) => {
  console.log(title, description, image, lang)
  const { pathname } = useLocation()
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl: url
            defaultImage: image
            defaultLang: lang
            twitterUsername
          }
        }
      }
    `
  )

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    defaultLang,
    twitterUsername,
  } = site.siteMetadata

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    lang: lang || defaultLang,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet>
      <title>{seo.title}</title>
      <html lang={seo.lang} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <script src="https://j.staging1-wovn.com/1" data-wovnio="key=YB0LQD" async></script>
      <link rel="alternate" hreflang="en" href={`${seo.url}?wovn=en`} />
      <link rel="alternate" hreflang="ko" href={`${seo.url}?wovn=ko`} />
      <link rel="alternate" hreflang="ja" href={seo.url} />
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  lang: null,
}

export default SEO
