function loadF7(component, f7){
  if(!Meteor.isServer) {
    let app = f7;
    let view = app.addView('.view-main', {
      // Enable dynamic Navbar
      dynamicNavbar: true,
      // Enable Dom Cache so we can use all inline pages
      domCache: true
    });
            let routeOld;
            let onSwipe;
            var isBack=0;
            routeOld= Session.get('routeOld')
            // get the Route Name like /about -> get "about"
            var routeName;
            routeName = component.props.location.pathname.split('/');
            if(routeName[1]=="")routeName.splice(1, 1);
            var routeNew;
            routeNew = component.props.location.pathname;
            if(routeOld==routeNew){
              routeOld = undefined;
            }
            Session.set('routeOld', routeOld);
            if(sessionStorage.getItem('history')==undefined){
              // console.log('history');
              var array = ['#index'];
              history = ['#index']
              if(!!routeName[1])history.push('#'+routeName[1]);
              sessionStorage.setItem('history', JSON.stringify(history));
            }
            //Define Action
            let theIndex;
            if(sessionStorage.getItem('historyRoute')==undefined){
              let route = ['/'];
              if(routeNew!=='/'){
                route.push(routeNew);
                sessionStorage.setItem('historyRouteIndex',1)
              }else{
                sessionStorage.setItem('historyRouteIndex',0)
              }
              sessionStorage.setItem('historyRoute', JSON.stringify(route));
              // console.log("what!");
            }else{
              let route = JSON.parse(sessionStorage.getItem('historyRoute'));
              let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
              theIndex = index;
              if(routeNew==route[index-1]){
                //go back
                // console.log('back');
                isBack=1;
                sessionStorage.setItem('historyRouteIndex',index-1);
              }else if((index+1)<route.length && routeNew==route[index+1]){
                //go forward but still in history
                // console.log('forward')
                isBack= 0;
                sessionStorage.setItem('historyRouteIndex',index+1);
              }else if(routeNew==route[index]){
                //refresh paged
                // console.log('refresh');
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
                  tmp = tmp.replace('/','#');
                  history.push(tmp);
                }
                sessionStorage.setItem('history', JSON.stringify(history));
                sessionStorage.setItem('historyRoute', JSON.stringify(route));
                sessionStorage.setItem('historyRouteIndex',index+1);
                sessionStorage.setItem('historyPosition', JSON.stringify(historyPosition))
              }
            }
            var options = {};
            if(routeName[routeName.length-1]!=='')var pageName = routeName[routeName.length-1];
            else var pageName = 'index';
            options.pageName= pageName;
            if( !routeOld){
              options.animatePages=false;
            }
            if(isBack==1 ){
              if(Session.get('onSwipe')==0){
                let history = JSON.parse(sessionStorage.getItem('history'));
                let k = history;
                let i     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                if(k[i].slice(1, k[i].length)!=='index'){
                  app.views[1].router.loadPage({
                    pageName:   k[i].slice(1, k[i].length),
                    animatePages: false
                  });
                }

              }else{
                //back action
                // console.log('back');
                let history = JSON.parse(sessionStorage.getItem('history'));
                let k = history;
                let i     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                if(k[i].slice(1, k[i].length)!=='index'){
                // $('[data-page="'+k[i].slice(1, k[i].length)+'"].page').css('opacity', 0);
                  app.views[1].router.loadPage({
                    pageName:   k[i].slice(1, k[i].length),
                    animatePages: false
                  });
                }
                i+=1;
                if(!!k[i]){
                  app.views[1].router.loadPage({
                    pageName:   k[i].slice(1, k[i].length),
                    animatePages: false
                  });
                  let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
                  // if(historyPosition[i]>0){
                    // $('[data-page="'+k[i].slice(1, k[i].length)+'"]>.page-content').scrollTop(historyPosition[i]);
                  // }
                }
                app.views[1].router.back();
                //@back instance change bar style

                setTimeout(function(){
                  var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                  var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                  let num         = ( titleWidth - barWidth )/2;
                  let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                  center.css( 'left'      , num*2                               );
                  center.css( 'transform' , 'translate3d('+-num+'px, 0px, 0px)' );
                  center.css( 'transition', 'transform 400ms'                   );
                }, 0);
                let index = i-1;
                let backPage  = history[index+1].slice(1, history[index+1].length);
                // // //make static after back change
                app.onPageAfterBack(backPage, function(){
                  // console.log('done render');
                  setTimeout(function(){
                    var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                    var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                    let num         = ( titleWidth - barWidth )/2;
                    let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                    center.css( 'left'      , num                          );
                    center.css( 'transform' , '' );
                    center.css( 'transition', ''                           );
                  }, 0);
                })
              }
              isBack = 0;
            }else {
                // let i     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                // if (i>0) {
                //   let history = JSON.parse(sessionStorage.getItem('history'));
                //   let k = history;
                //   i-=1;
                //   app.views[1].router.loadPage({
                //     pageName:   k[i].slice(1, k[i].length),
                //     animatePages: false
                //   });
                //   let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
                //   // if(historyPosition[i]>0){
                //   //   $('[data-page="'+k[i].slice(1, k[i].length)+'"]>.page-content').scrollTop(historyPosition[i]);
                //   // }
                // }
                  //if not index page load
                  if(!!routeName[1])app.views[1].router.loadPage(options);

            }
            let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
            let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
            let backPage;
            if(!!history[index-1]) backPage = history[index-1].slice(1, history[index-1].length);

            var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
            var titleWidth  = $('.navbar-on-left.navbar-inner>.center').width();
            let num         = ( titleWidth - barWidth )/2;
            let onLeft      = $('.navbar-on-left.navbar-inner>.center');
            onLeft.css( 'left'      , 0                               );
            onLeft.css( 'transform' , 'translate3d('+num+'px, 0px, 0px)' );
            onLeft.css( 'transition', 'transform 0ms'                   );
            Session.set('onSwipe', 1);
            onSwipe = app.onPageBack(pageName, function(page){
              if(Session.get('onSwipe')==1 && page.swipeBack){
                let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                let route = JSON.parse(sessionStorage.getItem('historyRoute'));
                Session.set('onSwipe', 0);
                component.props.history.goBack();
              }
              Session.set('onSwipe', 0);
            });
          if(sessionStorage.getItem('historyRoute')==undefined){
              // console.log("what!");
            }else{
              let route = JSON.parse(sessionStorage.getItem('historyRoute'));
              let index = theIndex;
              let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));

              let currentName     =
                ( routeName[routeName.length-1]!==''  ) ? routeName[routeName.length-1] : 'index';
              let currentIndex    = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
              if(routeNew==route[index-1]){
                //go back
                  // $('[data-page="'+currentName+'"]>.page-content').scrollTop(historyPosition[currentIndex]);
              }else if((index+1)<route.length && routeNew==route[index+1]){
                //go forward but still in history
                // console.log('forward')
                // $('[data-page="'+currentName+'"]>.page-content').scrollTop(historyPosition[currentIndex]);
              }else if(routeNew==route[index]){
                //refresh paged
                // console.log('refresh');
              }else if(routeNew!=='/'){
                //discover to new page
                // console.log('new')
              }
            }


            if(!!routeOld && routeOld!==routeNew){  //Is not initial or reload
              let history = JSON.parse(sessionStorage.getItem('history'));
              let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
              let route = JSON.parse(sessionStorage.getItem('historyRoute'));
              history = history.slice(0, index+1);
              for(let i=1; i<route.length; i++){
                let tmp = route[i];
                tmp = tmp.replace('/','#');
                history.push(tmp);
              }
              sessionStorage.setItem('history', JSON.stringify($.unique(history)));
            }else{// Initial or reload
              let index           = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
              let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));


              let currentName     =
                ( routeName[routeName.length-1]!==''  ) ? routeName[routeName.length-1] : 'index';

              // $('[data-page="'+currentName+'"]>.page-content').scrollTop(historyPosition[index]);
            }
            app.views=[app.views[0]];
            Session.set('isBack', undefined);
            Session.set('routeOld', routeNew);
            routeOld = routeNew;
  }
}
export default loadF7;
