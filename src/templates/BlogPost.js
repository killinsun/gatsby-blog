// 記事単体のテンプレート
import React from "react"
import Layout from "../components/layout"
import Categories from "../components/catetgories"
import Tags from "../components/tags"
import SEO from "../components/seo"
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share"

const BlogPost = props => {
  const post = props.data.markdownRemark
  const url = `https://blog.killinsun.com${props.data.markdownRemark.fields.slug}`
  const excerpt = props.data.markdownRemark.excerpt

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <h1 dangerouslySetInnerHTML={{ __html: post.frontmatter.title }} />
      <div class="post-meta-data text-gi-med bg-gi-light">
        <div class="row">
          <small class="post-date-small">
            <span class="post-date">
              {post.frontmatter.year}/{post.frontmatter.daymonth}
            </span>
          </small>
          <small> {Categories(post.frontmatter.categories)}</small>
          <small> {Tags(post.frontmatter.tags)}</small>
        </div>
      </div>
      <div
        class="indivisual-article"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <div class="container">
        <div class="row">
          <div class="col-xs-12 mx-auto sns-share-icons">
            <FacebookShareButton url={url} title={post.frontmatter.title}>
              <FacebookIcon size={50} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={url}
              title={post.frontmatter.title}
              via="Kill_In_Sun"
              related={["Kill_In_Sun", "GatsbyJS"]}
              hashtags={post.frontmatter.tags}
            >
              <TwitterIcon size={50} round />
            </TwitterShareButton>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        year: date(formatString: "YYYY")
        daymonth: date(formatString: "MM/DD")
        title
        categories
        tags
      }
    }
  }
`
