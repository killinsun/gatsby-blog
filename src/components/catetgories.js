import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

const Categories = ( categories ) => (
  <div class='categories'>
    <FontAwesomeIcon icon={faFolder} />
    {(categories || []).map(category => (
      <span class="post-category">{ category }</span>
    ))}
  </div>
);

export default Categories