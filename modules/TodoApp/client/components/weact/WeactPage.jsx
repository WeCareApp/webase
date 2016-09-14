import TodoMain from  './../../TodoMain';
let WeactPage = React.createClass({
  getInitialState: function() {
    return {
      loading: true             ,
      page: ['root', 'index']   ,
      index: 1
    }
  },
  render: function() {
    console.log(this.props.historyAction);
    console.log(this.props.historyRoute)
    // let action = this.props.historyAction;
    let index
    // index = this.state.index

    let action
    let pagePP = this.props.newpage;
    // let pageP = this.props.historyRoute;
    let pageP

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
      index = JSON.parse( sessionStorage.getItem('historyRouteIndex') )+1;
      pageP = JSON.parse( sessionStorage.getItem('history')           ) ;
      action = JSON.parse( sessionStorage.getItem('historyAction')           ) ;
    }
    else{
      // if(currentName=='index'){
        index = 1
        pageP = ['index']
      // }
      if(currentName!=='index'){
        index++
        pageP.push(currentName)
      }
    }

    // for(let i=1; i<route.length; i++){
    //   let tmp = route[i];
    //   tmp = tmp.replace('/','#');
    //   history.push(tmp);
    // }
    if(!!pageP && pageP.indexOf('root')==-1) pageP.unshift("root")
    if(!pageP)pageP = ['root', 'index']
    console.log(pageP);
    // console.log(this.props.currentName);

    console.log(currentName);
    if(currentName && pageP.indexOf(currentName)==-1){
      pageP.push(currentName);
      console.log(pageP);
    }

    // if(pageP.indexOf(currentName)<(index))action='back'
    // let index = this.props.historyIndex
    let loading = this.state.loading;
    return (
      <div className="pages navbar-through toolbar-through">
        {pageP.map(function(tmp, i){
          let Page;
          if(!Meteor.isServer){
            // Page = pagePP[i];
            Page = require('./../../components/page/'+tmp).default;
          }else{
            Page = require('./../../components/page/'+tmp).default;
          }

            let props = {};
              props.class     = " page"       ;
            if(action=='back'){
              // index+=1;
              if(tmp=='index'){
                props.children  = <TodoMain/>   ;
              }
              if(!Meteor.isServer){
                console.log(currentName);
                if(tmp!==currentName){
                  if( i == index+1 ) props.class += " page-on-center"
                  else
                   props.class  += " cached"
                }
                else{
                  // console.log('onleft:'+currentName);
                    props.class += " page-on-left";
                }
              }
            }else{
              // index--;
              if(tmp=='index'){

                props.children  = <TodoMain/>   ;
                if(!Meteor.isServer){
                  if(currentName!=='index'){
                    if(index-1 == i){
                      props.class += " page-on-center";
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
                    props.class += " page-on-center";
                  }
                  else props.class  += " cached"     ;
                }
              }
            }

            loading=false;
            return    <Page {...props} key={i} />;
        })}
      </div>
    )
  }
});

export default WeactPage
