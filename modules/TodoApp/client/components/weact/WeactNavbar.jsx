var WeactNavbar = React.createClass({
  getInitialState: function() {
    return {
      page: ['index']
    }
  },
  // componentWillUpdate(){
  //   console.log(this.props.location);
  // },
  render: function() {
    // console.log(sessionStorage);
    // console.log(this.props.location);
    let index
    // index = this.state.index

    let action
    let pagePP = this.props.newpage;
    // var navbarP = this.state.page;
    let navbarP
    var history = this.props.history;
    var backLink ;
    backLink= this.props.location.pathname.split('/');
    backLink.shift();
    backLink.pop();
    var back = '/';
    if(backLink.length>0){
      for (var i = 0; i < backLink.length; i++) {
        back += backLink[i]+"/"
      }
    }

    // console.log('yah');


    let currentName;
    // let currentName = this.props.currentName;
    // console.log(this.props.route);
    let pathname = this.props.location.pathname;
    if(pathname.split('/')[1]){
      currentName = pathname.split('/')[1];
    }else if(pathname=='/'){
      currentName = 'index';
    }

    if(!Meteor.isServer){
      navbarP = JSON.parse( sessionStorage.getItem('historyUni')            ) || ['index'];
      // index = JSON.parse( sessionStorage.getItem('historyIndex')   ) || 0;
      index = navbarP.indexOf(currentName)
      action = JSON.parse( sessionStorage.getItem('historyAction')           ) || 'initial';
    }
    else{
      index = 0
      navbarP = ['index']
      if(currentName!=='index'){
        index++
        navbarP.push(currentName)
      }
    }
    // let pageP = navbarP;

    if(!navbarP){
      // index = 0
      navbarP = ['index']
      action = 'initial'
      // if(currentName!=='index'){
      //   index++
      //   navbarP.push(currentName)
      // }
      // console.log('navbar index:'+index+'navbarP:'+ navbarP);
    }

    // console.log(currentName);
    // if(currentName && navbarP && navbarP.indexOf(currentName)==-1){
    //   navbarP.push(currentName);
    //   // .log(pageP);
    // }

    if(!Meteor.isServer){
      if(action!=='back'){
        // console.log(navbarP);
        navbarP = navbarP.slice(0, index+1);
        // console.log(index);
        // console.log(navbarP);
      }
    }

    // if(navbarP && navbarP.indexOf(currentName)<(index))action='back'

    // let currentName;
    // // console.log(this.props.route);
    // let pathname = this.props.location.pathname;
    // if(pathname.split('/')[1]){
    //   currentName = pathname.split('/')[1];
    // }else if(pathname=='/'){
    //   currentName = 'index';
    // }
    // // console.log(currentName);
    // if(currentName && pageP.indexOf(currentName)==-1){
    //   pageP.push(currentName);
    //   console.log(pageP);
    // }
    // let index = pageP.indexOf(currentName)
    // if(navbarP){
      return (
        <div className="navbar">
          {navbarP.map(function(tmp, i){
            let Page;
            if(!Meteor.isServer){
              // Page = pagePP[i];
              Page = require('./../../components/navbar/'+tmp).default;
            }
            else{
              Page = require('./../../components/navbar/'+tmp).default;
            }
            let props = {};
            if( Meteor.isServer){
              props.class= ' ssr'

              props.back  = back
            }
            props['class']= ' navbar-inner'
            // if( tmp=='index'){
            //   props['class']= ' navbar-inner'
            //   props.dataPage = 'index';
            // }
            // if( tmp!=='index' && !Meteor.isServer){
            //   props['class']= ' navbar-inner'
            //   props.class+= ' cached'
            //   props.dataPage = tmp;
            //   // props.back  = back
            // }

            props.dataPage = tmp
            if(Meteor.isServer){
              if(tmp==currentName){
                props.class+=' ssr'
              }else{
                props.class+=' cached'
              }
            }
            if(action=='back' && Session.equals('onSwipe', 1)){
              // if(tmp=='index'){
              //   props.children  = <TodoMain/>   ;
              // }
              if(!Meteor.isServer){
                // console.log(currentName);
                if(tmp!==currentName){
                  if( i == index+1 ) props.class += " navbar-on-center"
                  else
                   props.class  += " cached"
                }
                else{
                  // console.log('onleft:'+currentName);
                    props.class += " navbar-on-left";
                }
              }
            }else{
              if(tmp=='index'){

                // props.children  = <TodoMain/>   ;
                if(!Meteor.isServer){
                  if(currentName!=='index'){
                    if(index-1 == i){
                      props.class += " navbar-on-center";
                    }
                    else props.class  += " cached"     ;
                  }
                }
              }else{
                if(!Meteor.isServer
                  // && tmp!==currentName
                ){
                  // if( i == index+1 ) props.class += " page-on-center";
                  // else
                  if(index-1 == i){
                    props.class += " navbar-on-center";
                  }
                  else props.class  += " cached"     ;
                }
              }
            }
            // if(action=='initial'){
            //   alert('yo')
            //   props.class+=' ssr'
            // }

            if(history){
              props.history=history;
            }
            return <Page {...props} key={i}/>
          })}
        </div>
      )
    // }
    // else return (
    //   <div>Loading...</div>
    // )
  }
})

export default WeactNavbar
