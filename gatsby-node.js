/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require("gatsby-awesome-pagination")
const kebabCase = require("lodash/kebabCase")

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
      tagsGroup: allMarkdownRemark(limit: 1000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      categoriesGroup: allMarkdownRemark(limit: 1000) {
        group(field: frontmatter___categories) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    throw new Error(result.errors)
  }

  const posts = result.data.allMarkdownRemark.nodes

  // ここで記事一覧を生成する
  paginate({
    createPage,
    items: posts,
    itemsPerPage: 10,
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
    component: path.resolve(`./src/templates/index.js`),
  })

  // ここで記事単体を生成する
  posts.forEach(post => {
    createPage({
      path: post.fields.slug,
      component: path.resolve(`./src/templates/BlogPost.js`),
      context: {
        slug: post.fields.slug,
      },
    })
  })

  // タグ別記事一覧を生成する
  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: path.resolve(`./src/templates/TagList.js`),
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  // カテゴリー別記事一覧を生成する
  const categories = result.data.categoriesGroup.group
  categories.forEach(category => {
    createPage({
      path: `/categories/${kebabCase(category.fieldValue)}/`,
      component: path.resolve(`./src/templates/CategoryList.js`),
      context: {
        category: category.fieldValue,
      },
    })
  })
}
