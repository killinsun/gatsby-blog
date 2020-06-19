import React from "react"
import Layout from "../components/layout"
import Categories from '../components/catetgories'
import Tags from '../components/tags'
import SEO from "../components/seo"
import { Link } from "gatsby"


export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO tilte={ post.frontmatter.title } />
      <h1 dangerouslySetInnerHTML={{ __html: post.frontmatter.title }} />
      <div class="post-meta-data text-gi-med bg-gi-light">
        <div class="row">
          <small class="post-date-small"> 
            <span class="post-date">
              {post.frontmatter.year}/{post.frontmatter.daymonth}
            </span>
          </small>
          <small> { Categories(post.frontmatter.categories) }</small>
          <small> { Tags(post.frontmatter.tags) }</small>
        </div>
      </div>
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
        year: date(formatString: "YYYY")
        daymonth: date(formatString: "MM/DD")
        title,
        categories,
        tags
      }
    }
  }
`