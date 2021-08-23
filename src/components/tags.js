import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const Tags = tags => (
  <div class="tags">
    {(tags || []).map(tag => (
      <span class="post-tag">
        <Link to={`/tags/${kebabCase(tag)}/`}>
          <FontAwesomeIcon icon={faTag} />
          {tag}
        </Link>
      </span>
    ))}
  </div>
)

export default Tags
