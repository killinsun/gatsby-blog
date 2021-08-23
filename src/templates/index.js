import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Categories from "../components/catetgories"
import Tags from "../components/tags"
import SEO from "../components/seo"
import Pagenation from "../components/pagination"
import DateYearCircle from "../components/DateYearCircle"

const IndexPage = ({ data, location, pageContext }) => {
  return (
    <Layout>
      <SEO />
      <Pagenation pageContext={pageContext} />
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <article class="row">
          <div class="row col-xs-12 col-sm-12 col-md-12 meta-container">
            <DateYearCircle
              year={node.frontmatter.year}
              dayMonth={node.frontmatter.daymonth}
            />
            <div class="col-sm-12 col-md-10">
              <div class="row col-md-12">
                <h1>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </h1>
              </div>
              <div class="row col-md-12 post-meta-data text-gi-med bg-gi-light">
                <div class="row col-md-12">
                  <small> {Categories(node.frontmatter.categories)}</small>
                  <small> {Tags(node.frontmatter.tags)}</small>
                </div>
              </div>
            </div>
          </div>
          <div class="row col-xs-12 col-sm-12 col-md-12 body-container">
            <div
              class="row col-md-12"
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
            />
          </div>
        </article>
      ))}
      <Pagenation pageContext={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { ne: "article" } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            year: date(formatString: "YYYY")
            daymonth: date(formatString: "MM/DD")
            categories
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
