import React, {FunctionComponent} from "react";
import classnames from "classnames";
import {Filter} from "types/Filter";
import {useDispatch, useAppState} from "context/TodoContext";
import {createSetFilter} from "store/actions";

interface LinkProps {
  filter: Filter;
}

const Link: FunctionComponent<LinkProps> = ({ children, filter }) => {
  const dispatch = useDispatch();
  const {filter: current} = useAppState();

  return (
    <a
      className={classnames({ selected: current === filter })}
      style={{ cursor: "pointer" }}
      onClick={() => dispatch(createSetFilter(filter))}
    >
      {children}
    </a>
  );
};

export default Link;