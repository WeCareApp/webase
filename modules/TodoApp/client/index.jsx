import { Component, PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Helmet from 'react-helmet';

import loadF7   from  './loadF7'

import F7 from './f7/js/f7';

import LoginScreen from './components/LoginScreen';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

// Thanks to TrackerReact all our reactive meteor calls render also reactively in react (i.e. user())
@ReactMixin.decorate(TrackerReact)
export default class TodoApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };
  // console.log(this.props.children);
  constructor(props, context) {
    super(props);
    this.state = {
      f7: null
    }
  }

  auth() {
    // Use auth() for auth checks.
    // Fast-Render transports userId() on SSR directly to the client
    // (if he is authed). So we use this for auth checks - faster than Meteor.user()
    return Meteor.userId() ? true : false;
  }

  user() {
    // Only use user() to get the user object.
    // Meteor.userId is also available on the server via a cookie thanks to fast-render
    let userId = Meteor.userId();

    if (userId) {
      // But to SSR user info (i.e. username), we can not get the user object via Meteor.user() on the Server
      // (a reactive data source), so we query the user object via the collection handler (not reactive).
      if (Meteor.isServer) {
        return Meteor.users._collection.findOne({_id: userId});
      }
      return Meteor.user();

    } else {
      return null;
    }
  }

  loggingIn() {
    if(!Meteor.isServer) {
      return Meteor.loggingIn();
    } else {
      return false;
    }
  }

  handleLoginDialog() {
    if(this.user()) {
      Meteor.logout();
    } else {
      this.state.f7.loginScreen();
    }
  }

  // backBtn() {
  //   let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
  //   let route = JSON.parse(sessionStorage.getItem('historyRoute'));
  //   let routeNew = FlowRouter.current().path;
  //   // if((sessionStorage.getItem('historyRoute')==undefined || routeNew==route[index])&& index==1){
  //     // FlowRouter.withReplaceState(function() {
  //     //   FlowRouter.go(route[index-1]);
  //     // });
  //   // }else{
  //   // }
  // }
  // componentWillMount(){
  //   if(!Meteor.isServer){
  //     console.log($('.f7-main'));
  //   }
  // }
  componentDidMount() {
    // if(!Meteor.isServer){
    //   console.log($('.f7-main'));
    // }
      // this.setState({history: this.props.history});
      if(!Meteor.isServer && !!$("[data-page='index']")) {

          if(!!this.props.location.pathname.split('/')[1] && JSON.parse( sessionStorage.getItem('origin') )!=='/'){
            let origin = this.props.location.pathname
            sessionStorage.setItem('origin', JSON.stringify(origin));
            this.props.history.replace('/');
          }else{
            sessionStorage.setItem('origin', JSON.stringify('/'));
          }
        // var self = this;
        // setTimeout(function(){
          let app = new F7({
            swipePanel: 'right',
          });

        //this.setState({app: app});

        // Add main View
          let view = app.addView('.view-main', {
            // Enable dynamic Navbar
            dynamicNavbar: true,
            // Enable Dom Cache so we can use all inline pages
            domCache: true
          });


          // Pass instance to state to pass to children.
          // We are anyhow able to always get the instance via new F7()
          this.setState({f7: app});
          // },0)

        // console.log('layout did mount');
      }

  }
  componentDidUpdate(){
    // if(this.state.init !== true){
    // if(!Meteor.isServer) {
      // console.log('layout did update');
      // console.log(!!Session.get('routeOld'));
      // console.log(this.state.init);
      // if(!!Session.get('routeOld')){


      if(!Meteor.isServer) {
        if(JSON.parse( sessionStorage.getItem('origin') )!=='/'){
          Session.set('routeOld', undefined); // make it load without animation
          let go = JSON.parse( sessionStorage.getItem('origin') );
          sessionStorage.setItem('origin', JSON.stringify('/'));
          this.props.history.push(go)
        }else{
            // console.log($('.navbar-inner.ssr'));
            // var self    = this;
            // var stateF7 = this.state.f7;
            // setTimeout(function(){
            //   $('.navbar-inner.ssr').ready(function(){
            //     if($('.navbar-inner.ssr').length){
            //       // $('.navbar-inner.ssr').on('click', function(){
            //       //   window.history.back();
            //       // })
            //       // location.reload();
            //       console.log(self.props.location.pathname);
            //       $('.navbar-inner.ssr').remove();
            //       // let index           = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
            //       // let history         = JSON.parse(sessionStorage.getItem('history'));
            //       // let pageName     = history[index].replace('#','');
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
            //       // console.log('remove the back');
            //     }
            //
            //     loadF7(self, stateF7);
            //   })
            // },0)
            // let currentName = "";
            // if(this.props.location.pathname.split('/')[1]){
            //   currentName = this.props.location.pathname.split('/')[1];
            // }else if(this.props.location.pathname=='/'){
            //   currentName = 'index';
            // }
            // console.log(currentName);
            // console.log(currentName==JSON.parse(sessionStorage.getItem('ready')));
            // if(currentName==JSON.parse(sessionStorage.getItem('ready'))){
              // console.log(JSON.parse(sessionStorage.getItem('ready')));
              // loadF7(this, this.state.f7);
              // console.log('index');
              // console.log(this.props.location.pathname);
            // }


            loadF7(this, this.state.f7);
        }
      }
      // if(!!$("[data-page='index']")){
        // console.log('loadf7 in index');

      // }


  }

  render() {
    return (
      <span className="f7-main">
				{/*<Helmet
          title="Touch2S To-Do"
          meta={[
            { name: 'description', content: 'Touch2S Meteor F7 Boilerplate' }
          ]}
        />*/}
        {this.props.helmet}
        {/* Status bar overlay for fullscreen mode*/}
        <div className="statusbar-overlay"/>
        {/* Panels overlay*/}
        <div className="panel-overlay"/>
        {/* Left panel with reveal effect*/}
        <LeftPanel />
        {/* Right panel with cover effect*/}
        <RightPanel />
        {/* Views*/}
        <div className="views">
          {/* Your main view, should have "view-main" class*/}
          <div className="view view-main">
            {/* Top Navbar*/}
            {/*<div className="navbar">*/}
              {/* Navbar inner for Index page*/}

              {/* Navbar inner for About page*/}

              {/*{this.props.navbar.map(function(nav){
                // return {nav};
              })}*/}
              {/* Navbar inner for Form page*/}

            {/*</div>*/}
            {/*{this.props.navbar}*/}
            {React.cloneElement(this.props.navbar, {
              // user: this.user(),
              // auth: this.auth(),
              history  : this.props.history
            })}
            {/* Pages, because we need fixed-through navbar and toolbar, it has additional appropriate classes*/}
            {/*{console.log(this.props.children)}*/}
            {/*{React.cloneElement(this.props.page, {user: this.user(), auth: this.auth()})}*/}
            {/*<div className="pages navbar-through toolbar-through">*/}
              {/* Index Page*/}
              {React.cloneElement(this.props.page, {
                user: this.user(),
                auth: this.auth(),
                f7  : this.state.f7
              })}
              {/* About Page*/}

              {/* Form Page*/}
            {/*</div>*/}
            {/* Bottom Toolbar*/}
            <div className="toolbar">
              <div className="toolbar-inner"><a href="#" data-panel="left" className="link open-panel">Info</a><a
                href="#" data-panel="right" className="link open-panel">Options</a></div>
            </div>
          </div>
        </div>
        <LoginScreen user={this.user()} loggingIn={this.loggingIn()} f7={this.state.f7}/>
			</span>
    );
  }
}
