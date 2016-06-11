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

  componentDidMount() {

      // this.setState({history: this.props.history});
      if(!Meteor.isServer) {

          // if(!!this.props.location.pathname.split('/')[1]){
          //   let origin = this.props.location.pathname
          //   sessionStorage.setItem('origin', JSON.stringify(origin));
          //   this.props.history.replace('/');
          // }

          let app = new F7();

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


      // if(!Meteor.isServer) {
      //   if(JSON.parse( sessionStorage.getItem('origin') )!=='/'){
      //     let go = JSON.parse( sessionStorage.getItem('origin') );
      //     sessionStorage.setItem('origin', JSON.stringify('/'));
      //     this.props.history.push(go)
      //   }
      // }

        loadF7(this, this.state.f7);

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
