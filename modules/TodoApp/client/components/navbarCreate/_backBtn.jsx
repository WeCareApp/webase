// var Router = require("react-router");

function backBtn(component) {
  if(!Meteor.isServer) {
    let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
    let route = JSON.parse(sessionStorage.getItem('historyRoute'));
    component.props.history.goBack();
  }
}

export {backBtn};
