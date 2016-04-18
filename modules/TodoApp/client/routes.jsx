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
    var isBack=0;
     routeOld= Session.get('routeOld')
    var routeName = FlowRouter.current().route.path.split('/');
    if(routeName[1]=="")routeName.splice(1, 1);
    var routeNew = FlowRouter.current().path;
    if(routeOld==routeNew){
      routeOld = undefined;
    }
    Session.set('routeOld', routeOld);
    if(sessionStorage.getItem('history')==undefined){
      // var array = ['#index'];
      sessionStorage.setItem('history', JSON.stringify(app.views[0].history));
    }
    if(sessionStorage.getItem('historyRoute')==undefined){
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
      if(routeNew==route[index-1]){
        //go back
        // console.log('back');
        isBack=1;
        sessionStorage.setItem('historyRouteIndex',index-1);
      }else if((index+1)<route.length && routeNew==route[index+1]){
        //go forward but still in history
        // console.log('forward')
        isBack=0;
        sessionStorage.setItem('historyRouteIndex',index+1);
      }else if(routeNew==route[index]){
        //refresh paged
        if(routeOld!=undefined)window.history.back();// initial load up, because it load up two times, so back one time.
        // console.log('refresh');
      }else if(routeNew!=='/'){
        //discover to new page
        // console.log('new')
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
    }
    var options = {};
    if(routeName[routeName.length-1]!=='')var pageName = routeName[routeName.length-1];
    else var pageName = 'index';
    options.pageName= pageName;

    if( !routeOld){
      let history = JSON.parse(sessionStorage.getItem('history'));
      let k = history;

      for(let i=1; i<k.length-1; i++){
        app.views[0].router.loadPage({
          pageName:   k[i].slice(1, k[i].length),
          animatePages: false
        });
      }
      options.animatePages=false;
    }



    if(isBack==1 && $.inArray('#'+pageName, app.views[0].history) > -1){
      //back action
      app.views[0].router.back();
      //@back instance change bar style
      setTimeout(function(){
        $('[data-page="'+pageName+'"].navbar-inner').addClass('navbar-on-center').removeClass('navbar-on-left').removeClass('cached')
        var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
        var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
        let num         = ( titleWidth - barWidth )/2;
        let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
        center.css( 'left'      , num*2                               );
        center.css( 'transform' , 'translate3d('+-num+'px, 0px, 0px)' );
        center.css( 'transition', 'transform 400ms'                   );
        let left = $('[data-page="about"].navbar-inner>.left>a>span:nth-child(3)');
        let widthMargin = left.width()+7;
        let widthMarginPadding = left.width()+14;
        left.css( 'margin-left' , -widthMargin );
        left.css('transform', 'translate3d('+widthMarginPadding+'px, 0px, 0px)');
        left.css("transition", "transform 400ms");
      }, 0);

      let index     = JSON.parse( sessionStorage.getItem('historyRouteIndex') );
      let history   = JSON.parse( sessionStorage.getItem('history')           );
      let backPage  = history[index+1].slice(1, history[index+1].length);

      //make static after back change
      app.onPageAfterBack(backPage, function(){
        setTimeout(function(){
          var barWidth    = $('[data-page="'+pageName+'"].navbar-inner').width();
          var titleWidth  = $('[data-page="'+pageName+'"].navbar-inner>.center').width();
          let num         = ( titleWidth - barWidth )/2;
          let center      = $('[data-page="'+pageName+'"].navbar-inner>.center');
          center.css( 'left'      , num                          );
          center.css( 'transform' , '' );
          center.css( 'transition', ''                           );
          let left = $('[data-page="about"].navbar-inner>.left>a>span:nth-child(3)');
          left.css( 'margin-left' , '' );
          left.css('transform', '');
          left.css('transition', '')

        }, 0);

      })
      isBack = 0;
    }else app.views[0].router.loadPage(options);
    if(!!routeOld && routeOld!==routeNew){
      sessionStorage.setItem('history', JSON.stringify($.unique(app.views[0].history)));
    }
    app.views=[app.views[0]];
    Session.set('routeOld', routeNew);
    routeOld = routeNew;

    // Pass instance to state to pass to children.
    // We are anyhow able to always get the instance via new F7()
    // this.setState({f7: app});
  }
}
let WeactLayout = {};
WeactLayout.render = function(fieldIn){
  require.ensure([], () => {
    let field = fieldIn || {};
    let NavbarIndex = require('./components/navbar/index').default;
    let NavbarAbout = require('./components/navbar/about').default;
    let NavbarForm  = require('./components/navbar/form').default;
    let PageAbout   = require('./components/page/about').default;
    let PageForm    = require('./components/page/form').default;
    let PageIndex   = require('./components/page/index').default;
    // let Dashboard = require('./Dashboard');
    // console.log(sessionStorage.getItem('history'))
    let route = JSON.parse(sessionStorage.getItem('historyRoute'));
    let history = JSON.parse(sessionStorage.getItem('history'));
    let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
    // history = history.slice(0, index+1);
    let item=[];
    let currentName = FlowRouter.current().route.path.split('/')[1];
    if( currentName == "")currentName= 'index';
    var navbar = ['index'];
    let page   = ['index'];
    if(currentName!=='index'){
      navbar.push(currentName);
      page.push(currentName);
    }
    if(!!history){
      // navbar="<div>"
      navbar  = ['index'];
      page    = ['index'];
      for(let i=1; i<history.length; i++){
        let tmp = history[i];
        tmp = tmp.replace('#','');
        navbar.push(tmp);
        page.push(tmp);
      }
      if(currentName!=='index' && navbar.indexOf(currentName)<0)navbar.push(currentName);
      if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
    }

    let WeactNavbar = React.createClass({
      render: function() {
        var navbarP = this.props.navbar;
        // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
        return (
          <div className="navbar">
          {navbarP.map(function(tmp, i){
            let name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
            let Navbar = eval(name);
            if(tmp=='index' && currentName =='index')
              return  <Navbar class='navbar-inner'         key={i}/>;
            return    <Navbar class='navbar-inner cached'  key={i}/>;
          })}
          </div>
        )
      }
    });
    // let WeactPage = page.map(function(tmp, i){
    //   let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
    //   let Page = eval(name);
    //   // if(tmp=='index' && currentName =='index')
    //   //   return  <Page class='navbar-inner'         key={i}/>;
    //   return    <Page key={i}/>;
    // })
    let WeactPage = React.createClass({
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

    ReactLayout.render(app, layout);
    loadF7();
  });
}


FlowRouter.route('/', {
  action() {
    WeactLayout.render();
  }
});
FlowRouter.route('/about', {
  action() {
    WeactLayout.render();
  }
});
FlowRouter.route('/form', {
  action() {
    WeactLayout.render();
  }
});


//export default (
//  <Route>
//    <Route path="/" component={TodoApp}>
//      <IndexRoute component={TodoMain} />
//    </Route>
//  </Route>
//);
