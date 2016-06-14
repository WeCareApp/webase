import { Route, IndexRoute } from 'react-router';
//import { FlowRouter } from 'meteor/meteorhacks:flow-router';
//import { ReactLayout } from 'meteor/kadira:react-layout';

import TodoApp from './index';
import TodoMain from './TodoMain';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import AsyncRoute from './AsyncRoute.jsx';


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
      navbar: AsyncRoute('navbar' ),
      page  : AsyncRoute('page'   ),
      helmet: AsyncRoute('helmet' )
    }
  }
}

export default (
 <Route>
   <Route path="/" component={TodoApp}>
    <IndexRoute components={components()}
      // {
      //   navbar: wrapComponent(WeactNavbar,{navbar: navbar})
      // }
    // }
    /*getComponents (state, cb) {
          require.ensure([], (require) => {
            cb(null, [
              require('./Components')
            ])
          })
    }             */
   />

     {/*<IndexRoute getComponents={(location, cb) =>{
       require.ensure([], function () {
         let field = {};
         let NavbarIndex = require('./components/navbar/index').default;
         let NavbarAbout = require('./components/navbar/about').default;
         let NavbarForm  = require('./components/navbar/form').default;
         let PageAbout   = require('./components/page/about').default;
         let PageForm    = require('./components/page/form').default;
         let PageIndex   = require('./components/page/index').default;
         let PageRoot   = require('./components/page/root').default;
         // let Dashboard = require('./Dashboard');
         // console.log(sessionStorage.getItem('history'))
         let route = JSON.parse(sessionStorage.getItem('historyRoute'));
         let history = JSON.parse(sessionStorage.getItem('history'));
         let index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
         // history = history.slice(0, index+1);
         let item=[];
         let currentName = "";
         // FlowRouter.current().route.path.split('/')[1];
         if( currentName == "")currentName= 'index';
         var navbar = ['index'];
         let page   = ['root','index'];
         if(currentName!=='index'){
           navbar.push(currentName);
           page.push(currentName);
         }
         if(!!history){
           // navbar="<div>"
           navbar  = ['index'];
           page    = ['root','index'];
           // console.log(history.length);
           for(let i=1; i<history.length; i++){
             let tmp = history[i];
             // console.log(tmp);
             tmp = tmp.replace('#','');
             navbar.push(tmp);
             page.push(tmp);
           }
           if(currentName!=='index' && navbar.indexOf(currentName)<0)navbar.push(currentName);
           if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
         }
         // console.log(navbar);
         // console.log(page);


         // let WeactPage = page.map(function(tmp, i){
         //   let name = 'Page'+tmp.charAt(0).toUpperCase() + tmp.slice(1);
         //   let Page = eval(name);
         //   // if(tmp=='index' && currentName =='index')
         //   //   return  <Page class='navbar-inner'         key={i}/>;
         //   return    <Page key={i}/>;
         // })

         let app         ;
         let layout  = {};
         let defaultLayout = {
           app     : TodoApp                         ,
           children: <TodoMain />                    ,
           navbar  : <WeactNavbar navbar={navbar}/>  ,
           page    : <WeactPage     page={page}  />  ,


           // page    : <WeactPage                       ,
         }

         //load defaultLayout
         for(let i in defaultLayout) {
           if (defaultLayout.hasOwnProperty(i)) {
             let value = field[i] || defaultLayout[i];
             if(i=='app') app = value;
             else{
               layout[i] = value
             }
             if(field[i])delete field[i];
             delete defaultLayout[i];
           }
         }
         for(let i in field) {
           if (field.hasOwnProperty(i)) {
             layout[i] = field[i];
           }
         }
         cb(null, layout)
       })
     }}
     />*/}
     <Route path="/about"  components={components()} />
     <Route path="/form"   components={components()} />
     {/*<Route path="/form1"  components={components()} />*/}
     {/*</Route>*/}

   </Route>
 </Route>
);
