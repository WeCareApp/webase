import F7 from './f7/js/f7';

function loadF7() {
  if(!Meteor.isServer) {
    // let localSession = new PersistentReactiveDict('localSession');
    let app = new F7();
    //this.setState({app: app});

    // Add main View
    let view = app.addView('.view-main', {
      // Enable dynamic Navbar
      dynamicNavbar: true,
      // Enable Dom Cache so we can use all inline pages
      domCache: true
    });
    let routeOld;
    // var pageLoad = function(var num, var options){
    //   for(var i=0; i<num; i++){
    //     let app1 = new F7();
    //     view = app1.addView('.view-main', {
    //       // Enable dynamic Navbar
    //       dynamicNavbar: true,
    //       // Enable Dom Cache so we can use all inline pages
    //       domCache: true
    //     });
    //     view.router.back()
    //   }
    //
    // }
    // Array.prototype.diff = function(a) {
    //   return this.filter(function(i) {return a.indexOf(i) < 0;});
    // };
    var isBack=0;
    // Session.set('routeOld', undefined);
    // Tracker.autorun(function() {
       routeOld= Session.get('routeOld')
      var routeName = FlowRouter.current().route.path.split('/');
      if(routeName[1]=="")routeName.splice(1, 1);
      var routeNew = FlowRouter.current().path;
      if(routeOld==routeNew){
        routeOld = undefined;
      }
      Session.set('routeOld', routeOld);
      // localSession.setPersistent('history', undefined);
      if(sessionStorage.getItem('history')==undefined){
        // var array = ['#index'];
        sessionStorage.setItem('history', JSON.stringify(app.views[0].history));
      }
      if(sessionStorage.getItem('historyRoute')==undefined){
        // window.history.replaceState( {} , '', '/' );
        // window.history.pushState( {} , '', FlowRouter.current().path );
        window.history.back();// initial load up, because it load up two times, so back one time.
        let route = ['/'];
        if(routeNew!=='/'){
          route.push(routeNew);
          sessionStorage.setItem('historyRouteIndex',1)
        }else{
          sessionStorage.setItem('historyRouteIndex',0)
        }
        sessionStorage.setItem('historyRoute', JSON.stringify(route));
      }else{
        let route = JSON.parse(sessionStorage.getItem('historyRoute'));
        let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));

        // if(index==0 && routeNew!=='/'){
        //   route.push(routeNew)
        //   sessionStorage.setItem('historyRouteIndex',1)
        //   sessionStorage.setItem('historyRoute', JSON.stringify(route));
        // }
        // else{
          if(routeNew==route[index-1]){
            //go back
            console.log('back');
            isBack=1;
            sessionStorage.setItem('historyRouteIndex',index-1);
          }else if((index+1)<route.length && routeNew==route[index+1]){
            //go forward but still in history
            console.log('forward')
            isBack=0;
            sessionStorage.setItem('historyRouteIndex',index+1);
          }else if(routeNew==route[index]){
            //refresh paged
            if(routeOld!=undefined)window.history.back();// initial load up, because it load up two times, so back one time.
            console.log('refresh');
          }else if(routeNew!=='/'){
            //discover to new page
            console.log('new')
            isBack=0;
            route = route.slice(0, index+1);
            let history = JSON.parse(sessionStorage.getItem('history'));
            history = history.slice(0, index+1);
            for(let i=1; i<route.length; i++){
              let tmp = route[i];
              tmp = tmp.replace('/','#');
              history.push(tmp);
            }
            route.push(routeNew);

            sessionStorage.setItem('history', JSON.stringify(history));
            sessionStorage.setItem('historyRoute', JSON.stringify(route));
            sessionStorage.setItem('historyRouteIndex',index+1);
          }
        // }
        console.log('route:'+route+' index:'+index+'value:' + route[index]);
      }
      // else {
      //   localSession.setPersistent('history', localSession.get('history').push(FlowRouter.current().route.path));
      // }
      // console.log(localSession.get('history'));
      // console.log(JSON.parse(sessionStorage.getItem('history')));
      // console.log('RouteOld:' + routeOld + ',RouteName:' + routeName)
      var options = {};
      // var name = routeName.substring(1,routeName.length);
      //theSame => refresh or new page, different page change without refresh
      // if()console.log();
      // else{
      //   let app1 = new F7();
      //   view = app1.addView('.view-main', {
      //     // Enable dynamic Navbar
      //     dynamicNavbar: true,
      //     // Enable Dom Cache so we can use all inline pages
      //     domCache: true
      //   })
      // }

      // console.log(routeName);
      // window.onhashchange = function() {
      //  alert('back');
      // }

      // if( !!routeOld){
      // view.destroy();
      // app = new F7();
      if(routeName[routeName.length-1]!=='')var pageName = routeName[routeName.length-1];
      else var pageName = 'index';
      options.pageName= pageName;
      // $('a').click(function(){
      //   console.log(app.views);
      // })
      // app.views[app.views.length-1].history=app.views[0].history;

      // window.onpopstate = function(event) {
      //   // console.log(event.state);
      //   isBack = 1;
      //     // alert("location: " + document.location);
      // }

      view = app.addView('.view-main', {
        // Enable dynamic Navbar
        dynamicNavbar: true,
        // Enable Dom Cache so we can use all inline pages
        domCache: true
      })

      if( !routeOld){
        console.log(routeOld);
        // console.log(JSON.parse(sessionStorage.getItem('history')));
        let history = JSON.parse(sessionStorage.getItem('history'));
        // console.log(history);
        // app.views[0].history=history;
        // console.log(app.views[0].history);
        var k = history;

        for(let i=0; i<k.length; i++){
          // history[i] = history[i].substr(1);
          // let k = history[i];


          // if(history[i]=='#index')continue;
          view = app.addView('.view-main', {
            // Enable dynamic Navbar
            dynamicNavbar: true,
            // Enable Dom Cache so we can use all inline pages
            domCache: true
          })
          // console.log(k[i].slice(1, k[i].length))
          app.views[0].router.loadPage({
            pageName:   k[i].slice(1, k[i].length),
            animatePages: false
          });
        }
        // console.log(history);
        // console.log(app.views[0].history);
        app.views[0].history=$.unique(app.views[0].history);
        // app.views[0].history.push()
        options.animatePages=false;
      }


      // console.log(app.views[0].history);
      if(!!routeOld && routeOld!==routeNew)sessionStorage.setItem('history', JSON.stringify($.unique(app.views[0].history)));
      if(isBack==1 && $.inArray('#'+pageName, app.views[0].history) > -1){
        app.views[0].router.back(options);
        isBack = 0;
      }else app.views[0].router.loadPage(options);
      // console.log(app.views[0].history);
      app.views=[app.views[0]];
      Session.set('routeOld', routeNew);



        // var oldLink="";
        // for(var i=1; i<routeOld.length; i++){
        //   oldLink+="/";
        //   oldLink+=routeOld[i];
        // }
        // alert(oldLink);
        // $('.left[style="transform: translate3d(0px, 0px, 0px);"]>a').attr('href', oldLink);
      // }
        // console.log('yo');
        // var min= 0;
        // var minSame=0;
        // min = routeName.length;
        // if( routeName.length > routeOld.length ) min=routeOld.length;
        // for( var i = 0; i<min; i++){
        //   if(routeName[i]==routeOld[i])minSame++;
        //   else break;
        // }
        // console.log(minSame+"Old:"+routeOld.length+"Name:"+routeName.length);
        // var routeActions = [];
        // if(routeOld.length>minSame){
        //   console.log('old');
        //   for(var i=routeOld.length-1; i>=minSame; i--){
        //     console.log('oldOld');
        //     routeActions.push("-"+routeName[i]);
        //     // setTimeout(function(){
        //     //   let app1 = new F7();
        //     //   view = app1.addView('.view-main', {
        //     //     // Enable dynamic Navbar
        //     //     dynamicNavbar: true,
        //     //     // Enable Dom Cache so we can use all inline pages
        //     //     domCache: true
        //     //   })
        //     //   view.router.back();
        //     // },500);
        //   }
        // }
        // if(routeName.length>minSame){
        //   console.log('name');
        //   for(var i=minSame; i<routeName.length; i++){
        //     console.log('nameName');
        //     routeActions.push(routeName[i]);
        //     // options['pageName'] = routeName[i];
        //     // console.log(routeName[i]);
        //     // setTimeout(function(){
        //     //   let app1 = new F7();
        //     //   view = app1.addView('.view-main', {
        //     //     // Enable dynamic Navbar
        //     //     dynamicNavbar: true,
        //     //     // Enable Dom Cache so we can use all inline pages
        //     //     domCache: true
        //     //   })
        //     //   view.router.load(options);
        //     // },1000);
        //   }
        // }
        // var actionTime = 4000;
        // var aOptions = [];
        // for(var i=0; i<routeActions.length; i++){
        //   aOptions[i]={animatePages:false};
        //   if(i==routeActions.length-1)aOptions[i].animatePages=true;
        //   var item = routeActions[i];
        //   var back = function(i){
        //     console.log('back'+i);
        //     let app1 = new F7();
        //     view = app1.addView('.view-main', {
        //       // Enable dynamic Navbar
        //       dynamicNavbar: true,
        //       // Enable Dom Cache so we can use all inline pages
        //       domCache: true
        //     })
        //     view.router.back(aOptions[i]);
        //     // view.router.back();
        //   }
        //   var go= function(i){
        //     console.log(app);
        //     // let app1 = new F7();
        //     // view = app.addView('.view-main', {
        //     //   // Enable dynamic Navbar
        //     //   dynamicNavbar: true,
        //     //   // Enable Dom Cache so we can use all inline pages
        //     //   domCache: true
        //     // })
        //     console.log('go'+i);
        //     view.router.load(aOptions[i]);
        //   }
        //   if(item[0]=="-"){
        //     aOptions[i].pageName= 'index';
        //     setTimeout( (function(x){
        //       return function(){ back(x)}
        //     })(i),actionTime*i);
        //   }else{
        //     aOptions[i].pageName= item;
        //     setTimeout( (function(x){
        //       return function(){ go(x)}
        //     })(i),actionTime*i);
        //   }
        // }


        //
        // var loadArray = routeName.diff(routeOld)
        // console.log(loadArray);
        // for(var i = 0; i < loadArray.length; i++){
        //   let app1 = new F7();
        //   view = app1.addView('.view-main', {
        //     // Enable dynamic Navbar
        //     dynamicNavbar: true,
        //     // Enable Dom Cache so we can use all inline pages
        //     domCache: true
        //   })
        //   options['pageName'] = loadArray[i];
        //   console.log(options);
        //   view.router.load(options);
        // }
      // }
      // console.log(options);

      // if(   !!routeOld
      //   &&  routeName.length==routeOld.length
      //   &&  routeName.diff(routeOld).length==0
      //   &&  routeOld.diff(routeName).length==0
      //   &&  routeOld[1] == routeName[1]
      // ){
      //   // console.log('Yeah!');
      //   options['animatePages'] = false;
      //   for(var i=1; i<routeName.length; i++){
      //     options['pageName'] = routeName[i];
      //     view.router.load(options);
      //   }
      //   //Don't need to center title the root page
      //   if(name!==''){
      //     var barWidth    = $('[data-page="'+name+'"].navbar-inner').width();
      //     var titleWidth  = $('[data-page="'+name+'"].navbar-inner>.center').width();
      //     $('[data-page="'+name+'"].navbar-inner>.center').css( 'left' , ( titleWidth - barWidth )/2 );
      //   }
      // }

      // FlowRouter.watchPathChange();
      routeOld = routeNew;

    // });
    // Pass instance to state to pass to children.
    // We are anyhow able to always get the instance via new F7()
    // this.setState({f7: app});
  }
}

export { loadF7 };
