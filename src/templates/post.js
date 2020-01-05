import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"


export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO tilte={ post.frontmatter.title } />
      <h1 dangerouslySetInnerHTML={{ __html: post.frontmatter.title }} />
      <small>{ post.frontmatter.date }</small>
      <div class="indivisual-article" dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`