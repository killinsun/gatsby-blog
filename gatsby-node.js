/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if(node.internal.type === `MarkdownRemark`){
    const value = createFilePath({ node, getNode, basePath: `pages` })
    const url = node.frontmatter.path
    createNodeField({
      name: `slug`,
      node,
      value: url ? url : value
    })
  }
}

exports.createPages= (async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  console.log(JSON.stringify(result, null, 4))

  if (result.errors) {
    throw new Error(result.errors)
  }
  const postTemplate = path.resolve(`./src/templates/post.js`)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: postTemplate,
      context: {
        slug: node.frontmatter.path,
      }
    })
  })
})