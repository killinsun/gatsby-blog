import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'

const Tags = ( tags ) => (
  <div class='tags'>
    {(tags || []).map(tag => 
        <span class="post-tag">
            <FontAwesomeIcon icon={faTag} />
            { tag }
        </span>
    )}
  </div>
);

export default Tags