import React from 'react';
// import TodoApp from './index';
import TodoMain from  './TodoMain';
import loadF7   from  './loadF7'


function getRoute(fieldIn, component) {
  // switch(route) {
    // add each route in here
    // case "about":
    //   require.ensure([], (require) => {
    //     component.Page = require("./about/About.jsx");
    //     component.setState({loading: false});
    //   });
    // break;
    require.ensure([], (require) => {
      let field = fieldIn || {};
      let NavbarIndex = require('./components/navbar/index').default;
      let NavbarAbout = require('./components/navbar/about').default;
      let NavbarForm  = require('./components/navbar/form').default;
      let PageAbout   = require('./components/page/about').default;
      let PageForm    = require('./components/page/form').default;
      let PageForm1    = require('./components/page/form1').default;
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
      currentName = component.props.location.pathname.split('/')[1];
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
      console.log(page);
      var WeactNavbar = React.createClass({
        componentDidMount(){
          console.log(this.props.history);
        },
        render: function() {
          var navbarP = this.props.navbar;
          // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
          var history = this.props.history;
          return (
            <div className="navbar">
            {navbarP.map(function(tmp, i){
              let name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
              let Navbar = eval(name);
              if(tmp=='index' && currentName =='index')
                return  <Navbar class='navbar-inner '       history={history}  key={i}/>;
              return    <Navbar class='navbar-inner cached' history={history}  key={i}/>;
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
                if(tmp=='index' ) return <Page children={<TodoMain/>} class='page '  key={i} />;
                return    <Page key={i} />;
              })}
            </div>
          )
        }
      });
      let app         ;
      let layout  = {};
      // let defaultLayout = {
      //   app     : TodoApp                         ,
      //   children: <TodoMain />                    ,
      //   navbar  : <WeactNavbar navbar={navbar}/>  ,
      //   page    : <WeactPage     page={page}  />  ,
      //
      //
      //   // page    : <WeactPage                       ,
      // }
    //   var Navbar = React.createClass({
    //    render: function() {
    //      var navbarP = this.props.navbar;
    //      // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
    //      return (
    //        <div className="navbar">
    //          <NavbarIndex class='navbar-inner cached'/>
    //          <NavbarAbout class='navbar-inner cached'/>
    //          <NavbarForm class='navbar-inner cached'/>
    //        {/*{navbarP.map(function(tmp, i){
    //          let name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
    //          let Navbar = eval(name);
    //          if(tmp=='index' && currentName =='index')
    //            return  <Navbar class='navbar-inner cached'         key={i}/>;
    //          return    <Navbar class='navbar-inner cached'  key={i}/>;
    //        })}*/}
    //        </div>
    //      )
    //    }
    //  });
      let wrapComponent = function(Component, props) {
        // return obj3;
        return React.createClass({
          componentWillMount(){

            // console.log(propsMerge);
          },
          render: function() {
            var propsMerge = {};
            for (var attrname in this.props) { propsMerge[attrname] = this.props[attrname]; }
            for (var attrname in props) { propsMerge[attrname] = props[attrname]; }
            return React.createElement(Component, propsMerge);
          }
        });
      };
      let defaultLayout = {
        app     : ""                         ,
        // children: <TodoMain />                    ,
        navbar  : wrapComponent(WeactNavbar,{navbar : navbar})  ,
        page    : wrapComponent(WeactPage  ,{page   : page  })  ,


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
      // console.log(layout.page());
      // ReactLayout.render(app, layout);
      if(fieldIn =='navbar')component.Page = layout.navbar;
      if(fieldIn =='page')  component.Page = layout.page;
      // component.Page = layout.page;
      // component.layout = layout;
      // console.log(component.props.location);
      // if(component.state.loading==true){
        component.setState({loading: false});
      // }

      // return layout
      // setTimeout(function() {
      //   loadF7();
      // }, 0);
      // console.log("async");
      // console.log(component.state.init);
      if(component.state.init==true && fieldIn =='page'){

          loadF7(component, component.props.f7);
      }

    });
  // return component.layout;
  // }
}

var AsyncRoute = function(route) {
  return React.createClass({
    getInitialState: function() {
      return {
        loading: true
      }
    },
    componentWillMount: function() {
      let hasRoute = route || {};
      getRoute(hasRoute, this);

      // this.setState({loading: false});
      // console.log(this.props.location);

    },
    componentDidMount: function(){
      //control async first f7 render
      // console.log(this.props.history);
      this.setState({init: true});
    },
    // componentDidUpdate:function(){
    //   // console.log('update');
    //   // let hasRoute = route || {};
    //   // getRoute(hasRoute, this);
    //   // let component = this;
    //   // loadF7(component, component.props.f7);
    //   console.log('async1');
    //   // let component = this;
    //   // loadF7(component, component.props.f7);
    // },
    render: function() {
      if (this.state.loading) {
        return (
          <div>Loading...</div>
        );
      } else {
        // console.log(<this.Page />);
        return (
          <this.Page {...this.props}/>
        );
      }
    }
  });
};

var Components = function(route){
  let hasRoute = route || {};
  let layout   = getRoute(hasRoute, this);
  return layout;
  // return {navbar: wrapComponent(WeactNavbar,{navbar: navbar})}
}

export default AsyncRoute;
