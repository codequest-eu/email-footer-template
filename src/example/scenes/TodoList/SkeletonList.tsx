import MuiList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Skeleton from "@material-ui/lab/Skeleton";
import random from "lodash/random";
import React, { FunctionComponent } from "react";

const skeletons = Array(3).fill(null);

export const SkeletonList: FunctionComponent = () => {
  return (
    <MuiList>
      {skeletons.map((_, i) => (
        <ListItem key={i}>
          <ListItemText>
            <Skeleton
              width={`${100 - random(20, 50)}%`}
              data-testid="skeleton"
            />
          </ListItemText>
          <ListItemSecondaryAction>
            <Skeleton width="50px" data-testid="skeleton" />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </MuiList>
  );
};
