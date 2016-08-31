var GetComponents = function(state, cb) {
  let currentName = "";
  if(state.pathname.split('/')[1]){
    currentName = state.pathname.split('/')[1];
  }else if(state.pathname=='/'){
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
   let list = [ 'helmet', 'page', 'navbar'];
   let num1 = 0;
   let num  = 0;
  //  for (let i = 0; i < list.length; i++) {
  //    num[list[i]]=0;
  //    newpage[list[i]]=[];
  //  }
   for (let i = 0; i < pagePP.length; i++) {
     var handler = require('bundle!./components/pageCreate/'+pagePP[i]);
    //  for (let j = 0; j < list.length; j++) {
    //    if(  pagePP[i]  =='root'
    //    &&   list[j]   !=='page'  ){
    //      continue;
    //    }
    //     handler[list[j]]= require('bundle!./components/'+list[j]+'/'+pagePP[i]);
    //     // var handler = require('bundle!./components/bundle/'+pagePP[i]);
    //
    //  }

    handler(bundle =>{
      newpage[i] = bundle.default();
      num++;
      // if(pagePP[i]=='root'){
      //   if(num[list[j]]==(pagePP.length-1)) num1++;
      // }else{
      //   if(num[list[j]]== pagePP.length   ) num1++;
      // }
      if(num == pagePP.length){
        console.log(page);
        console.log(newpage);
        cb(null, {
          navbar: require('./AsyncRoute.jsx').default('navbar' ),
          page  : require('./AsyncRoute.jsx').default('page'   , newpage),
          helmet: require('./AsyncRoute.jsx').default('helmet' )
        })
      }
    })
   }
}

export default GetComponents
