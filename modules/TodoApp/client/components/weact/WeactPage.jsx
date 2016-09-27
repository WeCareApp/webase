import TodoMain from  './../../TodoMain';
let WeactPage = React.createClass({
  getInitialState: function() {
    return {
      loading : true             ,
      page    : ['root', 'index']   ,
      index   : 1                  ,
      bundle  : {
        root  : require('./../../components/page/root'  ).default ,
        index : require('./../../components/page/index' ).default
      }

    }
  },
  render: function() {
    // console.log(this.state.bundle);
    // console.log(this.props.historyAction);
    // console.log(this.props.historyRoute)
    // let action = this.props.historyAction;

    // console.log(JSON.parse(sessionStorage.getItem('isRefresh')));
    // console.log(JSON.parse(sessionStorage.getItem('historyIndex')));
    // console.log(JSON.parse(sessionStorage.getItem('history')));
    // console.log(JSON.parse(sessionStorage.getItem('historyAction')));
    // console.log(JSON.parse(sessionStorage.getItem('historyRoute')));

    // let     historyIndex  =
    // let     history       =
    // let     historyAction =
    // let     route         =
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

    // if(this.state.page.indexOf(currentName)==-1){
    //   console.log(this.state.page)
    //   let page
    //   page  = this.state.page
    //   page.push(currentName)
    //   console.log(page)
    //   this.setState({page: page})
    //   console.log(this.state.page)
    //   console.log(page)
    // }
    // console.log(this.state.page);


    if(!Meteor.isServer){
      // this.setState({page })
      // index = JSON.parse( sessionStorage.getItem('historyIndex')) || 0;
      pageP = JSON.parse( sessionStorage.getItem('historyUni')           ) || [ 'root', 'index'];
      // index = pageP.indexOf(currentName)
      action = JSON.parse( sessionStorage.getItem('historyAction')           ) || 'initial' ;
      // console.log(pageP);
      // console.log(index);

    }

    if( Meteor.isServer
      // || JSON.parse(sessionStorage.getItem('isRefresh'))==1
    ){
      // if(currentName=='index'){
        index = 0
        pageP = ['index']
      // }
      if(currentName!=='index'){
        index++
        pageP.push(currentName)
      }
      // action = 'refresh'
    }

    if(this.state.page.indexOf(currentName)==-1){
      this.state.page.push(currentName)
    }
    let k = 0;
    // console.log(pageP);
    while(k<pageP.length){
      if(this.state.page.indexOf(pageP[k])==-1){
        pageP.splice(k,1)
      }
      else k++
    }
    // console.log(this.state.page);
    // console.log(action);
    // else



    // for(let i=1; i<route.length; i++){
    //   let tmp = route[i];
    //   tmp = tmp.replace('/','#');
    //   history.push(tmp);
    // }
    if(!!pageP && pageP.indexOf('root')==-1) pageP.unshift("root")
    if(!pageP)pageP = ['root', 'index']

    index = pageP.indexOf(currentName)
    // console.log(index);
    // alert(JSON.parse(sessionStorage.getItem('isRefresh')));

    // if(JSON.parse(sessionStorage.getItem('isRefresh'))==1){
    //   if(currentName=='index')
    // }

    let loading = this.state.loading;

    if(!Meteor.isServer){
      let self  = this
      let pl    = pageP.length
      let j     = 0
      pageP.map(function(tmp, i){
        if(!self.state.bundle[tmp]){
          if(tmp=='root'){
            // self.state.bundle['root']   = require('./../../components/page/root').default
          }
          else if(tmp=='index'){
            // self.state.bundle['index']  = require('./../../components/page/index').default
          }
          else {
            let fetch = require('bundle!./../../components/page/'+tmp);

            fetch(bundle =>{
              self.state.bundle[tmp] = bundle.default;
              j++
              // alert()
              // alert(pl)
              if(Object.keys(self.state.bundle).length==pl){
                // console.log('ready')

              }
            })
          }
        }
      })
      if(action!=='back'){
        // console.log(pageP);
        pageP = pageP.slice(0, index+1);
        // console.log(index);
        // console.log(pageP);
      }
      // console.log(this.state.bundle);
    }

    // console.log(pageP);
    // console.log(this.props.currentName);
    // console.log(index);

    // if(!Meteor.isServer){
    //   if(this.state.page!==pageP){
    //     pageP = JSON.parse( sessionStorage.getItem('history')           )
    //     // || [ 'root', 'index'];
    //      this.setState({page : pageP})
    //   }
    //   console.log(this.state.page!==pageP);
    //   console.log(JSON.parse( sessionStorage.getItem('history')           ));
    //   console.log(pageP);
    //   //
    //   console.log(this.state.page);
    // }
    // // console.log(currentName);
    // if(currentName && pageP.indexOf(currentName)==-1){
    //   pageP.push(currentName);
    //   // console.log(pageP);
    // }
    // console.log(pageP);

    // if(pageP.indexOf(currentName)<(index))action='back'
    // let index = this.props.historyIndex
    let pageBundle = this.state.bundle
    // console.log('render page');
    // console.log(pageP);
    // console.log(pageBundle);
    // console.log(sessionStorage);
    // alert(JSON.parse(sessionStorage.getItem('isRefresh')));
    return (
      <div className="pages navbar-through toolbar-through">
        {pageP.map(function(tmp, i){
          let Page;
          if(!Meteor.isServer){
            // Page = pagePP[i];
            // console.log(pageBundle[tmp]);
            // Page  = require('./../../components/page/'+tmp).default;
            Page  = pageBundle[tmp]
            // fetch(bundle =>{
            //   Page = bundle.default
            // })
          }else{
            Page = require('./../../components/page/'+tmp).default;
          }

            let props = {};
              props.class     = " page"       ;
            if(action=='back' && Session.equals('onSwipe', 1)){
              // index+=1;
              if(tmp=='index'){
                props.children  = <TodoMain/>   ;
              }
              if(!Meteor.isServer){
                // console.log(currentName);
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
              // console.log('index:'+index);
              // console.log('i:'+ i);
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
