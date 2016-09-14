let HistoryAction=function(state){
  // console.log(state);
  let routeOld;
  var isBack=0;
  routeOld= Session.get('routeOld')
  // get the Route Name like /about -> get "about"
  var routeName;
  routeName = state.pathname.split('/');
  if(routeName[1]=="")routeName.splice(1, 1);
  var routeNew;
  routeNew = state.pathname;
  if(routeOld==routeNew){
    routeOld = undefined;
  }
  Session.set('routeOld', routeOld);
  if(sessionStorage.getItem('history')==undefined){
    // console.log('history');
    var array = ['index'];
    history = ['index']
    if(!!routeName[1])history.push(routeName[1]);
    sessionStorage.setItem('history', JSON.stringify(history));
  }
  //Define Action
  // let theIndex;
  if(sessionStorage.getItem('historyRoute')==undefined){
    let route = ['/'];
    if(routeNew!=='/'){
      route.push(routeNew);
      sessionStorage.setItem('historyRouteIndex',1)
    }else{
      sessionStorage.setItem('historyRouteIndex',0)
    }
    sessionStorage.setItem('historyRoute', JSON.stringify(route));
    sessionStorage.setItem('historyAction', JSON.stringify('initial'));
    // console.log("what!");
  }else{
    let route = JSON.parse(sessionStorage.getItem('historyRoute'));
    let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
    // theIndex = index;
    if(routeNew==route[index-1]){
      //go back
      // console.log('back');
      isBack=1;
      sessionStorage.setItem('historyRouteIndex',index-1);

      sessionStorage.setItem('historyAction', JSON.stringify('back'));
    }else if((index+1)<route.length && routeNew==route[index+1]){
      //go forward but still in history
      // console.log('forward')
      isBack= 0;
      sessionStorage.setItem('historyRouteIndex',index+1);

      sessionStorage.setItem('historyAction', JSON.stringify('forward'));
    }else if(routeNew==route[index]){
      //refresh paged
      // console.log('refresh');

      sessionStorage.setItem('historyAction', JSON.stringify('refresh'));
    }else if(routeNew!=='/'){
      //discover to new page
      // console.log('new')
      isBack=0;
      route = route.slice(0, index+1);
      let history = JSON.parse(sessionStorage.getItem('history'));
      let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
      history = history.slice(0, index+1);
      // historyPosition = historyPosition.slice(0, index+1);
      // historyPosition.push(0);

      route.push(routeNew);
      for(let i=1; i<route.length; i++){
        // console.log('push');
        let tmp = route[i];
        tmp = tmp.replace('/','');
        history.push(tmp);
      }
      sessionStorage.setItem('history', JSON.stringify(history));
      sessionStorage.setItem('historyRoute', JSON.stringify(route));
      sessionStorage.setItem('historyRouteIndex',index+1);
      sessionStorage.setItem('historyPosition', JSON.stringify(historyPosition))
      sessionStorage.setItem('historyAction', JSON.stringify('new'));
    }
  }
}

export default HistoryAction
