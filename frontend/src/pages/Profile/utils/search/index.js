import * as _ from "lodash";
import CardLoading from "../card-loading/card-loading";
import Card from "../card";
import {CSSTransitionGroup} from "react-transition-group";
import React from "react";


export default function cssTransitionGroup(option, loadingProfiles, profiles, searchTerm) {
  let componentContent;
  if (option === 'cardloading') {
    componentContent = loadingProfiles
      ? (<ul>
        {_.times(6, function (i) {
          return <CardLoading key={i}></CardLoading>;
        })}
      </ul>)
      : null;
  }

  if (option === 'card') {
    componentContent =  !loadingProfiles
      ? (<ul>
        {profiles.map(
          (profile, i) => (<Card key={i} profile={profile} searchTerm={searchTerm}></Card>)
        )}</ul>)
      : null;
  }
  const obj =  <CSSTransitionGroup
    transitionName="example"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}>
    {componentContent}
  </CSSTransitionGroup>

  return obj;
}
