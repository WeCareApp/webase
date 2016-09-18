function loadF7(component, f7){
  if(!Meteor.isServer) {
    let app = f7;
    let view = app.addView('.view-main', {
      // Enable dynamic Navbar
      dynamicNavbar: true,
      // Enable Dom Cache so we can use all inline pages
      domCache: true
    });

    let isRefresh = JSON.parse(sessionStorage.getItem('isRefresh'))

    let onSwipe;
    let isBack = 0;
    let routeOld;
    routeOld= Session.get('routeOld')
    var routeNew;
    routeNew = component.props.location.pathname;
    if(JSON.parse(sessionStorage.getItem('historyAction'))=='back')isBack=1;
    var routeName;
    routeName = component.props.location.pathname.split('/');
    if(routeName[1]=="")routeName.splice(1, 1);
            var options = {};
            if(routeName[routeName.length-1]!=='')var pageName = routeName[routeName.length-1];
            else var pageName = 'index';
            options.pageName= pageName;
            if(isRefresh==1){
              options.animatePages=false;
            }
            if(isBack==1 ){
              if(Session.get('onSwipe')==0){
                let history = JSON.parse(sessionStorage.getItem('history'));
                let k = history;
                let i     = JSON.parse( sessionStorage.getItem('historyIndex') );
                // if(k[i]!=='index'){
                  app.views[1].router.loadPage({
                    pageName:   k[i],
                    animatePages: false
                  });
                  if($('[data-page="'+k[i+1]+'"].page').hasClass("page-transitioning")){
                    $('[data-page="'+k[i+1]+'"].page').remove()
                  }else{
                    $('[data-page="'+k[i+1]+'"].page').addClass('cached').removeClass('page-on-left')
                  }
                  if($('[data-page="'+k[i+1]+'"].navbar-inner').hasClass("navbar-on-right")){
                    $('[data-page="'+k[i+1]+'"].navbar-inner').remove()
                  }else{
                    $('[data-page="'+k[i+1]+'"].navbar-inner').addClass('cached').removeClass('navbar-on-left')
                  }
                    // $('[data-page="'+pageName+'"].navbar-inner').remove()
                  // $('[data-page="'+k[i+1]+'"].navbar-inner').addClass('cached').removeClass('navbar-on-left')
                  if(i>0){
                    $('[data-page="'+k[i-1]+'"].page').removeClass('cached').addClass('page-on-left')
                    $('[data-page="'+k[i-1]+'"].navbar-inner').removeClass('cached').addClass('navbar-on-left')
                  }
                  // app.views[1].router.back({
                  //   animatePages: false
                  // })
                // }

              }else{
                //back action
                // console.log('back');
                let history = JSON.parse(sessionStorage.getItem('history'));
                let k = history;
                let i     = JSON.parse( sessionStorage.getItem('historyIndex') );
                if(k[i]!=='index'){
                // $('[data-page="'+k[i].slice(1, k[i].length)+'"].page').css('opacity', 0);
                  // app.views[1].router.loadPage({
                  //   pageName:   k[i].slice(1, k[i].length),
                  //   animatePages: false
                  // });
                }
                // i+=1;
                if(!!k[i+1]){
                  // app.views[1].router.loadPage({
                  //   pageName:   k[i+1],
                  //   animatePages: false
                  // });
                  let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
                  // if(historyPosition[i]>0){
                    // $('[data-page="'+k[i].slice(1, k[i].length)+'"]>.page-content').scrollTop(historyPosition[i]);
                  // }
                }

                app.views[1].router.back();
                // setTimeout(()=>{
                //   app.views[1].router.loadPage({
                //      pageName:   k[i],
                //      animatePages: false
                //   });
                // },4000)

                // app.views[1].router.loadPage({
                //   pageName: k[i]
                // })
                //@back instance change bar style

                // setTimeout(function(){
                //   var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                //   var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                //   let num         = ( titleWidth - barWidth )/2;
                //   let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                //   center.css( 'left'      , num*2                               );
                //   center.css( 'transform' , 'translate3d('+-num+'px, 0px, 0px)' );
                //   center.css( 'transition', 'transform 400ms'                   );
                // }, 0);
                // let index = i;
                let backPage  = history[i+1];
                // // // //make static after back change
                app.onPageAfterBack(backPage, function(){
                //   // console.log('done render');

                  setTimeout(function(){
                // //     if(i>0){
                // //       // $('[data-page="'+history[i-2]+'"].page').removeClass('cached');
                // //       $('[data-page="'+k[i-1]+'"].page').removeClass('cached').addClass('page-on-left')
                // //       $('[data-page="'+k[i-1]+'"].navbar-inner').removeClass('cached').addClass('navbar-on-left')
                // //     }
                // //     var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
                // //     var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
                // //     let num         = ( titleWidth - barWidth )/2;
                // //     let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
                // //     center.css( 'left'      , num                          );
                // //     center.css( 'transform' , '' );
                // //     center.css( 'transition', ''                           );
                //       $('[data-page="'+history[i-1]+'"].navbar-inner').removeClass('cached');
                    if(i>0){
                      $('[data-page="'+k[i-1]+'"].page').removeClass('cached').addClass('page-on-left')
                      $('[data-page="'+k[i-1]+'"].navbar-inner').removeClass('cached').addClass('navbar-on-left')
                    }
                  }, 0);

                })
              }
              isBack = 0;
            }else {
                // let i     = JSON.parse( sessionStorage.getItem('historyIndex') );
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
                  // if(!!routeName[1])
                  app.views[1].router.loadPage(options);

            }
            let index     = JSON.parse( sessionStorage.getItem('historyIndex') );
            let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
            let backPage;
            if(!!history[index-1]) backPage = history[index-1];

            // var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
            // var titleWidth  = $('.navbar-on-left.navbar-inner>.center').width();
            // let num         = ( titleWidth - barWidth )/2;
            // let onLeft      = $('.navbar-on-left.navbar-inner>.center');
            // onLeft.css( 'left'      , 0                               );
            // onLeft.css( 'transform' , 'translate3d('+num+'px, 0px, 0px)' );
            // onLeft.css( 'transition', 'transform 0ms'                   );

            setTimeout(function(){
              var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
              var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
              let num         = ( titleWidth - barWidth )/2;
              let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
              center.css( 'left'      , num                          );
              center.css( 'transform' , '' );
              center.css( 'transition', ''                           );
                // $('[data-page="'+history[i-2]+'"].navbar-inner').removeClass('cached');
            }, 0);

            Session.set('onSwipe', 1);

            let keepPage, keepNav;

            // app.onPageBeforeaAnimation(pageName, function(page){
            //   if(Session.get('onSwipe')==1 && page.swipeBack){
            //     keepPage = $('[data-page="'+pageName+'"].page')
            //     keepNav  = $('[data-page="'+pageName+'"].navbar-inner')
            //   }
            // })

            // let time = 0
            //

            let timeBeforeRemove = 1;
            app.onPageBack(pageName, function(page){
              if(Session.get('onSwipe')==1 && page.swipeBack
                // && time==0
              ){
                // timeBeforeRemove=1
            //     // alert(page.swipeBack)
            //     keepPage = $('[data-page="'+pageName+'"].page')
            //     keepNav  = $('[data-page="'+pageName+'"].navbar-inner')
            //     // if(!$('[data-page="'+pageName+'"].page')[0]){
            //       // $('.pages').append(keepPage)
            //     // }
            //     // if(!$('[data-page="'+pageName+'"].navbar-inner')[0]){
            //       // $('.navbar').append(keepNav)
            //       time++
            //     // }
            //     // $('.navbar').append(keepNav)
            //     // $('.pages').append(keepPage)
            //     // $('[data-page="'+pageName+'"].navbar-inner').addClass('cached')
            //     // $('[data-page="'+pageName+'"].page').addClass('cached')
              }
            })
            // var BR = app.onPageBeforeRemove(pageName, function(page){
            //   if(timeBeforeRemove==1){
            //
            //     // console.log(page);
            //     // alert('BR')
            //     // component.props.history.goBack();
            //     timeBeforeRemove=0
            //     BR.remove()
            //   }

            //   if(timeBeforeRemove==0){
            //
            //     alert('no')
            //     $('.pages').append(keepPage)
            //   // }
            //   // if(!$('[data-page="'+pageName+'"].navbar-inner')[0]){
            //     $('.navbar').append(keepNav)
            //     // console.log(page);
            //     timeBeforeRemove++
            //   }
            // })

            onSwipe = app.onPageAfterBack(pageName, function(page){
              if(Session.get('onSwipe')==1 && page.swipeBack){
                // alert(page.swipeBack);
                // if(!$('[data-page="'+pageName+'"].page')[0]){
                  // $('.pages').append(keepPage)
                // }
                // if(!$('[data-page="'+pageName+'"].navbar-inner')[0]){
                  // $('.navbar').append(keepNav)
                // }
                let index     = JSON.parse( sessionStorage.getItem('historyIndex') );
                let route = JSON.parse(sessionStorage.getItem('historyRoute'));
                Session.set('onSwipe', 0);
                // alert('back')
                component.props.history.goBack();
                // console.log(!$('[data-page="'+pageName+'"].page')[0]);
                // setTimeout(function(){
                  // component.props.history.goBack();
                // },0)

                // keepNav.remove()
                // keepPage.remove()
                // setTimeout(function(){
                //   $('[data-page="'+pageName+'"].page').remove()
                //   $('[data-page="'+pageName+'"].navbar-inner').remove()
                //
                // },0)

              }
              Session.set('onSwipe', 0);
            });


          // get to scroll position
          // if(sessionStorage.getItem('historyRoute')==undefined){
          //     // console.log("what!");
          //   }else{
          //     let route = JSON.parse(sessionStorage.getItem('historyRoute'));
          //     let index = theIndex;
          //     let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
          //
          //     let currentName     =
          //       ( routeName[routeName.length-1]!==''  ) ? routeName[routeName.length-1] : 'index';
          //     let currentIndex    = JSON.parse(sessionStorage.getItem('historyIndex'));
          //     alert(currentIndex);
          //     alert(index)
          //     if(routeNew==route[index-1]){
          //       //go back
          //         // $('[data-page="'+currentName+'"]>.page-content').scrollTop(historyPosition[currentIndex]);
          //     }else if((index+1)<route.length && routeNew==route[index+1]){
          //       //go forward but still in history
          //       // console.log('forward')
          //       // $('[data-page="'+currentName+'"]>.page-content').scrollTop(historyPosition[currentIndex]);
          //     }else if(routeNew==route[index]){
          //       //refresh paged
          //       // console.log('refresh');
          //     }else if(routeNew!=='/'){
          //       //discover to new page
          //       // console.log('new')
          //     }
          //   }


            if(!!routeOld && routeOld!==routeNew){  //Is not initial or reload
              let history = JSON.parse(sessionStorage.getItem('history'));
              let index = JSON.parse(sessionStorage.getItem('historyIndex'));
              let route = JSON.parse(sessionStorage.getItem('historyRoute'));
              history = history.slice(0, index+1);
              for(let i=1; i<route.length; i++){
                let tmp = route[i];
                tmp = tmp.replace('/','');
                history.push(tmp);
              }
              sessionStorage.setItem('history', JSON.stringify($.unique(history)));
            }else{// Initial or reload
              let index           = JSON.parse(sessionStorage.getItem('historyIndex'));
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
