function backBtn() {
  let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
  let route = JSON.parse(sessionStorage.getItem('historyRoute'));
  let routeNew = FlowRouter.current().path;
  // if((sessionStorage.getItem('historyRoute')==undefined || routeNew==route[index])&& index==1){
    // FlowRouter.withReplaceState(function() {
      FlowRouter.go(route[index-1]);
    // });
  // }else{
  //   window.history.back();
  // }
}

export {backBtn};
