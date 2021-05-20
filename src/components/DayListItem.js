import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = function (props) {
    if (props === 0) {
      return <h3 className="text--light">no spots remaining</h3>;
    }
    if (props === 1) {
      return <h3 className="text--light">{props} spot remaining</h3>;
    }
    if (props > 1) {
      return <h3 className="text--light">{props} spots remaining</h3>;
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props.spots)}
    </li>
  );
}
