import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import * as moment from 'moment'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="HOME" />
      { data.allMarkdownRemark.edges.map(( { node }) => (
          <article class="row">
              <div class="col-sm-1 post-date">
                <div class="post-year">
                  { node.frontmatter.year }
                </div>
                <div class="post-month-day">
                  { node.frontmatter.daymonth}
                </div>
              </div>
              <div class="col-sm-11">
                <h1> 
                  <Link to={node.fields.slug } >
                    { node.frontmatter.title }
                  </Link>
                </h1>
                <div class="post-meta-data text-gi-med bg-gi-light">
                  <div class="row">
                    <small class="col-sm-12"> { node.frontmatter.categories }</small>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          </article>
      ))}
    </Layout>
  )
}

const skipNum = 0

export const query = graphql`
  query{
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, filter: { frontmatter: {type: {ne: "article"}} } ) {
      totalCount
      edges{
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
