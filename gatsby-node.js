/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require("gatsby-awesome-pagination")
const { post } = require("jquery")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: `pages` })
    const url = node.frontmatter.path
    createNodeField({
      name: `slug`,
      node,
      value: url ? url : value,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw new Error(result.errors)
  }

  const posts = result.data.allMarkdownRemark.nodes

  paginate({
    createPage,
    items: posts,
    itemsPerPage: 10,
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
    component: path.resolve(`./src/templates/index.js`),
  })

  posts.forEach(post => {
    createPage({
      path: post.fields.slug,
      component: path.resolve(`./src/templates/article.js`),
      context: {
        slug: post.fields.slug,
      },
    })
  })
}
