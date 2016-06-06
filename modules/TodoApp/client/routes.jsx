import { Route, IndexRoute } from 'react-router';
//import { FlowRouter } from 'meteor/meteorhacks:flow-router';
//import { ReactLayout } from 'meteor/kadira:react-layout';

import TodoApp from './index';
import TodoMain from './TodoMain';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import AsyncRoute from './AsyncRoute.jsx';
// import { loadF7 }     from './components/LoadF7';

// LoadF7;

// import F7 from './f7/js/f7';
//
// let loadF7= function(content) {
//   // console.log(this.state.f7);
// }

// let loadF7= function(content) {
//   if(!Meteor.isServer) {
//
//       let app = new F7();
//
//     //this.setState({app: app});
//
//     // Add main View
//     let view = app.addView('.view-main', {
//       // Enable dynamic Navbar
//       dynamicNavbar: true,
//       // Enable Dom Cache so we can use all inline pages
//       domCache: true
//     });
//
//     let routeOld;
//     let onSwipe;
//     var isBack=0;
//     // onSwipe = Session.get('onSwipe');
//     // if(!!onSwipe)onSwipe.remove();
//      routeOld= Session.get('routeOld')
//     var routeName = FlowRouter.current().route.path.split('/');
//     if(routeName[1]=="")routeName.splice(1, 1);
//     var routeNew = FlowRouter.current().path;
//     if(routeOld==routeNew){
//       routeOld = undefined;
//     }
//     Session.set('routeOld', routeOld);
//     if(sessionStorage.getItem('history')==undefined){
//       // var array = ['#index'];
//       // console.log(app.views[0].history);
//       let history = ['#index']
//       if(!!routeName[1])history.push('#'+routeName[1]);
//       // console.log(history);
//       sessionStorage.setItem('history', JSON.stringify(history));
//     }
//     if(sessionStorage.getItem('historyRoute')==undefined){
//       window.history.back();// initial load up, because it load up two times, so back one time.
//       let route = ['/'];
//       if(routeNew!=='/'){
//         route.push(routeNew);
//         sessionStorage.setItem('historyRouteIndex',1)
//       }else{
//         sessionStorage.setItem('historyRouteIndex',0)
//       }
//       sessionStorage.setItem('historyRoute', JSON.stringify(route));
//       // console.log("what!");
//     }else{
//       let route = JSON.parse(sessionStorage.getItem('historyRoute'));
//       let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
//       if(routeNew==route[index-1]){
//         //go back
//         // console.log('back');
//         isBack=1;
//         sessionStorage.setItem('historyRouteIndex',index-1);
//       }else if((index+1)<route.length && routeNew==route[index+1]){
//         //go forward but still in history
//         // console.log('forward')
//         // console.log(index);
//         // console.log((index+1)<route.length );
//         // console.log(routeNew==route[index+1]);
//         isBack= 0;
//         sessionStorage.setItem('historyRouteIndex',index+1);
//       }else if(routeNew==route[index]){
//         //refresh paged
//         if(routeOld!=undefined)window.history.back();// initial load up, because it load up two times, so back one time.
//         // console.log('refresh');
//       }else if(routeNew!=='/'){
//         //discover to new page
//         // console.log('new')
//         isBack=0;
//         route = route.slice(0, index+1);
//         let history = JSON.parse(sessionStorage.getItem('history'));
//         // console.log(history);
//         // if(!history){
//         //   history = ['']
//         // }
//         history = history.slice(0, index+1);
//         // console.log(history)
//         for(let i=1; i<route.length; i++){
//           let tmp = route[i];
//           tmp = tmp.replace('/','#');
//           history.push(tmp);
//         }
//         route.push(routeNew);
//         // console.log(history);
//         sessionStorage.setItem('history', JSON.stringify(history));
//         sessionStorage.setItem('historyRoute', JSON.stringify(route));
//         sessionStorage.setItem('historyRouteIndex',index+1);
//       }
//     }
//     var options = {};
//     if(routeName[routeName.length-1]!=='')var pageName = routeName[routeName.length-1];
//     else var pageName = 'index';
//     options.pageName= pageName;
//
//     if( !routeOld){
//       let history = JSON.parse(sessionStorage.getItem('history'));
//       let k = history;
//
//       for(let i=0; i<k.length-1; i++){
//         app.views[0].router.loadPage({
//           pageName:   k[i].slice(1, k[i].length),
//           animatePages: false
//         });
//       }
//       options.animatePages=false;
//
//
//     }
//
//     if(isBack==1 && $.inArray('#'+pageName, app.views[0].history) > -1){
//       if(Session.get('onSwipe')==0){
//         setTimeout(function(){
//           app.views[0].router.loadPage(options);
//         },0);
//         let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
//         let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
//         let backPage;
//         if(!!history[index-1]) backPage = history[index-1].slice(1, history[index-1].length);
//         if(!options.animatePages || options.animatePages!==false){
//
//           if(!!backPage)$('[data-page="'+backPage+'"].page').removeClass('cached').addClass('page-on-left')
//           if(!!backPage)$('[data-page="'+backPage+'"].navbar-inner').removeClass('cached').addClass('navbar-on-left')
//           $('[data-page="'+pageName+'"].page').addClass('page-on-center').removeClass('cached')
//           $('[data-page="'+pageName+'"].navbar-inner').addClass('navbar-on-center').removeClass('cached')
//           var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
//           // console.log(pageName);
//           var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
//           // console.log(titleWidth);
//           let num         = ( titleWidth - barWidth )/2;
//           let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
//           // console.log($('[data-page="'+pageName+'"].navbar-inner>.center'));
//           center.css( 'left'      , 0                               );
//           center.css( 'transform' , 'translate3d('+num+'px, 0px, 0px)' );
//           center.css( 'transition', 'transform 0ms');
//           // setTimeout(function(){
//           //   $('[data-page="'+pageName+'"].page').removeClass('page-from-right-to-center').addClass('page-on-center')
//           //   $('[data-page="'+pageName+'"].navbar-inner').removeClass('navbar-from-right-to-center').addClass('navbar-on-center')
//           // },400)
//
//           //nav animation
//
//           // let left = $('[data-page="'+pageName+'"].navbar-inner>.left>a>span:nth-child(3)');
//           // let widthMargin = left.width()-7;
//           // let widthMarginPadding = left.width()-14;
//           // left.css( 'margin-left' , +widthMargin );
//           // left.css('transform', 'translate3d('+-widthMarginPadding+'px, 0px, 0px)');
//           // left.css("transition", "transform 400ms");
//         }
//
//       }else{
//         //back action
//         setTimeout(function(){
//           app.views[0].router.back();
//         }, 0);
//         //@back instance change bar style
//         setTimeout(function(){
//           $('[data-page="'+pageName+'"].navbar-inner').addClass('navbar-on-center').removeClass('navbar-on-left').removeClass('cached')
//           var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
//           var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
//           let num         = ( titleWidth - barWidth )/2;
//           let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
//           center.css( 'left'      , num*2                               );
//           center.css( 'transform' , 'translate3d('+-num+'px, 0px, 0px)' );
//           center.css( 'transition', 'transform 400ms'                   );
//           let left = $('[data-page="'+pageName+'"].navbar-inner>.left>a>span:nth-child(3)');
//           let widthMargin = left.width()+7;
//           let widthMarginPadding = left.width()+14;
//           left.css( 'margin-left' , -widthMargin );
//           left.css('transform', 'translate3d('+widthMarginPadding+'px, 0px, 0px)');
//           left.css("transition", "transform 400ms");
//
//
//           //new
//           $('[data-page="'+backPage+'"].page').removeClass('cached').addClass('page-from-center-to-right')
//           // $('[data-page="'+backPage+'"].navbar-inner').removeClass('cached').addClass('navbar-on-left')
//           // $('[data-page="'+pageName+'"].page').css('z-index', '1');
//           $('[data-page="'+pageName+'"].page').addClass('page-on-center').removeClass('cached')
//           // $('[data-page="'+pageName+'"].navbar-inner').addClass('navbar-from-right-to-center').removeClass('cached')
//         }, 0);
//
//         let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
//         let history   = JSON.parse( sessionStorage.getItem('history')           );
//         let backPage  = history[index+1].slice(1, history[index+1].length);
//
//         //make static after back change
//         app.onPageAfterBack(backPage, function(){
//           setTimeout(function(){
//             var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
//             var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
//             let num         = ( titleWidth - barWidth )/2;
//             let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
//             center.css( 'left'      , num                          );
//             center.css( 'transform' , '' );
//             center.css( 'transition', ''                           );
//             let left = $('[data-page="'+pageName+'"].navbar-inner>.left>a>span:nth-child(3)');
//             left.css( 'margin-left' , '' );
//             left.css('transform', '');
//             left.css('transition', '')
//
//           }, 0);
//
//         })
//       }
//       isBack = 0;
//     }else {
//       // console.log($('[data-page="'+pageName+'"].page').hasClass('page-on-center'))
//       // if($('[data-page="'+pageName+'"].page').hasClass('page-on-center')){
//       //   console.log($('[data-page="'+pageName+'"].page').hasClass('page-on-center'))
//       //   console.log(routeOld);
//       //   var routeOldTmp = routeOld;
//       //   routeOld = undefined;
//       // }
//       if(!routeOld){
//         // console.log("old");
//         app.views[0].router.loadPage(options);
//         // if(!!routeOldTmp)routeOld = routeOldTmp;
//       }else{
//         setTimeout(function(){
//           app.views[0].router.loadPage(options);
//         },0);
//         let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
//         let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
//         let backPage;
//         if(!!history[index-1]) backPage = history[index-1].slice(1, history[index-1].length);
//         if(!options.animatePages || options.animatePages!==false){
//           if(!!backPage)$('[data-page="'+backPage+'"].page').removeClass('cached').addClass('page-on-left')
//           if(!!backPage)$('[data-page="'+backPage+'"].navbar-inner').removeClass('cached').addClass('navbar-on-left')
//           $('[data-page="'+pageName+'"].page').addClass('page-from-right-to-center').removeClass('cached')
//           $('[data-page="'+pageName+'"].navbar-inner').addClass('navbar-from-right-to-center').removeClass('cached')
//           setTimeout(function(){
//             $('[data-page="'+pageName+'"].page').removeClass('page-from-right-to-center').addClass('page-on-center')
//             $('[data-page="'+pageName+'"].navbar-inner').removeClass('navbar-from-right-to-center').addClass('navbar-on-center')
//           },400)
//
//           //nav animation
//           var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
//           var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
//           let num         = ( titleWidth - barWidth )/2;
//           let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
//           center.css( 'left'      , 0                               );
//           center.css( 'transform' , 'translate3d('+num+'px, 0px, 0px)' );
//           center.css( 'transition', 'transform 400ms'                   );
//           let left = $('[data-page="'+pageName+'"].navbar-inner>.left>a>span:nth-child(3)');
//           let widthMargin = left.width()-7;
//           let widthMarginPadding = left.width()-14;
//           left.css( 'margin-left' , +widthMargin );
//           left.css('transform', 'translate3d('+-widthMarginPadding+'px, 0px, 0px)');
//           left.css("transition", "transform 400ms");
//
//           // $('[data-page="'+backPage+'"].page')
//           // $('[data-page="'+backPage+'"].navbar-inner')
//         }
//       }
//
//     }
//     let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
//     let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
//     let backPage;
//     if(!!history[index-1]) backPage = history[index-1].slice(1, history[index-1].length);
//
//     var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
//     var titleWidth  = $('.navbar-on-left.navbar-inner>.center').width();
//     let num         = ( titleWidth - barWidth )/2;
//     let onLeft      = $('.navbar-on-left.navbar-inner>.center');
//     onLeft.css( 'left'      , 0                               );
//     onLeft.css( 'transform' , 'translate3d('+num+'px, 0px, 0px)' );
//     onLeft.css( 'transition', 'transform 0ms'                   );
//     Session.set('onSwipe', 1);
//     // console.log(app);
//     onSwipe = app.onPageBack(pageName, function(page){
//       // console.log(page.swipeBack);
//       // console.log(Session.get('onSwipe'));
//       if(Session.get('onSwipe')==1 && page.swipeBack){
//         // console.log('yo');
//         let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
//         // let history   = JSON.parse( sessionStorage.getItem('history')           ) ;
//         // let backPage;
//         // if(!!history[index-1]) backPage = history[index-1].slice(1, history[index-1].length);
//         // console.log(backPage);
//         // if(!!backPage){
//         //   let center      = $('[data-page="'+backPage+'"].navbar-inner>.center');
//         //   center.css( 'display'      , 'none'                               );
//         // }
//
//         // let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
//         let route = JSON.parse(sessionStorage.getItem('historyRoute'));
//         //   let routeNew = FlowRouter.current().path;
//         // sessionStorage.setItem('historyRouteIndex',index-1);
//         FlowRouter.go(route[index-1]);
//       }
//       Session.set('onSwipe', 0);
//       onSwipe.remove();
//       // if(page.swipeBack){
//       //   let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
//       //   let route = JSON.parse(sessionStorage.getItem('historyRoute'));
//       //   let routeNew = FlowRouter.current().path;
//       //   // if((sessionStorage.getItem('historyRoute')==undefined || routeNew==route[index])&& index==1){
//       //     // FlowRouter.withReplaceState(function() {
//       //       // Session.set('isBack', 1);
//       //       sessionStorage.setItem('historyRouteIndex',index-1);
//       //       FlowRouter.go(route[index-1]);
//       //
//       //   // setTimeout(function(){
//       //   //   console.log("yo");
//       //   // },0)
//       // }
//       // console.log(pageName);
//     });
//     let appCycle = app.onPageAfterAnimation(pageName, function(){
//       onSwipe.remove();
//       appCycle.remove();
//     })
//     // let appInit = app.onPageInit(pageName, function(){
//     //   onSwipe.remove();
//     //   appInit.remove();
//     // })
//     // let appReinit= app.onPageReinit(pageName, function(){
//     //   onSwipe.remove();
//     //   appReinit.remove();
//     // })
//
//     // app.onSwipeBackMove(pageName, function(page) {
//     //   console.log("swipeBack");
//     // })
//     // console.log(app.views[0].activePage.swipeBack);
//     if(!!routeOld && routeOld!==routeNew){
//       // console.log(app.views[0].history)
//       // let history = app.views[0].history;
//       // if(history.indexOf('#undefined')!==-1)history.splice(history.indexOf('#undefined'),1);
//       // console.log(history);
//       let history = JSON.parse(sessionStorage.getItem('history'));
//       // console.log(history);
//       // if(!history){
//       //   history = ['']
//       // }
//       let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
//       let route = JSON.parse(sessionStorage.getItem('historyRoute'));
//       history = history.slice(0, index+1);
//       // console.log(history)
//       for(let i=1; i<route.length; i++){
//         let tmp = route[i];
//         tmp = tmp.replace('/','#');
//         history.push(tmp);
//       }
//       sessionStorage.setItem('history', JSON.stringify($.unique(history)));
//     }
//     app.views=[app.views[0]];
//     Session.set('isBack', undefined);
//     Session.set('routeOld', routeNew);
//     // Session.set('onSwipe', onSwipe);
//     routeOld = routeNew;
//
//     // Pass instance to state to pass to children.
//     // We are anyhow able to always get the instance via new F7()
//     // this.setState({f7: app});
//   }
// }
// let WeactLayout = {};
// WeactLayout.render = function(fieldIn){
//   require.ensure([], () => {
//     let field = fieldIn || {};
//     let NavbarIndex = require('./components/navbar/index').default;
//     let NavbarAbout = require('./components/navbar/about').default;
//     let NavbarForm  = require('./components/navbar/form').default;
//     let PageAbout   = require('./components/page/about').default;
//     let PageForm    = require('./components/page/form').default;
//     let PageIndex   = require('./components/page/index').default;
//     let PageRoot   = require('./components/page/root').default;
//     // let Dashboard = require('./Dashboard');
//     // console.log(sessionStorage.getItem('history'))
//     let route = JSON.parse(sessionStorage.getItem('historyRoute'));
//     let history = JSON.parse(sessionStorage.getItem('history'));
//     let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
//     // history = history.slice(0, index+1);
//     let item=[];
//     let currentName = FlowRouter.current().route.path.split('/')[1];
//     if( currentName == "")currentName= 'index';
//     var navbar = ['index'];
//     let page   = ['root','index'];
//     if(currentName!=='index'){
//       navbar.push(currentName);
//       page.push(currentName);
//     }
//     if(!!history){
//       // navbar="<div>"
//       navbar  = ['index'];
//       page    = ['root','index'];
//       // console.log(history.length);
//       for(let i=1; i<history.length; i++){
//         let tmp = history[i];
//         // console.log(tmp);
//         tmp = tmp.replace('#','');
//         navbar.push(tmp);
//         page.push(tmp);
//       }
//       if(currentName!=='index' && navbar.indexOf(currentName)<0)navbar.push(currentName);
//       if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
//     }
//     // console.log(navbar);
//     // console.log(page);
//
//     let WeactNavbar = React.createClass({
//       render: function() {
//         var navbarP = this.props.navbar;
//         // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
//         return (
//           <div className="navbar">
//           {navbarP.map(function(tmp, i){
//             let name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
//             let Navbar = eval(name);
//             if(tmp=='index' && currentName =='index')
//               return  <Navbar class='navbar-inner cached'         key={i}/>;
//             return    <Navbar class='navbar-inner cached'  key={i}/>;
//           })}
//           </div>
//         )
//       }
//     });
//     // let WeactPage = page.map(function(tmp, i){
//     //   let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
//     //   let Page = eval(name);
//     //   // if(tmp=='index' && currentName =='index')
//     //   //   return  <Page class='navbar-inner'         key={i}/>;
//     //   return    <Page key={i}/>;
//     // })
//     let WeactPage = React.createClass({
//       render: function() {
//         let pageP = this.props.page;
//         // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
//         return (
//           <div className="pages navbar-through toolbar-through">
//           {pageP.map(function(tmp, i){
//             let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
//             let Page = eval(name);
//             // if(tmp=='index' && currentName =='index')
//             //   return  <Page class='navbar-inner'         key={i}/>;
//             if(tmp=='index' ) return <Page children={<TodoMain/>} key={i}/>;
//             return    <Page key={i}/>;
//           })}
//           </div>
//         )
//       }
//     });
//     let app         ;
//     let layout  = {};
//     let defaultLayout = {
//       app     : TodoApp                         ,
//       children: <TodoMain />                    ,
//       navbar  : <WeactNavbar navbar={navbar}/>  ,
//       page    : <WeactPage     page={page}  />  ,
//
//
//       // page    : <WeactPage                       ,
//     }
//
//     //load defaultLayout
//     for(let i in defaultLayout) {
//       if (defaultLayout.hasOwnProperty(i)) {
//         let value = field[i] || defaultLayout[i];
//         if(i=='app') app = value;
//         else{
//           layout[i] = value
//         }
//         if(field[i])delete field[i];
//         delete defaultLayout[i];
//       }
//     }
//     for(let i in field) {
//       if (field.hasOwnProperty(i)) {
//         layout[i] = field[i];
//       }
//     }
//
//     ReactLayout.render(app, layout);
//     setTimeout(function() {
//       loadF7();
//     }, 0);
//   });
// }
//
//
// FlowRouter.route('/', {
//   action() {
//     WeactLayout.render();
//   }
// });
// FlowRouter.route('/about', {
//   action() {
//     WeactLayout.render();
//   }
// });
// FlowRouter.route('/form', {
//   action() {
//     WeactLayout.render();
//   }
// });
// require.ensure([], (require) => {
  let NavbarIndex = require('./components/navbar/index').default;
  let NavbarAbout = require('./components/navbar/about').default;
  let NavbarForm  = require('./components/navbar/form').default;
  let PageAbout   = require('./components/page/about').default;
  let PageForm    = require('./components/page/form').default;
  let PageIndex   = require('./components/page/index').default;
  let PageRoot   = require('./components/page/root').default;
  // let Dashboard = require('./Dashboard');
  // console.log(sessionStorage.getItem('history'))
  let route = JSON.parse(sessionStorage.getItem('historyRoute'));
  let history = JSON.parse(sessionStorage.getItem('history'));
  let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
  // history = history.slice(0, index+1);
  let item=[];
  let currentName = "";
  // FlowRouter.current().route.path.split('/')[1];
  if( currentName == "")currentName= 'index';
  var navbar = ['index'];
  let page   = ['root','index'];
  if(currentName!=='index'){
    navbar.push(currentName);
    page.push(currentName);
  }
  if(!!history){
    // navbar="<div>"
    navbar  = ['index'];
    page    = ['root','index'];
    // console.log(history.length);
    for(let i=1; i<history.length; i++){
      let tmp = history[i];
      // console.log(tmp);
      tmp = tmp.replace('#','');
      navbar.push(tmp);
      page.push(tmp);
    }
    if(currentName!=='index' && navbar.indexOf(currentName)<0)navbar.push(currentName);
    if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
  }

  var WeactNavbar = React.createClass({
    render: function() {
      var navbarP = this.props.navbar;
      // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
      return (
        <div className="navbar">
        {navbarP.map(function(tmp, i){
          let name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
          let Navbar = eval(name);
          if(tmp=='index' && currentName =='index')
            return  <Navbar class='navbar-inner cached'         key={i}/>;
          return    <Navbar class='navbar-inner cached'  key={i}/>;
        })}
        </div>
      )
    }
  });

  var WeactPage = React.createClass({
    render: function() {
      let pageP = this.props.page;
      // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
      return (
        <div className="pages navbar-through toolbar-through">
        {pageP.map(function(tmp, i){
          let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
          let Page = eval(name);
          // if(tmp=='index' && currentName =='index')
          //   return  <Page class='navbar-inner'         key={i}/>;
          if(tmp=='index' ) return <Page children={<TodoMain/>} key={i}/>;
          return    <Page key={i}/>;
        })}
        </div>
      )
    }
  });

  // var Navbar = React.createClass({
  //   render: function(){
  //     <WeactNavbar navbar={navbar} />
  //   }
  // })
  // var wrapComponent = function(Component, props) {
  //   return React.createClass({
  //     render: function() {
  //       return React.createElement(Component, props);
  //     }
  //   });
  // };
// });
// var Navbar = WeactPage({navbar: navbar})

// var Navbar = React.createClass({
//   render: function() {
//     var navbarP = this.props.navbar;
//     // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
//     return (
//       <div className="navbar">
//         <NavbarIndex class='navbar-inner cached'/>
//         <NavbarAbout class='navbar-inner cached'/>
//         <NavbarForm class='navbar-inner cached'/>
//       {/*{navbarP.map(function(tmp, i){
//         let name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
//         let Navbar = eval(name);
//         if(tmp=='index' && currentName =='index')
//           return  <Navbar class='navbar-inner cached'         key={i}/>;
//         return    <Navbar class='navbar-inner cached'  key={i}/>;
//       })}*/}
//       </div>
//     )
//   }
// });
// console.log(AsyncRoute);

var components = function(){
  return{
    // navbar: AsyncRoute('navbar' ),
    page  : AsyncRoute('page'   )
  }
}

export default (
 <Route>
   <Route path="/" component={TodoApp}>
    <IndexRoute components={components()}
      // {
      //   navbar: wrapComponent(WeactNavbar,{navbar: navbar})
      // }
    // }
    /*getComponents (state, cb) {
          require.ensure([], (require) => {
            cb(null, [
              require('./Components')
            ])
          })
    }             */
   />

     {/*<IndexRoute getComponents={(location, cb) =>{
       require.ensure([], function () {
         let field = {};
         let NavbarIndex = require('./components/navbar/index').default;
         let NavbarAbout = require('./components/navbar/about').default;
         let NavbarForm  = require('./components/navbar/form').default;
         let PageAbout   = require('./components/page/about').default;
         let PageForm    = require('./components/page/form').default;
         let PageIndex   = require('./components/page/index').default;
         let PageRoot   = require('./components/page/root').default;
         // let Dashboard = require('./Dashboard');
         // console.log(sessionStorage.getItem('history'))
         let route = JSON.parse(sessionStorage.getItem('historyRoute'));
         let history = JSON.parse(sessionStorage.getItem('history'));
         let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
         // history = history.slice(0, index+1);
         let item=[];
         let currentName = "";
         // FlowRouter.current().route.path.split('/')[1];
         if( currentName == "")currentName= 'index';
         var navbar = ['index'];
         let page   = ['root','index'];
         if(currentName!=='index'){
           navbar.push(currentName);
           page.push(currentName);
         }
         if(!!history){
           // navbar="<div>"
           navbar  = ['index'];
           page    = ['root','index'];
           // console.log(history.length);
           for(let i=1; i<history.length; i++){
             let tmp = history[i];
             // console.log(tmp);
             tmp = tmp.replace('#','');
             navbar.push(tmp);
             page.push(tmp);
           }
           if(currentName!=='index' && navbar.indexOf(currentName)<0)navbar.push(currentName);
           if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
         }
         // console.log(navbar);
         // console.log(page);


         // let WeactPage = page.map(function(tmp, i){
         //   let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
         //   let Page = eval(name);
         //   // if(tmp=='index' && currentName =='index')
         //   //   return  <Page class='navbar-inner'         key={i}/>;
         //   return    <Page key={i}/>;
         // })

         let app         ;
         let layout  = {};
         let defaultLayout = {
           app     : TodoApp                         ,
           children: <TodoMain />                    ,
           navbar  : <WeactNavbar navbar={navbar}/>  ,
           page    : <WeactPage     page={page}  />  ,


           // page    : <WeactPage                       ,
         }

         //load defaultLayout
         for(let i in defaultLayout) {
           if (defaultLayout.hasOwnProperty(i)) {
             let value = field[i] || defaultLayout[i];
             if(i=='app') app = value;
             else{
               layout[i] = value
             }
             if(field[i])delete field[i];
             delete defaultLayout[i];
           }
         }
         for(let i in field) {
           if (field.hasOwnProperty(i)) {
             layout[i] = field[i];
           }
         }
         cb(null, layout)
       })
     }}
     />*/}
     <Route path="/about"  components={components()} />
     <Route path="/form"   components={components()} />
     <Route path="/form1"  components={components()} />
     {/*</Route>*/}

   </Route>
 </Route>
);
