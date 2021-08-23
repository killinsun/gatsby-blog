import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const Categories = categories => (
  <div class="categories">
    <FontAwesomeIcon icon={faFolder} />
    {(categories || []).map(category => (
      <Link to={`/categories/${kebabCase(category)}/`}>
        <span class="post-category">{category}</span>
      </Link>
    ))}
  </div>
)

export default Categories
