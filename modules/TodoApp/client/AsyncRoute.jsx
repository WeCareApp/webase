import React from 'react';
import TodoMain from  './TodoMain';
import loadF7   from  './loadF7';

function requireContent(fieldIn, component, newpage) {
  if(!Meteor.isServer){
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
          if( fieldIn == 'page'){
            var WeactPage = React.createClass({
              getInitialState: function() {
                return {
                  loading: true
                }
              },
              render: function() {
                let pagePP = this.props.newpage;
                let pageP = this.props.page;
                let loading = this.state.loading;
                return (
                  <div className="pages navbar-through toolbar-through">
                    {pageP.map(function(tmp, i){
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
                var navbarP = this.props.page;
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
          if(
              component.state.init==true &&
              component.state.loading==false && fieldIn =='page' && !Meteor.isServer){
              loadF7(component, component.props.f7);
              console.log('async');
          }

}

function getRoute(fieldIn, component, newpage) {
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
        let helmetbundle = require('bundle!./components/helmet/'+currentName);
        helmetbundle(helmet =>{
          component.Page = wrapComponent(helmet.default);
          component.setState({loading: false});
          return;
        })
      }else{
        let helmet = require('./components/helmet/'+currentName);
          component.Page = wrapComponent(helmet.default);
          component.setState({loading: false});
          return;
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
        getRoute(hasRoute, this, newpage);
    },
    componentDidMount: function(){
      //control async first f7 render
      let hasRoute = route || {};
      this.setState({init: true});
    },
    render: function() {
      if (this.state.loading) {
        return (
          <div>Loading...</div>
        );
      } else {
        return (
          <this.Page {...this.props}/>
        );
      }
    }
  });
};

export default AsyncRoute;
