import React from "react"

const DateYearCircle = ({ year, dayMonth }) => (
  <div class="dateyear-container col-12 col-md-2">
    <div class="post-year row col-6 col-sm-6 col-md-12">{year}</div>
    <div class="post-date row col-6 col-sm-6 col-md-12">{dayMonth}</div>
    <div class="post-year-date row col-12">
      {year}/{dayMonth}
    </div>
  </div>
)

export default DateYearCircle
