import { Route, IndexRoute } from 'react-router';
//import { FlowRouter } from 'meteor/meteorhacks:flow-router';
//import { ReactLayout } from 'meteor/kadira:react-layout';

import TodoApp        from  './index'                       ;
import TodoMain       from  './TodoMain'                    ;
import LeftPanel      from  './components/LeftPanel'        ;
import RightPanel     from  './components/RightPanel'       ;
import AsyncRoute     from  './AsyncRoute.jsx'              ;
import GetComponents  from  './GetComponents'               ;
import StorePosition  from  './StorePosition'               ;

// import HistoryAction  from  './HistoryAction'               ;


var components = function(){
  if(Meteor.isServer){
    return{
      navbar: AsyncRoute('navbar' ),
      page  : AsyncRoute('page'   ),
      helmet: AsyncRoute('helmet' )
    }
  }
  else {
    return{
      navbar: require('./AsyncRoute.jsx').default('navbar' ),
      page  : require('./AsyncRoute.jsx').default('page'   ),
      helmet: require('./AsyncRoute.jsx').default('helmet' )
    }
  }
}

export default (
  <Route>
    <Route path="/" component={TodoApp}>
      <IndexRoute
      //components={components()}
      // {
      //   navbar: wrapComponent(WeactNavbar,{navbar: navbar})
      // }
    // }
        getComponents ={( state,  cb    ) =>  {
          // console.log(state.pathname);
          // console.log(JSON.parse(sessionStorage.getItem('isRefresh')));

          // HistoryAction(this)



          GetComponents(state, cb)
        }}
        onLeave       ={( next, replace ) =>  {
          StorePosition() //Store page position when leave the page
        }}
      />

     <Route path="/about"
       getComponents={(state, cb) => {
         GetComponents(state, cb)
        // console.log(state.pathname);
        // console.log(JSON.parse(sessionStorage.getItem('isRefresh')));

        // HistoryAction(state)
        // let currentName = "";
        // if(state.pathname.split('/')[1]){
        //   currentName = state.pathname.split('/')[1];
        // }else if(state.pathname=='/'){
        //   currentName = 'index';
        // }
        // // if(JSON.parse(sessionStorage.getItem('isRefresh'))==0){
        // //   // sessionStorage.setItem('isRefresh', JSON.stringify(0));
        // //   // console.log(this.props.location);
        // //     HistoryAction(state, currentName)
        // // }
        // let helmetCb;
        // if(!Meteor.isServer){
        //   let helmetbundle = require('bundle!./components/helmet/'+currentName);
        //   helmetbundle(helmet =>{
        //     helmetCb = helmet.default;
        //     // component.setState({loading: false});
        //     // return;
        //   })
        // }else{
        //   let helmet = require('./components/helmet/'+currentName);
        //     helmetCb = helmet.default;
        //     // component.setState({loading: false});
        //     // return;
        // }
        // cb(null, {
        //   navbar: WeactNavbar,
        //   page  : WeactPage,
        //   helmet: helmetCb
        // })
       }}
       onLeave       ={( next, replace ) =>  {
         StorePosition() //Store page position when leave the page
       }}
     //components={components()}
     /*getComponents={(state, cb) => {
      //  console.log(state);
       let currentName = "";
       if(state.pathname.split('/')[1]){
         currentName = state.pathname.split('/')[1];
       }else if(state.pathname=='/'){
         currentName = 'index';
       }
      //  console.log(currentName);
       // if(component.props.location.pathname.split('/')[1]){
       //   currentName = component.props.location.pathname.split('/')[1];
       // }else if(component.props.location.pathname=='/'){
       //   currentName = 'index';
       // }
       let route   ;
       let history ;
       let index   ;
       if(!Meteor.isServer){
         route = JSON.parse(sessionStorage.getItem('historyRoute'));
         history = JSON.parse(sessionStorage.getItem('history'));
         index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
       }
       let page = [];
       let fieldIn = 'page'
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
       let pagePP = page;
        let newpage= [];
        // let index = 'about'
        let num = 0;
        for (let i = 0; i < pagePP.length; i++) {
          var handler = require('bundle!./components/pageCreate/'+pagePP[i]);
          handler(bundle =>{
            newpage[i] = bundle.default();
            num++;
            if(num==pagePP.length){
              console.log(newpage);
              cb(null, {
                navbar: require('./AsyncRoute.jsx').default('navbar' ),
                page  : require('./AsyncRoute.jsx').default('page'   , newpage),
                helmet: require('./AsyncRoute.jsx').default('helmet' )
              })
            }
          })
        }
          //  require.ensure([], (require) => {
          //   //  let about = require('./AsyncRouteAbout.jsx').default();
          //   let about = require('./AsyncRoute.jsx').default('page'   );
          //    cb(null, {
          //      navbar: require('./AsyncRoute.jsx').default('navbar' ),
          //      page  : about,
          //      helmet: require('./AsyncRoute.jsx').default('helmet' )
          //    })
          //  })
     }}*/
     />
     <Route path="/form"
     //components={components()}
       /*getComponents={(state, cb) => {
             require.ensure([], (require) => {
               cb(null, components())
             })
       }}*/
       getComponents={(state, cb) => {
        //  HistoryAction(state)

        // console.log(state);
        //  let currentName = "";
        //  if(state.pathname.split('/')[1]){
        //    currentName = state.pathname.split('/')[1];
        //  }else if(state.pathname=='/'){
        //    currentName = 'index';
        //  }
        // //  if(JSON.parse(sessionStorage.getItem('isRefresh'))==0){
        // //   //  sessionStorage.setItem('isRefresh', JSON.stringify(0));
        // //    // console.log(this.props.location);
        // //      HistoryAction(state, currentName)
        // //  }
        // //  console.log(currentName);
        //  let helmetCb;
        //  if(!Meteor.isServer){
        //    let helmetbundle = require('bundle!./components/helmet/'+currentName);
        //    helmetbundle(helmet =>{
        //      helmetCb = helmet.default;
        //      // component.setState({loading: false});
        //      // return;
        //    })
        //  }else{
        //    let helmet = require('./components/helmet/'+currentName);
        //      helmetCb = helmet.default;
        //      // component.setState({loading: false});
        //      // return;
        //  }
        //  cb(null, {
        //    navbar: WeactNavbar,
        //    page  : WeactPage,
        //    helmet: helmetCb
        //  })
         GetComponents(state, cb)
       }}
       onLeave       ={( next, replace ) =>  {
         StorePosition() //Store page position when leave the page
       }}
     />
     <Route path="/form1"
     //components={components()}
       /*getComponents={(state, cb) => {
             require.ensure([], (require) => {
               cb(null, components())
             })
       }}*/
       getComponents={(state, cb) => {
        //  HistoryAction(state)

        // // console.log(state);
        //  let currentName = "";
        //  if(state.pathname.split('/')[1]){
        //    currentName = state.pathname.split('/')[1];
        //  }else if(state.pathname=='/'){
        //    currentName = 'index';
        //  }
        // //  if(JSON.parse(sessionStorage.getItem('isRefresh'))==0){
        // //   //  sessionStorage.setItem('isRefresh', JSON.stringify(0));
        // //    // console.log(this.props.location);
        // //      HistoryAction(state, currentName)
        // //  }
        // //  console.log(currentName);
        //  let helmetCb;
        //  if(!Meteor.isServer){
        //    let helmetbundle = require('bundle!./components/helmet/'+currentName);
        //    helmetbundle(helmet =>{
        //      helmetCb = helmet.default;
        //      // component.setState({loading: false});
        //      // return;
        //    })
        //  }else{
        //    let helmet = require('./components/helmet/'+currentName);
        //      helmetCb = helmet.default;
        //      // component.setState({loading: false});
        //      // return;
        //  }
        //  cb(null, {
        //    navbar: WeactNavbar,
        //    page  : WeactPage,
        //    helmet: helmetCb
        //  })
         GetComponents(state, cb)
       }}
       onLeave       ={( next, replace ) =>  {
         StorePosition() //Store page position when leave the page
       }}
     />
     {/*<Route path="/form1"  components={components()} />*/}
     {/*</Route>*/}

   </Route>

 </Route>
);
