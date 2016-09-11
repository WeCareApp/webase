import TodoMain from  './../../TodoMain';
let WeactPage = React.createClass({
  getInitialState: function() {
    return {
      loading: true             ,
      page: ['root', 'index']
    }
  },
  render: function() {
    let pagePP = this.props.newpage;
    let pageP = this.state.page;
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
    let loading = this.state.loading;
    return (
      <div className="pages navbar-through toolbar-through">
        {pageP.map(function(tmp, i){
          let Page;
          if(!Meteor.isServer){
            // Page = pagePP[i];
            Page = require('./../../components/page/'+tmp).default;
          }else{
            Page = require('./components/page/'+tmp).default;
          }

            let props = {};
              props.class     = " page"       ;
            if(tmp=='index'){
              if( i == index-1 ) props.class += " page-on-center";
              props.children  = <TodoMain/>   ;
              if(!Meteor.isServer){
                // props.class  += " cached"     ;
              }
            }else{
              if(!Meteor.isServer
                // && tmp!==currentName
              ){
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

export default WeactPage
