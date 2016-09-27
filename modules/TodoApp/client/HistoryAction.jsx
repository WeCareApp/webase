let HistoryAction=function(state, currentName){
  let isRefresh         = JSON.parse(sessionStorage.getItem('isRefresh'))
  let     historyIndex  = JSON.parse(sessionStorage.getItem('historyIndex'))
  let     history       = JSON.parse(sessionStorage.getItem('history'))
  let     historyAction = JSON.parse(sessionStorage.getItem('historyAction'))
  let     route         = JSON.parse(sessionStorage.getItem('historyRoute'))
  let  OldhistoryIndex  = historyIndex
  let  Oldhistory       = history
  let  OldhistoryAction = historyAction
  let  Oldroute         = route
  let routeNew
  routeNew = state.pathname
  // console.log(routeNew);
  // console.log(isRefresh);
  // let currentName   = this.currentName();
  // if(route && route[historyIndex+1])console.log(routeNew==route[historyIndex+1]);
  if(history==null){
    route = ['/']
    history = ['index']
    historyIndex = 0
    if(currentName!=='index'){
      history.push(currentName)
      route.push(routeNew);
      historyIndex++
    }
    // console.log('new');
    historyAction = 'initial'
    // this.setState({
    //   historyRoute  : historyRoute ,
    //   historyIndex  : historyIndex ,
    //   historyAction : 'initial'
    // })
  }else if(isRefresh==1){
    //refresh paged
    // console.log('refresh');
    // if(this.state.hasRoute == null)
    historyAction = 'refresh'
    historyIndex  = history.indexOf(currentName);
    // console.log(history);
    // console.log(history.indexOf(currentName));
    // console.log(historyIndex);
    if(historyIndex==-1){
      history = ['index']
      historyIndex = 0
      if(currentName!=='index'){
        history.push(currentName)
        historyIndex++
      }
    }
    // else return
    // if(this.state.historyAction!==historyAction){
    //   this.setState({
    //     // historyRoute  : historyRoute ,
    //     // historyIndex  : historyIndex ,
    //     historyAction : historyAction
    //   })
    // }
    // }
  }
  else{
    if(routeNew==route[historyIndex-1]){
      //go back
      // console.log('back');
      // history = history.slice(0, historyIndex+1);
      // console.log(historyIndex);
      historyIndex--

      historyAction = 'back'
      // if(this.state.historyAction!==historyAction){
      //   this.setState({
      //     // historyRoute  : historyRoute ,
      //     // historyIndex  : historyIndex ,
      //     historyAction : historyAction
      //   })
      // }
      // isBack=1;
      // sessionStorage.setItem('historyRouteIndex',index-1);
    }else if((historyIndex+1)<route.length && routeNew==route[historyIndex+1]){
      //go forward but still in history
      // console.log('forward')
      historyIndex++
      historyAction = 'forward'

      // isBack= 0;
      // sessionStorage.setItem('historyRouteIndex',index+1);
    }else if(currentName!=='index'){
      //discover to new page
      // console.log('new')
      history = history.slice(0, historyIndex+1);
      route   =   route.slice(0, historyIndex+1);
      history.push(currentName)
        route.push(  routeNew )
      historyIndex++
      historyAction = 'new'
      // if(this.state.historyAction!==historyAction){
      //   this.setState({
      //     // historyRoute  : historyRoute ,
      //     // historyIndex  : historyIndex ,
      //     historyAction : historyAction
      //   })
      // }
      // isBack=0;
      // route = route.slice(0, index+1);
      // let history = JSON.parse(sessionStorage.getItem('history'));
      // let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
      // history = history.slice(0, index+1);
      // // historyPosition = historyPosition.slice(0, index+1);
      // // historyPosition.push(0);
      //
      // route.push(routeNew);
      // for(let i=1; i<route.length; i++){
      //   // console.log('push');
      //   let tmp = route[i];
      //   tmp = tmp.replace('/','#');
      //   history.push(tmp);
      // }
      // sessionStorage.setItem('history', JSON.stringify(history));
      // sessionStorage.setItem('historyRoute', JSON.stringify(route));
      // sessionStorage.setItem('historyRouteIndex',index+1);
      // sessionStorage.setItem('historyPosition', JSON.stringify(historyPosition))
    }

    // if(this.state.historyRoute.indexOf(this.currentName())==-1){
    //
    //   this.setState({
    //
    //   })
    // }
  }

  // console.log(historyAction);
  let historyUni
  historyUni = history
  // console.log(history);
  // console.log( );
  historyUni = historyUni.slice(0, historyIndex+2)
  historyUni.reverse()
  historyUni = Array.from(new Set(historyUni))
  historyUni.reverse()


  sessionStorage.setItem('historyUni'      , JSON.stringify(historyUni));

  if(OldhistoryIndex  !== historyIndex){
    sessionStorage.setItem('historyIndex' , JSON.stringify(historyIndex));
  }

  if(Oldhistory       !== history){
    sessionStorage.setItem('history'      , JSON.stringify(history));
  }

  if(OldhistoryAction !== historyAction){
    sessionStorage.setItem('historyAction', JSON.stringify(historyAction));
  }

  if(Oldroute !== route){
    sessionStorage.setItem('historyRoute' , JSON.stringify(route));
  }
  // setTimeout(function(){

  // },0)

  // console.log(this.state.historyRoute);
  // console.log(this.state.historyIndex);
  // console.log(this.state.historyAction);
  //
  // console.log(JSON.parse(sessionStorage.getItem('isRefresh')));
  // let routeOld;
  // var isBack=0;
  // routeOld= Session.get('routeOld')
  // // get the Route Name like /about -> get "about"
  // var routeName;
  // let history;
  // routeName = state.pathname.split('/');
  // if(routeName[1]=="")routeName.splice(1, 1);
  // var routeNew;
  // routeNew = state.pathname;
  // if(routeOld==routeNew){
  //   routeOld = undefined;
  // }
  // Session.set('routeOld', routeOld);
  // if(sessionStorage.getItem('history')==undefined){
  //   // console.log('history');
  //   var array = ['index'];
  //   history = ['index']
  //   if(!!routeName[1])history.push(routeName[1]);
  //   sessionStorage.setItem('history', JSON.stringify(history));
  // }
  // //Define Action
  // // let theIndex;
  // if(sessionStorage.getItem('historyRoute')==undefined){
  //   let route = ['/'];
  //   if(routeNew!=='/'){
  //     route.push(routeNew);
  //     sessionStorage.setItem('historyRouteIndex',1)
  //   }else{
  //     sessionStorage.setItem('historyRouteIndex',0)
  //   }
  //   sessionStorage.setItem('historyRoute', JSON.stringify(route));
  //   sessionStorage.setItem('historyAction', JSON.stringify('initial'));
  //   // console.log("what!");
  // }else{
  //   let route = JSON.parse(sessionStorage.getItem('historyRoute'));
  //   let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
  //   // theIndex = index;
  //   if(routeNew==route[index-1]){
  //     //go back
  //     // console.log('back');
  //     isBack=1;
  //     sessionStorage.setItem('historyRouteIndex',index-1);
  //
  //     sessionStorage.setItem('historyAction', JSON.stringify('back'));
  //   }else if((index+1)<route.length && routeNew==route[index+1]){
  //     //go forward but still in history
  //     // console.log('forward')
  //     isBack= 0;
  //     sessionStorage.setItem('historyRouteIndex',index+1);
  //
  //     sessionStorage.setItem('historyAction', JSON.stringify('forward'));
  //   }else if(routeNew==route[index]){
  //     //refresh paged
  //     // console.log('refresh');
  //
  //     sessionStorage.setItem('historyAction', JSON.stringify('refresh'));
  //   }else if(routeNew!=='/'){
  //     //discover to new page
  //     // console.log('new')
  //     isBack=0;
  //     route = route.slice(0, index+1);
  //     let history = JSON.parse(sessionStorage.getItem('history'));
  //     let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
  //     history = history.slice(0, index+1);
  //     // historyPosition = historyPosition.slice(0, index+1);
  //     // historyPosition.push(0);
  //
  //     route.push(routeNew);
  //     for(let i=1; i<route.length; i++){
  //       // console.log('push');
  //       let tmp = route[i];
  //       tmp = tmp.replace('/','');
  //       history.push(tmp);
  //     }
  //     sessionStorage.setItem('history', JSON.stringify(history));
  //     sessionStorage.setItem('historyRoute', JSON.stringify(route));
  //     sessionStorage.setItem('historyRouteIndex',index+1);
  //     sessionStorage.setItem('historyPosition', JSON.stringify(historyPosition))
  //     sessionStorage.setItem('historyAction', JSON.stringify('new'));
  //   }
  // }
}

export default HistoryAction
