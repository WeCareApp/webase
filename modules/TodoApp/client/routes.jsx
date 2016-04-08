//import { Route, IndexRoute } from 'react-router';
//import { FlowRouter } from 'meteor/meteorhacks:flow-router';
//import { ReactLayout } from 'meteor/kadira:react-layout';

import TodoApp from './index';
import TodoMain from './TodoMain';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
// import { loadF7 }     from './components/LoadF7';

// LoadF7;

import F7 from './f7/js/f7';

let loadF7= function(content) {
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
      // console.log($('#'+content).html());
      // options.content = content;
      // options.content = $('#'+content).html();
      // $('a').click(function(){
      //   console.log(app.views);
      // })
      // app.views[app.views.length-1].history=app.views[0].history;

      // window.onpopstate = function(event) {
      //   // console.log(event.state);
      //   isBack = 1;
      //     // alert("location: " + document.location);
      // }

      // view = app.addView('.view-main', {
      //   // Enable dynamic Navbar
      //   dynamicNavbar: true,
      //   // Enable Dom Cache so we can use all inline pages
      //   domCache: true
      // })

      if( !routeOld){
        // console.log(routeOld);
        // // console.log(JSON.parse(sessionStorage.getItem('history')));
        // let history = JSON.parse(sessionStorage.getItem('history'));
        // // console.log(history);
        // // app.views[0].history=history;
        // // console.log(app.views[0].history);
        // var k = history;
        //
        // for(let i=0; i<k.length; i++){
        //   // history[i] = history[i].substr(1);
        //   // let k = history[i];
        //
        //
        //   // if(history[i]=='#index')continue;
        //   // view = app.addView('.view-main', {
        //   //   // Enable dynamic Navbar
        //   //   dynamicNavbar: true,
        //   //   // Enable Dom Cache so we can use all inline pages
        //   //   domCache: true
        //   // })
        //   // console.log(k[i].slice(1, k[i].length))
        //   app.views[0].router.loadPage({
        //     pageName:   k[i].slice(1, k[i].length),
        //     animatePages: false
        //   });
        // }
        // // console.log(history);
        // // console.log(app.views[0].history);
        // app.views[0].history=$.unique(app.views[0].history);
        // app.views[0].history.push()
        options.animatePages=false;
      }



      if(isBack==1 && $.inArray('#'+pageName, app.views[0].history) > -1){
      //   view = app.addView('.view-main', {
      //    // Enable dynamic Navbar
      //    dynamicNavbar: true,
      //    // Enable Dom Cache so we can use all inline pages
      //    domCache: true
      //  })
      console.log(options)
        options.animatePages=false;
        // $('[data-page="about"].navbar-inner').addClass('navbar-on-left');
        app.views[0].router.back();
        let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
        let history = JSON.parse(sessionStorage.getItem('history'));
        let backPage = history[index+1].slice(1, history[index+1].length);
        // app.onPageBack(backPage, function(){
        //
        // })
        // app.onPageAfterBack(backPage, function(){
        //   // $('[data-page="about"].navbar-inner').addClass('navbar-on-center');
        //   $('[data-page="about"].navbar-inner').children().css('transform','translate3d(0px, 0px, 0px)')
        //   $('[data-page="about"].navbar-inner.navbar-from-center-to-right').removeClass('navbar-from-center-to-right');
        //
        // })
        app.onPageAfterBack(backPage, function(){
          // $('[data-page="about"].navbar-inner.navbar-from-center-to-right').removeClass('navbar-from-center-to-right');
          setTimeout(function(){
            app.views[0].router.loadPage({
              pageName:   'index',
              animatePages: false
            });
            app.views[0].router.loadPage({
              pageName:   pageName,
              animatePages: false
            });

          }, 0);

        })


        // app.views[0].router.back();
        // app.views[0].router.back();
        // console.log(app);
        // app.views=[app.views[0]];
        // console.log(app);
        // app = new F7();
        // console.log(app);
        // // options.animatePages=false;
        // // // app = new F7();
        // view = app.addView('.view-main', {
        //   // Enable dynamic Navbar
        //   dynamicNavbar: true,
        //   // Enable Dom Cache so we can use all inline pages
        //   domCache: true
        // })
        // setTimeout(function(){
        //   console.log(options);
        //   app.views[0].router.loadPage(options);
        // },5000)
        // let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
        // let history = JSON.parse(sessionStorage.getItem('history'));
        // alert(index);
        // // console.log(history);
        // // app.views[0].history=history;
        // // console.log(app.views[0].history);
        // var k = history;
        //
        // for(let i=index-1; i<index; i++){
        //   // history[i] = history[i].substr(1);
        //   // let k = history[i];
        //
        //   console.log(i);
        //   // if(history[i]=='#index')continue;
        //   view = app.addView('.view-main', {
        //     // Enable dynamic Navbar
        //     dynamicNavbar: true,
        //     // Enable Dom Cache so we can use all inline pages
        //     domCache: true
        //   })
        //   // console.log(k[i].slice(1, k[i].length))
        //   app.views[0].router.loadPage({
        //     pageName:   k[i].slice(1, k[i].length),
        //     animatePages: false
        //   });
        // }
        // view = app.addView('.view-main', {
        //   // Enable dynamic Navbar
        //   dynamicNavbar: true,
        //   // Enable Dom Cache so we can use all inline pages
        //   domCache: true
        // })
        // // console.log(k[i].slice(1, k[i].length))
        // app.views[0].router.loadPage({
        //   pageName:   'form',
        //   animatePages: false
        // });
        // console.log(app.views);
        isBack = 0;
      }else app.views[0].router.loadPage(options);
      // console.log(app.views[0].history);
      // app.onPageAfterAnimation(pageName,function(){
      //   // alert('yo');
      //   let routeClass= {};
      //   $('.navbar').children().map(function(){
      //     let key   = $(this).attr('data-page') ;
      //     if($(this).hasClass( "cached" ))$(this).removeClass('navbar-on-left');
      //     let value = $(this).attr('class')     ;
      //     routeClass[key]=value;
      //   })
      //   console.log(routeClass)
      //   sessionStorage.setItem('routeClass', JSON.stringify(routeClass));
      // })
      // console.log(app.views[0].history);
      if(!!routeOld && routeOld!==routeNew)sessionStorage.setItem('history', JSON.stringify($.unique(app.views[0].history)));
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


FlowRouter.route('/', {
  action() {
    require.ensure([], () => {
      // let NavbarAbout = require('./components/navbar/about').default;
      // let TodoApp     = require('./index');
      // let TodoMain    = require('./TodoMain');
      let NavbarIndex = require('./components/navbar/index').default;
      let NavbarAbout = require('./components/navbar/about').default;
      let NavbarForm  = require('./components/navbar/form').default;
      // let Dashboard = require('./Dashboard');
      // console.log(sessionStorage.getItem('history'))
      let route = JSON.parse(sessionStorage.getItem('historyRoute'));
      let history = JSON.parse(sessionStorage.getItem('history'));
      let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
      // history = history.slice(0, index+1);
      let item=[];
      var navbar = [];
      navbar.push('index');
      if(!!history){
        // navbar="<div>"
        navbar =['index'];
        for(let i=1; i<history.length; i++){
          let tmp = history[i];
          tmp = tmp.replace('#','');
          // Navbar = window['Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1)];
          // Navbar = eval('NavbarAbout');
          navbar.push(tmp);
            console.log(navbar);
        }
        if(navbar.indexOf('index')<0)navbar.push('index');
        console.log(navbar);
        // navbar +='</div>'babel.run(code);
        // let jsCode = babel.transform(navbar);
        // navbar = eval(jsCode.code);
      }


      console.log(navbar);
      var Component;

      let ReactNavbar = React.createClass({
        render: function() {
          // let Navbar = window['Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1)];
          var navbarP = this.props.navbar;
          let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
          Component = eval('NavbarAbout')
          return (
            <div className="navbar">
            {navbarP.map(function(tmp){
              var name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
              console.log(name)
              var Navbar = eval(name);
              if(!!routeClass && !!routeClass[tmp])return <Navbar class={routeClass[tmp]} />
              if(tmp=='index')return <Navbar class='navbar-inner' />
              return <Navbar class='navbar-inner cached' />;
            })}
            </div>
          )
        }
      });
      console.log(Component);
      ReactLayout.render(TodoApp, {
        children: <TodoMain />,
        navbar  : <ReactNavbar navbar={navbar}/>
      });
      loadF7();
    });

  }
});
FlowRouter.route('/about', {
  action() {
    require.ensure([], () => {
      let NavbarIndex = require('./components/navbar/index').default;
      let NavbarAbout = require('./components/navbar/about').default;
      let NavbarForm  = require('./components/navbar/form').default;
      // let Dashboard = require('./Dashboard');
      // console.log(sessionStorage.getItem('history'))
      let route = JSON.parse(sessionStorage.getItem('historyRoute'));
      let history = JSON.parse(sessionStorage.getItem('history'));
      let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
      // history = history.slice(0, index+1);
      let item=[];
      var navbar = ['index'];
      navbar.push('about');
      if(!!history){
        // navbar="<div>"
        navbar =['index'];
        for(let i=1; i<history.length; i++){
          let tmp = history[i];
          tmp = tmp.replace('#','');
          // Navbar = window['Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1)];
          // Navbar = eval('NavbarAbout');
          navbar.push(tmp);
            console.log(navbar);
        }
        if(navbar.indexOf('about')<0)navbar.push('about');
        console.log(navbar);
        // navbar +='</div>'babel.run(code);
        // let jsCode = babel.transform(navbar);
        // navbar = eval(jsCode.code);
      }


      console.log(navbar);
      var Component;

      let ReactNavbar = React.createClass({
        render: function() {
          // let Navbar = window['Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1)];
          var navbarP = this.props.navbar;
          let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
          Component = eval('NavbarAbout')
          return (
            <div className="navbar">
            {navbarP.map(function(tmp){
              var name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
              console.log(name)
              var Navbar = eval(name);
              // if(tmp=='about') return <Navbar current='navbar-on-center'/>;
              if(!!routeClass && !!routeClass[tmp])return <Navbar class={routeClass[tmp]} />
              if(tmp=='index')return <Navbar class='navbar-inner' />
              return <Navbar class='navbar-inner cached' />;
            })}
            </div>
          )
        }
      });
      console.log(Component);
      ReactLayout.render(TodoApp, {
        children: <TodoMain />,
        // navbar  : <div><NavbarAbout /><NavbarForm /></div>
        navbar  : <ReactNavbar navbar={navbar}/>
      });
      loadF7();
    });

  }
});
FlowRouter.route('/form', {
  action() {
    require.ensure([], () => {
      let NavbarIndex = require('./components/navbar/index').default;
      let NavbarAbout = require('./components/navbar/about').default;
      let NavbarForm  = require('./components/navbar/form').default;
      // let Dashboard = require('./Dashboard');
      // console.log(sessionStorage.getItem('history'))
      let route = JSON.parse(sessionStorage.getItem('historyRoute'));
      let history = JSON.parse(sessionStorage.getItem('history'));
      let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
      // history = history.slice(0, index+1);
      let item=[];
      var navbar = ['index'];
      navbar.push('form');
      if(!!history){
        // navbar="<div>"
        navbar =['index'];
        console.log(history);
        for(let i=1; i<history.length; i++){
          let tmp = history[i];
          tmp = tmp.replace('#','');
          // Navbar = window['Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1)];
          // Navbar = eval('NavbarAbout');
          navbar.push(tmp);
            console.log(navbar);
        }
        if(navbar.indexOf('form')<0)navbar.push('form');
        console.log(navbar);
        // navbar +='</div>'babel.run(code);
        // let jsCode = babel.transform(navbar);
        // navbar = eval(jsCode.code);
      }


      console.log(navbar);
      var Component;

      let ReactNavbar = React.createClass({
        render: function() {
          // let Navbar = window['Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1)];
          var navbarP = this.props.navbar;
          let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
          Component = eval('NavbarAbout')
          return (
            <div className="navbar">
            {navbarP.map(function(tmp){
              var name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
              console.log(name)
              var Navbar = eval(name);
              if(!!routeClass && !!routeClass[tmp])return <Navbar class={routeClass[tmp]} />
              if(tmp=='index')return <Navbar class='navbar-inner' />
              return <Navbar class='navbar-inner cached' />;
            })}
            </div>
          )
        }
      });
      ReactLayout.render(TodoApp, {
        children: <TodoMain />,
        // navbar  : <div><NavbarAbout /><NavbarForm /></div>
        navbar  : <ReactNavbar navbar={navbar}/>
      });
      loadF7();
    });
  }
});

FlowRouter.route('/form/about', {
  action() {
    ReactLayout.render(TodoApp, {
      children: <TodoMain />
    });
  }
});


//export default (
//  <Route>
//    <Route path="/" component={TodoApp}>
//      <IndexRoute component={TodoMain} />
//    </Route>
//  </Route>
//);
