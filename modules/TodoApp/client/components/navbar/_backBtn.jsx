// var Router = require("react-router");

function backBtn(component) {
  let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
  let route = JSON.parse(sessionStorage.getItem('historyRoute'));
  // console.log(Router);
  // let routeNew = FlowRouter.current().path;
  // if((sessionStorage.getItem('historyRoute')==undefined || routeNew==route[index])&& index==1){
    // FlowRouter.withReplaceState(function() {
      // Session.set('isBack', 1);

      // FlowRouter.go(route[index-1]);
      // sessionStorage.setItem('historyRouteIndex',index-2);
      // if(component.props.history){
          // component.props.history.push(route[index-1]);
          component.props.history.goBack();
      // }

      // console.log(component.props.history.push(route[index-1]););
      // Router.History
    // });
  // }else{
  //   window.history.back();
  // }
}

export {backBtn};
