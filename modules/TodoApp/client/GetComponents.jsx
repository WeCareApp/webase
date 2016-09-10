var GetComponents = function(state, cb) {
  // when element wait for lazy load (async) don't let the page be blank

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
    // sessionStorage.setItem('ready', JSON.stringify(currentName));
    route = JSON.parse(sessionStorage.getItem('historyRoute'));
    history = JSON.parse(sessionStorage.getItem('history'));
    index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));

    //Only work with SSR
    // if(
    //     (
    //       !!  route             &&
    //           index  !==  null  &&
    //           route[index]==state.pathname
    //     ) ||
    //     (
    //       !   route
    //     )
    // ){
    //   let oldBody = $('.f7-main')[0];
    //
    //   let oldScroll = $('[data-page="'+currentName+'"]>.page-content').scrollTop(); // first time oldScroll
    //   let historyPosition;
    //
    //   historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
    //
    //   if(!historyPosition){
    //     let position = [];
    //     let oldScroll = $('[data-page="'+currentName+'"]>.page-content').scrollTop(); // Inside time oldScroll
    //
    //     if(currentName=='index'){
    //       if(!oldScroll)oldScroll=0;
    //       position[0]=  oldScroll ;
    //     }
    //     else{
    //       position[0]=  0         ;
    //       position[1]=  oldScroll ;
    //     }
    //
    //     sessionStorage.setItem('historyPosition', JSON.stringify(position));
    //
    //   }
    //
    //   $('#react-app>noscript').ready(function(){
    //
    //     $( "#react-app").append(oldBody);
    //
    //     $('[data-page="'+currentName+'"]>.page-content').scrollTop(oldScroll)
    //     $('#react-app>noscript').remove();
    //   })
    //
    // }

  }
  let page = [];
  let fieldIn = 'page'
  // if(!Meteor.isServer){ //client code
  //   if(fieldIn=='page'){
  //     page   = ['root','index'] ;
  //   }else if(fieldIn=='navbar'){
  //     page   = ['index']        ;
  //   }
  //   if(!!history){
  //     for(let i=1; i<history.length; i++){
  //       let tmp = history[i]
  //       tmp = tmp.replace('#','');
  //       page.push(tmp);
  //     }
  //   }
  //   if(currentName!=='index' &&   page.indexOf(currentName)<0)  page.push(currentName);
  // }else{                //server code
    page.push(currentName);
  // }

  if(!Meteor.isServer){
    let pagePP = page;
    console.log(pagePP);
     let newpage= {};
     let list = [ 'helmet', 'page', 'navbar'];
     let num1 = 0;
     let num  = {};
    //  let ready = list.length*(pagePP.length-1)+1;
    let ready = list.length*(pagePP.length);
     for (let i = 0; i < list.length; i++) {
       num[list[i]]=0;
       newpage[list[i]]=[];
     }
     for (let i = 0; i < pagePP.length; i++) {
       var handler = {};
       for (let j = 0; j < list.length; j++) {
        //  if(  pagePP[i]  =='root'
        //  &&   list[j]   !=='page'  ){
        //    continue;
        //  }
          handler[list[j]]= require('bundle!./components/'+list[j]+'/'+pagePP[i]);

          handler[list[j]](bundle =>{
            newpage[list[j]][i] = bundle.default;
            num1++;

            if(num1==ready){

              let req = require('./AsyncRoute.jsx');
              let callback = {};
              for (let i = 0; i < list.length; i++) {
                // if(list[i]!=='page'){
                //   newpage[list[i]].shift();
                // }
                if(list[i] =='helmet' || Meteor.isServer){
                  callback[list[i]] = req.default(list[i]                   )
                }else {
                  console.log(newpage[list[i]]);
                  callback[list[i]] = req.default(list[i] , newpage[list[i]])
                }
              }

              cb( null, callback);

            }
          })
       }


     }
  }else{
    let req = require('./AsyncRoute.jsx');
    cb(null, {
      navbar: req.default('navbar'  ),
      page  : req.default('page'    ),
      helmet: req.default('helmet'  )
    })
  }

}

export default GetComponents
