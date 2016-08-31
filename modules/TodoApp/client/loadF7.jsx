function loadF7(component, f7){
  // console.log(this.state.f7);
  if(!Meteor.isServer) {
    // $('.navbar-inner.ssr').remove()
    // console.log(component.props.f7);
    // // console.log("yeah!");
    // console.log('beforeF7');
    // console.log($('.navbar-inner.ssr'));
    let app = f7;
      // console.log(component.props.f7);
    // console.log(app.views[0].history);
    // console.log(app.views[0].history.pop('#'+this.props.location.pathname.split('/')));
    // console.log(app.views[0].history);
    // Add main View
    // let rindex     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
    // let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
    // if(rindex==0){
    //   $('[data-page="index"].page').removeClass('cached');
    // }
    // if(rindex >0){
    //   $('[data-page="'+history[rindex-1].slice(1, history[rindex-1].length)+'"].page').removeClass('cached');
    // }
    // console.log('beforeAddview');
    // console.log($('.navbar-inner.ssr'));
    let view = app.addView('.view-main', {
      // Enable dynamic Navbar
      dynamicNavbar: true,
      // Enable Dom Cache so we can use all inline pages
      domCache: true
    });
            let routeOld;
            let onSwipe;
            var isBack=0;
            // onSwipe = Session.get('onSwipe');
            // if(!!onSwipe)onSwipe.remove();
             routeOld= Session.get('routeOld')
            // console.log(this.props.location);
            // get the Route Name like /about -> get "about"
            var routeName;
            // routeName= FlowRouter.current().route.path.split('/');
            routeName = component.props.location.pathname.split('/');
            if(routeName[1]=="")routeName.splice(1, 1);
            // get the Route URL like /about/12sd -> get "/about"
            var routeNew;
            // routeNew = FlowRouter.current().path;
            routeNew = component.props.location.pathname;
            if(routeOld==routeNew){
              routeOld = undefined;
            }
            Session.set('routeOld', routeOld);
            if(sessionStorage.getItem('history')==undefined){
              var array = ['#index'];
              // console.log(app.views[0].history);
              // let routeName;
              // routeName = component.props.location.pathname.split('/')[1];
              history = ['#index']
              if(!!routeName[1])history.push('#'+routeName[1]);
              // console.log(history);
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
              // console.log(route);
              theIndex = index;
              // console.log(index);
              if(routeNew==route[index-1]){
                //go back
                // console.log('back');
                isBack=1;
                sessionStorage.setItem('historyRouteIndex',index-1);
              }else if((index+1)<route.length && routeNew==route[index+1]){
                //go forward but still in history
                // console.log('forward')
                // console.log(index);
                // console.log((index+1)<route.length );
                // console.log(routeNew==route[index+1]);
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
                // console.log(history);
                // if(!history){
                //   history = ['']
                // }
                history = history.slice(0, index+1);
                historyPosition = historyPosition.slice(0, index+1);
                // console.log(historyPosition);
                historyPosition.push(0);
                // console.log(history)
                for(let i=1; i<route.length; i++){
                  let tmp = route[i];
                  tmp = tmp.replace('/','#');
                  history.push(tmp);
                }
                route.push(routeNew);
                // console.log(history);
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



            // if( !routeOld){
            //   let history = JSON.parse(sessionStorage.getItem('history'));
            //   let k = history;
            //
            //   for(let i=0; i<k.length-1; i++){
            //     app.views[1].router.loadPage({
            //       pageName:   k[i].slice(1, k[i].length),
            //       animatePages: false
            //     });
            //   }
            //   options.animatePages=false;
            //
            //
            // }
            // console.log(routeOld);
            if( !routeOld){
              options.animatePages=false;
            }
            // console.log(app.views[0].history);
            // let tmp = app.views[0].history;
            // let item = '#'+this.props.location.pathname.split('/')[1];
            // // item.split(',')
            // console.log(item);
            // var index = tmp.indexOf(item);
            // if(index!=-1){
            //    tmp.splice(index, 1);
            // }
            // app.views[0].history = tmp;
            // app= new F7()
            // console.log(app.views[0].history.pop('#'+this.props.location.pathname.split('/')));
            // console.log(app.views[0].history);
            // console.log($.inArray('#'+pageName, app.views[1].history) > -1);
            // if(isBack==1 && $.inArray('#'+pageName, app.views[1].history) > -1){
            // $('.navbar-inner.ssr').remove()
            // $('.navbar-inner.ssr').remove()
            // $('.navbar-inner.ssr').remove()
            // $('.navbar-inner.ssr').remove()
            if(isBack==1 ){
              // console.log(Session.get('onSwipe'));
              if(Session.get('onSwipe')==0){
                // console.log('onSwipe');
                let history = JSON.parse(sessionStorage.getItem('history'));
                let k = history;
                let i     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                if(k[i].slice(1, k[i].length)!=='index'){
                  app.views[1].router.loadPage({
                    pageName:   k[i].slice(1, k[i].length),
                    animatePages: false
                  });
                }

                //
                //
                // // Session.set('onSwipe', 1)
                // // let component = this;
                // onSwipe = app.onPageBack(pageName, function(page){
                //   // console.log(page.swipeBack);
                //   // console.log(Session.get('onSwipe'));
                //   // if (page.swipeBack) {
                //   //   console.log('yo1');
                //   // }
                //   if(page.swipeBack){
                //     console.log('yo');
                //     let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                //     // let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
                //     // let backPage;
                //     // if(!!history[index-1]) backPage = history[index-1].slice(1, history[index-1].length);
                //     // console.log(backPage);
                //     // if(!!backPage){
                //     //   let center      = $('[data-page="'+backPage+'"].navbar-inner>.center');
                //     //   center.css( 'display'      , 'none'                               );
                //     // }
                //
                //     // let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
                //     let route = JSON.parse(sessionStorage.getItem('historyRoute'));
                //     //   let routeNew = FlowRouter.current().path;
                //     // sessionStorage.setItem('historyRouteIndex',index-1);
                //     Session.set('onSwipe', 0);
                //     // component.props.history.push(route[index-1]);
                //
                //     // component.props.history.
                //
                //     // component.props.history.push(route[index-1]);
                //     // component.props.history.goBack();
                //
                //     // FlowRouter.go(route[index-1]);
                //   }
                //   Session.set('onSwipe', 0);
                //
                //
                //   // onSwipe.remove();
                //   // if(page.swipeBack){
                //   //   let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
                //   //   let route = JSON.parse(sessionStorage.getItem('historyRoute'));
                //   //   let routeNew = FlowRouter.current().path;
                //   //   // if((sessionStorage.getItem('historyRoute')==undefined || routeNew==route[index])&& index==1){
                //   //     // FlowRouter.withReplaceState(function() {
                //   //       // Session.set('isBack', 1);
                //   //       sessionStorage.setItem('historyRouteIndex',index-1);
                //   //       FlowRouter.go(route[index-1]);
                //   //
                //   //   // setTimeout(function(){
                //   //   //   console.log("yo");
                //   //   // },0)
                //   // }
                //   // console.log(pageName);
                // });

                // setTimeout(function(){
                //   app.views[1].router.loadPage(options);
                // },0);


                // let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                // let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
                // let backPage;
                // if(!!history[index-1]) backPage = history[index-1].slice(1, history[index-1].length);
                // if(!options.animatePages || options.animatePages!==false){
                //
                //   if(!!backPage)$('[data-page="'+backPage+'"].page').removeClass('cached').addClass('page-on-left')
                //   if(!!backPage)$('[data-page="'+backPage+'"].navbar-inner').removeClass('cached').addClass('navbar-on-left')
                //   $('[data-page="'+pageName+'"].page').addClass('page-on-center').removeClass('cached')
                //   $('[data-page="'+pageName+'"].navbar-inner').addClass('navbar-on-center').removeClass('cached')
                //   var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                //   // console.log(pageName);
                //   var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                //   // console.log(titleWidth);
                //   let num         = ( titleWidth - barWidth )/2;
                //   let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                //   // console.log($('[data-page="'+pageName+'"].navbar-inner>.center'));
                //   center.css( 'left'      , 0                               );
                //   center.css( 'transform' , 'translate3d('+num+'px, 0px, 0px)' );
                //   center.css( 'transition', 'transform 0ms');
                //
                // }

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
                  // $('[data-page="'+k[i].slice(1, k[i].length)+'"].page').css('opacity', 0);
                  app.views[1].router.loadPage({
                    pageName:   k[i].slice(1, k[i].length),
                    animatePages: false
                  });
                  let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
                  if(historyPosition[i]>0){
                    $('[data-page="'+k[i].slice(1, k[i].length)+'"]>.page-content').scrollTop(historyPosition[i]);
                  }
                  // $('[data-page="'+k[i-1].slice(1, k[i-1].length)+'"].page').css('opacity', 1);

                }

                // let cb = app.onPageReinit(k[i].slice(1, k[i].length), function(){
                //   console.log('after load back page');
                //   cb.remove();
                // })
                // setTimeout(function(){
                  app.views[1].router.back();
                // }, 0);
                //@back instance change bar style
                setTimeout(function(){
                // //   $('[data-page="'+pageName+'"].navbar-inner').addClass('navbar-on-center').removeClass('navbar-on-left').removeClass('cached')
                  var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                  var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                  let num         = ( titleWidth - barWidth )/2;
                  let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                  center.css( 'left'      , num*2                               );
                  center.css( 'transform' , 'translate3d('+-num+'px, 0px, 0px)' );
                  center.css( 'transition', 'transform 400ms'                   );
                // //   let left = $('[data-page="'+pageName+'"].navbar-inner>.left>a>span:nth-child(3)');
                // //   let widthMargin = left.width()+7;
                // //   let widthMarginPadding = left.width()+14;
                // //   left.css( 'margin-left' , -widthMargin );
                // //   left.css('transform', 'translate3d('+widthMarginPadding+'px, 0px, 0px)');
                // //   left.css("transition", "transform 400ms");
                // //
                // //
                // //   //new
                // //   $('[data-page="'+backPage+'"].page').removeClass('cached').addClass('page-from-center-to-right')
                // //   // $('[data-page="'+backPage+'"].navbar-inner').removeClass('cached').addClass('navbar-on-left')
                // //   // $('[data-page="'+pageName+'"].page').css('z-index', '1');
                // //   $('[data-page="'+pageName+'"].page').addClass('page-on-center').removeClass('cached')
                // //   // $('[data-page="'+pageName+'"].navbar-inner').addClass('navbar-from-right-to-center').removeClass('cached')
                }, 0);
                // //
                let index = i-1;
                // let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                // let history   = JSON.parse( sessionStorage.getItem('history')           );
                let backPage  = history[index+1].slice(1, history[index+1].length);
                // //
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
                // //     let left = $('[data-page="'+pageName+'"].navbar-inner>.left>a>span:nth-child(3)');
                // //     left.css( 'margin-left' , '' );
                // //     left.css('transform', '');
                // //     left.css('transition', '')
                // //
                  }, 0);
                //
                })
              }
              isBack = 0;
            }else {
              // if(!routeOld){
              //   // console.log("old");
              //   // console.log("init");
              //   // console.log(app.views);
              //   app.views[1].router.loadPage(options);
              //   // console.log(app.views);
              //   // if(!!routeOldTmp)routeOld = routeOldTmp;
              // }else{
              //
                // setTimeout(function(){
                // console.log(app.views);
                // console.log('loadPage');
                // console.log(console.log($('.navbar-inner.ssr')));
                // $('.navbar-inner.ssr').ready(function(){
                //     if($('.navbar-inner.ssr').length){
                //       // $('.navbar-inner.ssr').on('click', function(){
                //       //   window.history.back();
                //       // })
                //       // location.reload();
                //       $('.navbar-inner.ssr').remove();
                //       // let index           = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
                //       // let history         = JSON.parse(sessionStorage.getItem('history'));
                //       // let pageName     = history[index].replace('#','');
                //       // console.log(pageName);
                //       // setTimeout(function(){
                //       //   $('.navbar-inner.ssr').ready(function(){
                //       //     if($('.navbar-inner.ssr').length){
                //       // $('[data-page="'+pageName+'"].navbar-inner').removeClass('navbar-from-center-to-left')
                //       // var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                //       // var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                //       // let num         = ( titleWidth - barWidth )/2;
                //       // let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                //       // center.css( 'left'      , num*2                               );
                //       // // center.css( 'transform' , 'translate3d('+-num+'px, 0px, 0px)' );
                //       //
                //       // center.css( 'transform' , 'translate3d(0px, 0px, 0px)' );
                //       // center.css( 'transition', 'transform 400ms'                   );
                //       console.log('remove the back');
                //     }
                // //     // loadF7(self, stateF7);
                //   })
                // app.onPageAfterAnimation(pageName, function(){
                //   setTimeout(function(){
                //     // console.log();
                //     // $('.navbar-inner.ssr').ready(function(){
                //     // console.log();
                //     if($('[data-page="'+pageName+'"].navbar-inner').hasClass('navbar-from-center-to-left')){
                //       var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                //       var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                //       let num         = ( titleWidth - barWidth )/2;
                //       let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                //       let left = $('[data-page="'+pageName+'"].navbar-inner>.left');
                //       // console.log(num);
                //       // center.css( 'left'      , num*2                               );
                //       // // center.css( 'transform' , 'translate3d('+-num+'px, 0px, 0px)' );
                //       //
                //       left.css( 'transform'   , '' );
                //       left.css( 'opacity'     , '1');
                //       center.css( 'transform' , 'translate3d(0px, 0px, 0px)' );
                //       center.css( 'opacity'     , '1');
                //       document.querySelectorAll("[data-page='"+pageName+"'].navbar-inner")[0].className
                //       = document.querySelectorAll("[data-page='"+pageName+"'].navbar-inner")[0].className.replace(/\bnavbar-from-center-to-left\b/,'');
                //       window.location.reload();
                //     }
                //     //
                //
                //         if($('.navbar-inner.ssr').length){
                //
                //
                //
                //           $('.navbar-inner.ssr').remove();
                //           // center.css( 'transform' , '' );
                //           // center.css( 'opacity'   , '1');
                //           // center.css( 'transition', '400ms'                   );
                //           // center.css( 'transform' , '' );
                //           // document.querySelectorAll("[data-page='about'].navbar-inner")[0].className
                //           // =
                //           // document.querySelectorAll("[data-page='about'].navbar-inner")[0].className.replace(/\bnavbar-from-center-to-left\b/,'');
                //           // $('[data-page="'+pageName+'"].navbar-inner').first().removeClass('navbar-from-center-to-left')
                //           // let index           = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
                //           // let history         = JSON.parse(sessionStorage.getItem('history'));
                //           // let pageName     = history[index].replace('#','');
                //           // console.log(pageName);
                //           // setTimeout(function(){
                //           //   $('.navbar-inner.ssr').ready(function(){
                //           //     if($('.navbar-inner.ssr').length){
                //           // $('[data-page="'+pageName+'"].navbar-inner').removeClass('navbar-from-center-to-left')
                //
                //           console.log('remove the back');
                //         }
                //       // })
                //
                //   },0)
                // })
                let i     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                if (i>0) {
                  let history = JSON.parse(sessionStorage.getItem('history'));
                  let k = history;
                  i-=1;
                  app.views[1].router.loadPage({
                    pageName:   k[i].slice(1, k[i].length),
                    animatePages: false
                  });
                  let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
                  if(historyPosition[i]>0){
                    $('[data-page="'+k[i].slice(1, k[i].length)+'"]>.page-content').scrollTop(historyPosition[i]);
                  }
                }
                // else{
                //   app.views[1].router.loadPage({
                //     pageName:   'index',
                //     animatePages: false
                //   });
                // }
                // console.log('afterbeforePage');
                // console.log($('.navbar-inner.ssr'));
                  // console.log(app.views[1].router);
                  // setTimeout(function(){
                  //if not index page load
                  if(!!routeName[1])app.views[1].router.loadPage(options);

                  // console.log('AfterLog');
                  // console.log($('.navbar-inner.ssr'));

                  // setTimeout(function(){
                  //   $('.navbar-inner.ssr').ready(function(){
                  //     if($('.navbar-inner.ssr').length){
                  //       // $('.navbar-inner.ssr').on('click', function(){
                  //       //   window.history.back();
                  //       // })
                  //       // location.reload();
                  //       $('.navbar-inner.ssr').remove();
                  //       // let index           = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
                  //       // let history         = JSON.parse(sessionStorage.getItem('history'));
                  //       // let pageName     = history[index].replace('#','');
                  //       // console.log(pageName);
                  //       // setTimeout(function(){
                  //       //   $('.navbar-inner.ssr').ready(function(){
                  //       //     if($('.navbar-inner.ssr').length){
                  //       // $('[data-page="'+pageName+'"].navbar-inner').removeClass('navbar-from-center-to-left')
                  //       // var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                  //       // var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                  //       // let num         = ( titleWidth - barWidth )/2;
                  //       // let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                  //       // center.css( 'left'      , num*2                               );
                  //       // // center.css( 'transform' , 'translate3d('+-num+'px, 0px, 0px)' );
                  //       //
                  //       // center.css( 'transform' , 'translate3d(0px, 0px, 0px)' );
                  //       // center.css( 'transition', 'transform 400ms'                   );
                  //       console.log('remove the back');
                  //     }
                  //     // loadF7(self, stateF7);
                  //   })
                  // },0)


                  // },0)
                  // console.log(app.views);
                // },0);
                // let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                // let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
                // let backPage;
                // if(!!history[index-1]) backPage = history[index-1].slice(1, history[index-1].length);
                // if(!options.animatePages || options.animatePages!==false){
                //   if(!!backPage)$('[data-page="'+backPage+'"].page').removeClass('cached').addClass('page-on-left')
                //   if(!!backPage)$('[data-page="'+backPage+'"].navbar-inner').removeClass('cached').addClass('navbar-on-left')
                //   $('[data-page="'+pageName+'"].page').addClass('page-from-right-to-center').removeClass('cached')
                //   $('[data-page="'+pageName+'"].navbar-inner').addClass('navbar-from-right-to-center').removeClass('cached')
                //   setTimeout(function(){
                //     $('[data-page="'+pageName+'"].page').removeClass('page-from-right-to-center').addClass('page-on-center')
                //     $('[data-page="'+pageName+'"].navbar-inner').removeClass('navbar-from-right-to-center').addClass('navbar-on-center')
                //   },400)
                //
                //   //nav animation
                //   var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                //   var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                //   let num         = ( titleWidth - barWidth )/2;
                //   let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                //   center.css( 'left'      , 0                               );
                //   center.css( 'transform' , 'translate3d('+num+'px, 0px, 0px)' );
                //   center.css( 'transition', 'transform 400ms'                   );
                //   let left = $('[data-page="'+pageName+'"].navbar-inner>.left>a>span:nth-child(3)');
                //   let widthMargin = left.width()-7;
                //   let widthMarginPadding = left.width()-14;
                //   left.css( 'margin-left' , +widthMargin );
                //   left.css('transform', 'translate3d('+-widthMarginPadding+'px, 0px, 0px)');
                //   left.css("transition", "transform 400ms");

                // }
              // }

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
            // console.log(app);
            // let component = this;
            onSwipe = app.onPageBack(pageName, function(page){
              // console.log(page.swipeBack);
              // console.log(Session.get('onSwipe'));
              // if (page.swipeBack) {
              //   console.log('yo1');
              // }
              if(Session.get('onSwipe')==1 && page.swipeBack){
                // console.log('yo');
                let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
                // let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
                // let backPage;
                // if(!!history[index-1]) backPage = history[index-1].slice(1, history[index-1].length);
                // console.log(backPage);
                // if(!!backPage){
                //   let center      = $('[data-page="'+backPage+'"].navbar-inner>.center');
                //   center.css( 'display'      , 'none'                               );
                // }

                // let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
                let route = JSON.parse(sessionStorage.getItem('historyRoute'));
                //   let routeNew = FlowRouter.current().path;
                // sessionStorage.setItem('historyRouteIndex',index-1);
                Session.set('onSwipe', 0);
                // component.props.history.push(route[index-1]);
                component.props.history.goBack();
                // FlowRouter.go(route[index-1]);
              }
              Session.set('onSwipe', 0);
              // onSwipe.remove();
              // if(page.swipeBack){
              //   let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
              //   let route = JSON.parse(sessionStorage.getItem('historyRoute'));
              //   let routeNew = FlowRouter.current().path;
              //   // if((sessionStorage.getItem('historyRoute')==undefined || routeNew==route[index])&& index==1){
              //     // FlowRouter.withReplaceState(function() {
              //       // Session.set('isBack', 1);
              //       sessionStorage.setItem('historyRouteIndex',index-1);
              //       FlowRouter.go(route[index-1]);
              //
              //   // setTimeout(function(){
              //   //   console.log("yo");
              //   // },0)
              // }
              // console.log(pageName);
            });

            // let appCycle = app.onPageAfterAnimation(pageName, function(){
            //   onSwipe.remove();
            //   appCycle.remove();
            // })

            // let appInit = app.onPageInit(pageName, function(){
            //   onSwipe.remove();
            //   appInit.remove();
            // })
            // let appReinit= app.onPageReinit(pageName, function(){
            //   onSwipe.remove();
            //   appReinit.remove();
            // })

            // app.onSwipeBackMove(pageName, function(page) {
            //   console.log("swipeBack");
            // })
            // console.log(app.views[0].activePage.swipeBack);

            if(sessionStorage.getItem('historyRoute')==undefined){
              // console.log("what!");
            }else{
              let route = JSON.parse(sessionStorage.getItem('historyRoute'));
              let index = theIndex;
              let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));

              let currentName     =
                ( routeName[routeName.length-1]!==''  ) ? routeName[routeName.length-1] : 'index';
              let currentIndex    = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
              // console.log('check index');
              // console.log();
              // console.log(index);
              //
              if(routeNew==route[index-1]){
                //go back
                // console.log('back');
                // $('[data-page="'+currentName+'"]>.page-content').ready(function(){
                  $('[data-page="'+currentName+'"]>.page-content').scrollTop(historyPosition[currentIndex]);
                // })
                // console.log('yo'+currentName+currentIndex);
                // $('[data-page="index"]>.page-content').scrollTop(52);
              }else if((index+1)<route.length && routeNew==route[index+1]){
                //go forward but still in history
                // console.log('forward')
                $('[data-page="'+currentName+'"]>.page-content').scrollTop(historyPosition[currentIndex]);
              }else if(routeNew==route[index]){
                //refresh paged
                // console.log('refresh');
              }else if(routeNew!=='/'){
                //discover to new page
                // console.log('new')
              }
            }


            if(!!routeOld && routeOld!==routeNew){  //Is not initial or reload
              // console.log(app.views[0].history)
              // let history = app.views[0].history;
              // if(history.indexOf('#undefined')!==-1)history.splice(history.indexOf('#undefined'),1);
              // console.log(history);
              let history = JSON.parse(sessionStorage.getItem('history'));
              // console.log(history);
              // if(!history){
              //   history = ['']
              // }
              let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
              let route = JSON.parse(sessionStorage.getItem('historyRoute'));
              history = history.slice(0, index+1);
              // console.log(history)
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

              $('[data-page="'+currentName+'"]>.page-content').scrollTop(historyPosition[index]);
              // console.log('scrolled');
              // console.log(historyPosition[index]);
              // console.log(currentName);
            }


            // console.log(app.views[0].history);
            // console.log(app.views[0].history.push('#'+this.props.location.pathname.split('/')));
            // console.log(app.views[0].history);
            // console.log('beforeMergeView');
            // console.log($('.navbar-inner.ssr'));
            app.views=[app.views[0]];
            // console.log('afterMergeView');
            // console.log($('.navbar-inner.ssr'));
            Session.set('isBack', undefined);
            Session.set('routeOld', routeNew);
            // Session.set('onSwipe', onSwipe);
            routeOld = routeNew;
            // $('.navbar-inner.ssr').ready(function() {
            //   $('.navbar-inner.ssr').remove();
            //   console.log('kill ssr bar');
            // })
    // this.setState({f7: app});
  }
}
export default loadF7;
