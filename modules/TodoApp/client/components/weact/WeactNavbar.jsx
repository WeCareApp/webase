var WeactNavbar = React.createClass({
  getInitialState: function() {
    return {
      page: ['index']
    }
  },
  render: function() {

    let pagePP = this.props.newpage;
    var navbarP = this.state.page;
    var history = this.props.history;
    var backLink ;
    // = component.props.location.pathname.split('/');
    // backLink.shift();
    // backLink.pop();
    // var back = '/';
    // if(backLink.length>0){
    //   for (var i = 0; i < backLink.length; i++) {
    //     back += backLink[i]+"/"
    //   }
    // }
    let pageP = navbarP;
    let currentName;
    // console.log(this.props.route);
    let pathname = this.props.location.pathname;
    if(pathname.split('/')[1]){
      currentName = pathname.split('/')[1];
    }else if(pathname=='/'){
      currentName = 'index';
    }
    // console.log(currentName);
    if(currentName && pageP.indexOf(currentName)==-1){
      pageP.push(currentName);
      console.log(pageP);
    }
    let index = pageP.indexOf(currentName)
    return (
      <div className="navbar">
        {navbarP.map(function(tmp, i){
          let Page;
          if(!Meteor.isServer){
            // Page = pagePP[i];
            Page = require('./../../components/navbar/'+tmp).default;
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
})

export default WeactNavbar
