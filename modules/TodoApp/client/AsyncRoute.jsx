import React from 'react';
// import TodoApp from './index';
import TodoMain from  './TodoMain';
import loadF7   from  './loadF7';
import root from 'window-or-global'

function requireContent(fieldIn, component, newpage) {

  // let NavbarIndex ;
  // let NavbarAbout ;
  // let NavbarForm  ;
  // let PageAbout   ;
  // let PageForm    ;
  // let PageForm1   ;
  // let PageIndex   ;
  // let PageRoot    ;
  if(!Meteor.isServer){
    // require.ensure([],(require)=>{
    //   let about = 'about'
    //   let aboutComponent = require('./components/pageCreate/'+about).default();
    // })
    // require.ensure([],(require)=>{
    //   let about = 'about'
    //   let aboutComponent = require('./components/pageCreate/index').default();
    // })
    // require.ensure([],(require)=>{
    //   let about = 'about'
    //   let aboutComponent = require('./components/pageCreate/root').default();
    // })
  //    NavbarIndex = require('./components/navbar/index').default;
  //    NavbarAbout = require('./components/navbar/about').default;
  //    NavbarForm  = require('./components/navbar/form').default;
  //    PageAbout   = require('./components/pageCreate/about').default;
  //    PageForm    = require('./components/pageCreate/form').default;
  //    PageForm1    = require('./components/pageCreate/form1').default;
  //    PageIndex   = require('./components/pageCreate/index').default;
  //    PageRoot   = require('./components/pageCreate/root').default;
  }
          let currentName = "";
          if(component.props.location.pathname.split('/')[1]){
            currentName = component.props.location.pathname.split('/')[1];
          }else if(component.props.location.pathname=='/'){
            currentName = 'index';
          }
          let route   ;
          let history ;
          let index   ;
          if(!Meteor.isServer){
            route = JSON.parse(sessionStorage.getItem('historyRoute'));
            history = JSON.parse(sessionStorage.getItem('history'));
            index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
          }
          let wrapComponent = function(Component, props) {
            return React.createClass({
              render: function() {
                var propsMerge = {};
                if(this.props!==null) for (var attrname in this.props) { propsMerge[attrname] = this.props[attrname]; }
                if(props!==null) for (var attrname in props)      { propsMerge[attrname] = props[attrname]; }
                return React.createElement(Component, propsMerge);
              }
            });
          };
          let page = [];
          if(!Meteor.isServer){ //client code
            if(fieldIn=='page'){
              page   = ['root','index'] ;
            }else if(fieldIn=='navbar'){
              page   = ['index']        ;
            }
            if(!!history){
              for(let i=1; i<history.length; i++){
                let tmp = history[i]
                tmp = tmp.replace('#','');
                page.push(tmp);
              }
            }
            if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
          }else{                //server code
            page.push(currentName);
          }

          // Push components to page
          // if( fieldIn == 'page'){
          //   let pagePP = page;
          //   let newpage= [];
          //   // let index = 'about'
          //   let num = 0;
          //   for (let i = 0; i < pagePP.length; i++) {
          //
          //     // require.ensure([], (require)=>{
          //     //   // if(pagePP[i]=='about')newpage[i] = require('bundle!./components/pageCreate/about').default();
          //     //   // if(pagePP[i]=='index')newpage[i] = require('./components/pageCreate/index').default();
          //     //   // if(pagePP[i]=='form')newpage[i] = require('./components/pageCreate/form').default();
          //     //   // if(pagePP[i]=='root')newpage[i] = require('./components/pageCreate/root').default();
          //     //
          //     // })
          //     var handler = require('bundle!./components/pageCreate/'+pagePP[i]);
          //     component.Page = handler(bundle =>{
          //       newpage[i] = bundle.default;
          //       num++;
          //       if(num==pagePP.length){
          //         console.log(newpage);
          //         // console.log(page);
          //         var WeactPage = React.createClass({
          //           render: function() {
          //             let name = this.props.name;
          //
          //             // let pageP = pagePP;
          //             let pageP = this.props.page;
          //             return (
          //               <div className="pages navbar-through toolbar-through">
          //                 {pageP.map(function(tmp, i){
          //                   // require.ensure([],(require)=>{
          //                   // console.log(tmp);
          //                     // let Page = require('./components/page/'+tmp).default;
          //                     console.log(name[i]);
          //                     let Page = tmp;
          //                     let props = {};
          //                       props.class     = " page"       ;
          //                     if(name[i]=='index'){
          //                       props.children  = <TodoMain/>   ;
          //                     }else{
          //                       if(!Meteor.isServer){
          //                         props.class  += " cached"     ;
          //                       }
          //                     }
          //
          //                   // })
          //                   return    <Page {...props} key={i} />;
          //                 })}
          //               </div>
          //             )
          //           }
          //         });
          //         component.Page = wrapComponent(WeactPage, {
          //           name: page,
          //           page: newpage
          //         });
          //         // return component.Page;
          //         // console.log(component.Page);
          //         // component.loading = true;
          //         // component.setState((loading)=>{
          //         //   return false;
          //         // });
          //         // component.setState({loading: false});
          //         component.forceUpdate();
          //       }
          //     })
          //   }
          //   component.Page = React.createClass({
          //       render: function() {
          //         return(
          //           <div>Loading...</div>
          //         )
          //       }
          //   })
          //   // console.log(component.Page);
          //   // console.log(newpage);
          //   // page = newpage;
          // }

          if( fieldIn == 'page'){
            var WeactPage = React.createClass({
              getInitialState: function() {
                return {
                  loading: true
                }
              },
              render: function() {
                let pagePP = this.props.newpage;
                // console.log(pagePP);
                // let pageP = pagePP;
                let pageP = this.props.page;
                let loading = this.state.loading;
                return (
                  <div className="pages navbar-through toolbar-through">
                    {pageP.map(function(tmp, i){
                      // require.ensure([],(require)=>{
                      let Page;
                      if(!Meteor.isServer){
                        Page = pagePP[i];
                      }else{
                        Page = require('./components/page/'+tmp).default;
                      }

                        let props = {};
                          props.class     = " page"       ;
                        if(tmp=='index'){
                          props.children  = <TodoMain/>   ;
                          if(!Meteor.isServer){
                            // props.class  += " cached"     ;
                          }
                        }else{
                          if(!Meteor.isServer){
                            props.class  += " cached"     ;
                          }
                        }
                        loading=false;
                        return    <Page {...props} key={i} />;
                      // })
                      // if (loading) {
                      //   return (
                      //     <div>Loading-Page...</div>
                      //   );
                      // } else {
                      //   // console.log(<this.Page />);
                      //   return (
                      //     <this.Page {...this.props}/>
                      //   );
                      // }
                    })}
                  </div>
                )
              }
            });
            component.Page = wrapComponent(WeactPage, {page: page, newpage: newpage});
          }else
          if( fieldIn == 'navbar'){
            var WeactNavbar = React.createClass({
              render: function() {

                let pagePP = this.props.newpage;
                // console.log(pagePP);
                var navbarP = this.props.page;
                // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
                var history = this.props.history;
                var backLink = component.props.location.pathname.split('/');
                backLink.shift();
                backLink.pop();
                var back = '/';
                if(backLink.length>0){
                  for (var i = 0; i < backLink.length; i++) {
                    back += backLink[i]+"/"
                  }
                }
                return (
                  <div className="navbar">
                    {navbarP.map(function(tmp, i){
                      let Page;
                      if(!Meteor.isServer){
                        Page = pagePP[i];
                      }
                      else{
                        Page = require('./components/navbar/'+tmp).default;
                      }
                      // let Page = tmp;

                      // if(i==0) return;
                      let props = {};
                      if( Meteor.isServer){
                        props.class= ' ssr'

                        props.back  = back
                      }
                      if( tmp=='index'){
                        props['class']= ' navbar-inner'
                        props.dataPage = 'index';
                      }
                      if( tmp!=='index' && !Meteor.isServer){
                        props['class']= ' navbar-inner'
                        props.class+= ' cached'
                        props.dataPage = tmp;
                        // props.back  = back
                      }
                      if(history){
                        props.history=history;
                      }
                      return <Page {...props} key={i}/>
                    })}
                  </div>
                )
              }
            });
            component.Page = wrapComponent(WeactNavbar, {page: page, newpage: newpage});
          }
          component.setState({loading: false});
          // $('.navbar-inner.ssr').remove()
          // console.log(component.state.init);
          // console.log(component.state.loading);
          // console.log(fieldIn);
          if(
              component.state.init==true &&
              component.state.loading==false && fieldIn =='page' && !Meteor.isServer){
              loadF7(component, component.props.f7);
              console.log('async');
          }

}

function loadContent(fieldIn, component) {
  let currentName = "";
  if(component.props.location.pathname.split('/')[1]){
    currentName = component.props.location.pathname.split('/')[1];
  }else if(component.props.location.pathname=='/'){
    currentName = 'index';
  }
  let route   ;
  let history ;
  let index   ;
  if(!Meteor.isServer){
    route = JSON.parse(sessionStorage.getItem('historyRoute'));
    history = JSON.parse(sessionStorage.getItem('history'));
    index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
  }
  let wrapComponent = function(Component, props) {
    // return obj3;
    return React.createClass({
      componentWillMount(){

        // console.log(propsMerge);
      },
      render: function() {
        var propsMerge = {};
        if(this.props!==null) for (var attrname in this.props) { propsMerge[attrname] = this.props[attrname]; }
        if(props!==null) for (var attrname in props)      { propsMerge[attrname] = props[attrname]; }
        return React.createElement(Component, propsMerge);
      }
    });
  };
  let page = [];
  if(!Meteor.isServer){ //client code
    if(fieldIn=='page'){
      page   = ['root','index'] ;
    }else if(fieldIn=='navbar'){
      page   = ['index']        ;
    }
    // if(currentName!=='index'){
    //   page.push(currentName);
    // }
    if(!!history){
      // navbar="<div>"
      // navbar  = ['index'];
      // page    = ['root','index'];
      // console.log(history.length);
      for(let i=1; i<history.length; i++){
        let tmp = history[i];
        // console.log(tmp);
        tmp = tmp.replace('#','');
        // navbar.push(tmp);
        page.push(tmp);
      }
        // if(currentName!=='index' && navbar.indexOf(currentName)<0)navbar.push(currentName);
    }
    if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
  }else{                //server code
    page.push(currentName);
  }

  if( fieldIn == 'page'){
    let WeactPage = React.createClass({
      render: function() {
        let pageP = this.props.page;
        // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
        return (
          <div className="pages navbar-through toolbar-through">
            {pageP.map(function(tmp, i){
              // let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
              // let Page = eval(name);

              // let thisPage = require('./components/page/'+tmp).default;
              let Page;
              if(tmp=='index'){
                Page = wrapComponent(thisPage, {children:<TodoMain/>, class:'page '});
              }else{
                if(!Meteor.isServer){
                  Page = wrapComponent(thisPage, {class: 'page cached'});
                }else{
                  Page = wrapComponent(thisPage, {class: 'page'});
                }
              }
              // wrapComponent(thisPage);

              // if(tmp=='index' && currentName =='index')
              //   return  <Page class='navbar-inner'         key={i}/>;
              // if(tmp=='index' ) return <Page children={<TodoMain/>} class='page '  key={i} />;
              return    <Page key={i} />;
            })}
          </div>
        )
      }
    });

    component.Page = wrapComponent(WeactPage, {page: page});
  }else if( fieldIn == 'navbar'){
    let WeactNavbar = React.createClass({
      // componentDidMount(){
      //   console.log(this.props.history);
      // },
      render: function() {
        var navbarP = this.props.page;
        // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
        var history = this.props.history;
        var backLink = component.props.location.pathname.split('/');
        backLink.shift();
        backLink.pop();
        var back = '/';
        if(backLink.length>0){
          for (var i = 0; i < backLink.length; i++) {
            back+=backLink[i]+"/"
          }
        }
        // console.log(ba。ck);
        return (
          <div className="navbar">
            {navbarP.map(function(tmp, i){
              let thisPage = require('./components/navbar/'+tmp).default;
              let Page;
              let props = {};
              props['class']= ' navbar-inner' ;
              if( Meteor.isServer){
                props.class+= ' ssr'
                props.back  = back;
              }
              if( tmp!=='index' && !Meteor.isServer){
                props.class+= ' cached'       ;
                props.back  = back;
              }
              // if(tmp=='index'){
              //   Page = wrapComponent(thisPage, {class:'navbar-inner'});
              // }else{
              //   if(!Meteor.isServer){
              //     Page = wrapComponent(thisPage, {class: 'navbar-inner cached'});
              //   }else{
              //     Page = wrapComponent(thisPage, {class: 'navbar-inner'});
              //   }
              // }
              if(history){
                props.history=history;
              }
              // console.log(props);
              Page = wrapComponent(thisPage, props);
              // if(!history){
              //   // if(tmp=='index' && currentName =='index')
              //   //   return  <Navbar class='navbar-inner '         key={i}/>;
              //   // return    <Navbar class='navbar-inner cached'   key={i}/>;
              // }else{
              //   if(tmp=='index' && currentName =='index')
              //     return  <Navbar class='navbar-inner '       history={history}  key={i}/>;
              //   return    <Navbar class='navbar-inner cached' history={history}  key={i}/>;
              // }
              return <Page key={i}/>
            })}
          </div>
        )
      }
    });
    // let WeactPage = React.createClass({
    //   render: function() {
    //     let pageP = this.props.page;
    //     // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
    //     return (
    //       <div className="pages navbar-through toolbar-through">
    //         {pageP.map(function(tmp, i){
    //           // let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
    //           // let Page = eval(name);
    //
    //           let thisPage = require('./components/page/'+tmp).default;
    //           let Page;
    //           if(tmp=='index'){
    //             Page = wrapComponent(thisPage, {children:<TodoMain/>, class:'page '});
    //           }else{
    //             if(!Meteor.isServer){
    //               Page = wrapComponent(thisPage, {class: 'page cached'});
    //             }else{
    //               Page = wrapComponent(thisPage, {class: 'page'});
    //             }
    //           }
    //           // wrapComponent(thisPage);
    //
    //           // if(tmp=='index' && currentName =='index')
    //           //   return  <Page class='navbar-inner'         key={i}/>;
    //           // if(tmp=='index' ) return <Page children={<TodoMain/>} class='page '  key={i} />;
    //           return    <Page key={i} />;
    //         })}
    //       </div>
    //     )
    //   }
    // });

    component.Page = wrapComponent(WeactNavbar, {page: page});
  }
  component.setState({loading: false});
  if(component.state.init==true && fieldIn =='page'){
      // console.log('asyncLoadF7');
      if(!Meteor.isServer){
          loadF7(component, component.props.f7);
      }
  }
}

function getRoute(fieldIn, component, newpage) {
  // switch(route) {
    // add each route in here
    // case "about":
    //   require.ensure([], (require) => {
    //     component.Page = require("./about/About.jsx");
    //     component.setState({loading: false});
    //   });
    // break;
    if(fieldIn =='helmet'){
      let currentName = "";
      if(component.props.location.pathname.split('/')[1]){
        currentName = component.props.location.pathname.split('/')[1];
      }else if(component.props.location.pathname=='/'){
        currentName = 'index';
      }
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
      if(!Meteor.isServer){
        // let helmet = require('./components/helmet/'+currentName);
        let helmetbundle = require('bundle!./components/helmet/'+currentName);
        helmetbundle(helmet =>{
          component.Page = wrapComponent(helmet.default);
          component.setState({loading: false});
          return;
        })
      }else{
        let helmet = require('./components/helmet/'+currentName);
        // let helmetbundle = require('bundle!./components/helmet/'+currentName);
        // helmetbundle(helmet =>{
          component.Page = wrapComponent(helmet.default);
          component.setState({loading: false});
          return;
        // })
      }

    }
    if(fieldIn == 'page'
    || fieldIn == 'navbar'
    ){
      if(!Meteor.isServer){
        require.ensure([], (require) => {
          requireContent(fieldIn, component, newpage)
        });
      }else{
        requireContent(fieldIn, component, newpage)
      }
    }
    // if(fieldIn =='navbar'){
    //   let currentName = "";
    //   if(component.props.location.pathname.split('/')[1]){
    //     currentName = component.props.location.pathname.split('/')[1];
    //   }else if(component.props.location.pathname=='/'){
    //     currentName = 'index';
    //   }
    //   let wrapComponent = function(Component, props) {
    //     // return obj3;
    //     return React.createClass({
    //       componentWillMount(){
    //
    //         // console.log(propsMerge);
    //       },
    //       render: function() {
    //         var propsMerge = {};
    //         if(this.props!==null) for (var attrname in this.props) { propsMerge[attrname] = this.props[attrname]; }
    //         if(props!==null) for (var attrname in props)      { propsMerge[attrname] = props[attrname]; }
    //         return React.createElement(Component, propsMerge);
    //       }
    //     });
    //   };
    //   let helmet = require('./components/navbar/'+currentName).default;
    //
    //   component.Page = wrapComponent(helmet, {});
    //   component.setState({loading: false});
    //   return;
    // }
    // require.ensure([], (require) => {
      // let field = fieldIn || {};
      // let NavbarIndex ;
      // let NavbarAbout ;
      // let NavbarForm  ;
      // let PageAbout   ;
      // let PageForm    ;
      // let PageForm1   ;
      // let PageIndex   ;
      // let PageRoot    ;
      // if(!Meteor.isServer){
      //    NavbarIndex = require('./components/navbar/index').default;
      //    NavbarAbout = require('./components/navbar/about').default;
      //    NavbarForm  = require('./components/navbar/form').default;
      //    PageAbout   = require('./components/pageCreate/about').default;
      //    PageForm    = require('./components/pageCreate/form').default;
      //    PageForm1    = require('./components/pageCreate/form1').default;
      //    PageIndex   = require('./components/pageCreate/index').default;
      //    PageRoot   = require('./components/pageCreate/root').default;
      // }else{
      //   // const isBrowser = typeof window !== 'undefined';
      //   // const MyWindowDependentLibrary = isBrowser ? require( 'path/to/library') : undefined;
      //   // let NavbarIndex = isBrowser ? require('./components/navbar/index').default: undefined;
      //   // let NavbarIndex = require('./components/navbar/index').default;
      // }
      //
      // // let Dashboard = require('./Dashboard');
      // // console.log(sessionStorage.getItem('history'))
      // let route   ;
      // let history ;
      // let index   ;
      // if(!Meteor.isServer){
      //   route = JSON.parse(sessionStorage.getItem('historyRoute'));
      //   history = JSON.parse(sessionStorage.getItem('history'));
      //   index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
      // }else{
      //   route = ['/']
      //   history = ['#index'];
      //   index   = 0;
      //   if(!!component.props.location.pathname.split('/')[1]){
      //     route.push(component.props.location.pathname)
      //     history.push('#'+component.props.location.pathname.split('/')[1]);
      //     index++;
      //   }
      //   component.setState({loading: false});
      // }
      // // history = history.slice(0, index+1);
      // if(!Meteor.isServer){
      //   let item=[];
      //   let currentName = "";
      //   currentName = component.props.location.pathname.split('/')[1];
      //   // FlowRouter.current().route.path.split('/')[1];
      //
      //   if( currentName == "")currentName= 'index';
      //   var navbar = ['index'];
      //   let page   = ['root','index'];
      //   if(currentName!=='index'){
      //     navbar.push(currentName);
      //     page.push(currentName);
      //   }
      //   if(!!history){
      //     // navbar="<div>"
      //     navbar  = ['index'];
      //     page    = ['root','index'];
      //     // console.log(history.length);
      //     for(let i=1; i<history.length; i++){
      //       let tmp = history[i];
      //       // console.log(tmp);
      //       tmp = tmp.replace('#','');
      //       navbar.push(tmp);
      //       page.push(tmp);
      //     }
      //     if(currentName!=='index' && navbar.indexOf(currentName)<0)navbar.push(currentName);
      //     if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
      //   }
      //   // console.log(navbar);
      //   // console.log(page);
      //   // console.log(page);
      //   var WeactNavbar = React.createClass({
      //     // componentDidMount(){
      //     //   console.log(this.props.history);
      //     // },
      //     render: function() {
      //       var navbarP = this.props.navbar;
      //       // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
      //       var history = this.props.history;
      //       return (
      //         <div className="navbar">
      //         {navbarP.map(function(tmp, i){
      //           let name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
      //           let Navbar = eval(name);
      //           if(!history){
      //             if(tmp=='index' && currentName =='index')
      //               return  <Navbar class='navbar-inner '         key={i}/>;
      //             return    <Navbar class='navbar-inner cached'   key={i}/>;
      //           }else{
      //             if(tmp=='index' && currentName =='index')
      //               return  <Navbar class='navbar-inner '       history={history}  key={i}/>;
      //             return    <Navbar class='navbar-inner cached' history={history}  key={i}/>;
      //           }
      //
      //         })}
      //         </div>
      //       )
      //     }
      //   });
      //   // let WeactPage = page.map(function(tmp, i){
      //   //   let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
      //   //   let Page = eval(name);
      //   //   // if(tmp=='index' && currentName =='index')
      //   //   //   return  <Page class='navbar-inner'         key={i}/>;
      //   //   return    <Page key={i}/>;
      //   // })
      //   var WeactPage = React.createClass({
      //     render: function() {
      //       let pageP = this.props.page;
      //       // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
      //       return (
      //         <div className="pages navbar-through toolbar-through">
      //           {pageP.map(function(tmp, i){
      //             let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
      //             let Page = eval(name);
      //             // if(tmp=='index' && currentName =='index')
      //             //   return  <Page class='navbar-inner'         key={i}/>;
      //             if(tmp=='index' ) return <Page children={<TodoMain/>} class='page '  key={i} />;
      //             return    <Page key={i} />;
      //           })}
      //         </div>
      //       )
      //     }
      //   });
      //   let app         ;
      //   let layout  = {};
      //   // let defaultLayout = {
      //   //   app     : TodoApp                         ,
      //   //   children: <TodoMain />                    ,
      //   //   navbar  : <WeactNavbar navbar={navbar}/>  ,
      //   //   page    : <WeactPage     page={page}  />  ,
      //   //
      //   //
      //   //   // page    : <WeactPage                       ,
      //   // }
      // //   var Navbar = React.createClass({
      // //    render: function() {
      // //      var navbarP = this.props.navbar;
      // //      // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
      // //      return (
      // //        <div className="navbar">
      // //          <NavbarIndex class='navbar-inner cached'/>
      // //          <NavbarAbout class='navbar-inner cached'/>
      // //          <NavbarForm class='navbar-inner cached'/>
      // //        {/*{navbarP.map(function(tmp, i){
      // //          let name = 'Navbar'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
      // //          let Navbar = eval(name);
      // //          if(tmp=='index' && currentName =='index')
      // //            return  <Navbar class='navbar-inner cached'         key={i}/>;
      // //          return    <Navbar class='navbar-inner cached'  key={i}/>;
      // //        })}*/}
      // //        </div>
      // //      )
      // //    }
      // //  });
      //   let wrapComponent = function(Component, props) {
      //     // return obj3;
      //     return React.createClass({
      //       componentWillMount(){
      //
      //         // console.log(propsMerge);
      //       },
      //       render: function() {
      //         var propsMerge = {};
      //         for (var attrname in this.props) { propsMerge[attrname] = this.props[attrname]; }
      //         for (var attrname in props) { propsMerge[attrname] = props[attrname]; }
      //         return React.createElement(Component, propsMerge);
      //       }
      //     });
      //   };
      //   let defaultLayout = {
      //     app     : ""                         ,
      //     // children: <TodoMain />                    ,
      //     navbar  : wrapComponent(WeactNavbar,{navbar : navbar})  ,
      //     page    : wrapComponent(WeactPage  ,{page   : page  })  ,
      //
      //
      //     // page    : <WeactPage                       ,
      //   }
      //   //load defaultLayout
      //   for(let i in defaultLayout) {
      //     if (defaultLayout.hasOwnProperty(i)) {
      //       let value = field[i] || defaultLayout[i];
      //       if(i=='app') app = value;
      //       else{
      //         layout[i] = value
      //       }
      //       if(field[i])delete field[i];
      //       delete defaultLayout[i];
      //     }
      //   }
      //   for(let i in field) {
      //     if (field.hasOwnProperty(i)) {
      //       layout[i] = field[i];
      //     }
      //   }
      //   // console.log(layout.page());
      //   // ReactLayout.render(app, layout);
      //   if(fieldIn =='navbar')component.Page = layout.navbar;
      //   if(fieldIn =='page')  component.Page = layout.page;
      //   // component.Page = layout.page;
      //   // component.layout = layout;
      //   // console.log(component.props.location);
      //   // if(component.state.loading==true){
      //     component.setState({loading: false});
      //   // }
      //
      //   // return layout
      //   // setTimeout(function() {
      //   //   loadF7();
      //   // }, 0);
      //   console.log("async");
      //   // console.log(component.state.init);
      //   // if(component.state.init==true && fieldIn =='page'){
      //   //     console.log('asyncLoadF7');
      //   //     loadF7(component, component.props.f7);
      //   // }
      // }

    // });
  // return component.layout;
  // }
}

function getClientRoute(fieldIn, component) {
  // switch(route) {
    // add each route in here
    // case "about":
    //   require.ensure([], (require) => {
    //     component.Page = require("./about/About.jsx");
    //     component.setState({loading: false});
    //   });
    // break;
    if(fieldIn =='helmet'){
      let currentName = "";
      if(component.props.location.pathname.split('/')[1]){
        currentName = component.props.location.pathname.split('/')[1];
      }else if(component.props.location.pathname=='/'){
        currentName = 'index';
      }
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
      // let helmet = require('./components/helmet/'+currentName).default;

      component.Page = wrapComponent(helmet);
      component.setState({loading: false});
      return;
    }
    let NavbarIndex ;
    // let NavbarAbout ;
    // let NavbarForm  ;
    // let PageAbout   ;
    // let PageForm    ;
    // let PageForm1   ;
    // let PageIndex   ;
    // let PageRoot    ;
    // if(!Meteor.isServer){
    //    NavbarIndex = require('./components/navbar/index').default;
    //    NavbarAbout = require('./components/navbar/about').default;
    //    NavbarForm  = require('./components/navbar/form').default;
    //    PageAbout   = require('./components/pageCreate/about').default;
    //    PageForm    = require('./components/pageCreate/form').default;
    //    PageForm1    = require('./components/pageCreate/form1').default;
    //    PageIndex   = require('./components/pageCreate/index').default;
    //    PageRoot   = require('./components/pageCreate/root').default;
    // }
    require.ensure([], (require) => {
      let currentName = "";
      if(component.props.location.pathname.split('/')[1]){
        currentName = component.props.location.pathname.split('/')[1];
      }else if(component.props.location.pathname=='/'){
        currentName = 'index';
      }
      let route   ;
      let history ;
      let index   ;
      if(!Meteor.isServer){
        route = JSON.parse(sessionStorage.getItem('historyRoute'));
        history = JSON.parse(sessionStorage.getItem('history'));
        index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
      }
      let wrapComponent = function(Component, props) {
        return React.createClass({
          render: function() {
            var propsMerge = {};
            if(this.props!==null) for (var attrname in this.props) { propsMerge[attrname] = this.props[attrname]; }
            if(props!==null) for (var attrname in props)      { propsMerge[attrname] = props[attrname]; }
            return React.createElement(Component, propsMerge);
          }
        });
      };
      let page = [];
      if(!Meteor.isServer){ //client code
        if(fieldIn=='page'){
          page   = ['root','index'] ;
        }else if(fieldIn=='navbar'){
          page   = ['index']        ;
        }
        if(!!history){
          for(let i=1; i<history.length; i++){
            let tmp = history[i]
            tmp = tmp.replace('#','');
            page.push(tmp);
          }
        }
        if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
      }else{                //server code
        page.push(currentName);
      }

      if( fieldIn == 'page'){
        var WeactPage = React.createClass({
          render: function() {
            let pageP = this.props.page;
            return (
              <div className="pages navbar-through toolbar-through">
                {pageP.map(function(tmp, i){
                  // let Page = require('./components/page/'+tmp).default;
                  let props = {};
                    props.class     = " page"       ;
                  if(tmp=='index'){
                    props.children  = <TodoMain/>   ;
                  }else{
                    if(!Meteor.isServer){
                      props.class  += " cached"     ;
                    }
                  }
                  return    <Page {...props} key={i} />;
                })}
              </div>
            )
          }
        });
        component.Page = wrapComponent(WeactPage, {page: page});
      }else if( fieldIn == 'navbar'){
        var WeactNavbar = React.createClass({
          render: function() {
            var navbarP = this.props.page;
            // let routeClass = JSON.parse(sessionStorage.getItem('routeClass'));
            var history = this.props.history;
            var backLink = component.props.location.pathname.split('/');
            backLink.shift();
            backLink.pop();
            var back = '/';
            if(backLink.length>0){
              for (var i = 0; i < backLink.length; i++) {
                back += backLink[i]+"/"
              }
            }
            return (
              <div className="navbar">
                {navbarP.map(function(tmp, i){
                  let Page = require('./components/navbar/'+tmp).default;
                  let props = {};
                  props['class']= ' navbar-inner'
                  if( Meteor.isServer){
                    props.class+= ' ssr'
                    props.back  = back
                  }
                  if( tmp!=='index' && !Meteor.isServer){
                    props.class+= ' cached'
                  }
                  if(history){
                    props.history=history;
                  }
                  return <Page {...props} key={i}/>
                })}
              </div>
            )
          }
        });
        component.Page = wrapComponent(WeactNavbar, {page: page});
      }
      component.setState({loading: false});

      if(component.state.init==true && fieldIn =='page' && !Meteor.isServer){
          loadF7(component, component.props.f7);
      }
    });
}

var AsyncRoute = function(route, newpage) {
  return React.createClass({
    getInitialState: function() {
      return {
        loading: true
      }
    },
    componentWillMount: function() {
      let hasRoute = route || 'page';
      let hasNewpage = newpage || null;
      // if(hasRoute =='page'){
      // console.log(newpage);
        getRoute(hasRoute, this, newpage);
      // }

      // getRoute(hasRoute, this);
      // if(!Meteor.isServer){
      //   getClientRoute(hasRoute, this);
      //   // console.log('client load');
      // }else{

        // console.log('server load');
      // }

      // this.setState({loading: false});
      // console.log(this.props.location);

    },
    componentDidMount: function(){
      //control async first f7 render
      // console.log(this.props.history);
      let hasRoute = route || {};
      // getRoute(hasRoute, this);
      // if(!Meteor.isServer){
      //   getClientRoute(hasRoute, this);
      //   // console.log('client load');
      // }
      this.setState({init: true});
    },
    // componentDidUpdate:function(){
    //   // console.log('update');
    //   let hasRoute = route || {};
    //   // getRoute(hasRoute, this);
    //   // let component = this;
    //   // loadF7(component, component.props.f7);
    //   console.log('async1');
    //   if(this.state.loading==true){
    //   }
    //
    //   // let component = this;
    //   // loadF7(component, component.props.f7);
    // },
    render: function() {
      // console.log(this.state.loading);
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
