import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
    <div class="container">
      <div class="row">
        <div class="header_title col-sm">
          <span style={{ margin: 0 }} class="site_title">
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </span>
        </div>
          <div class="header_menu col-sm">
            <ul>
              <li>
              </li>
              <li>
                <Link to ="/articles/who_am_i">
                  私について
                </Link>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
