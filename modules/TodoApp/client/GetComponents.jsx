var GetComponents = function(state, cb) {
  // when element wait for lazy load (async) don't let the page be blank

  let currentName = "";
  if(state.pathname.split('/')[1]){
    currentName = state.pathname.split('/')[1];
  }else if(state.pathname=='/'){
    currentName = 'index';
  }
  // console.log(state);
  let route   ;
  let history ;
  let index   ;
  if(!Meteor.isServer){
    sessionStorage.setItem('ready', JSON.stringify(currentName));
    // setTimeout(function(){
    // $('.navbar-inner.ssr').ready(function(){
    //
    //     console.log('y');
    //     console.log($('.navbar-inner.ssr'));
    //     $('.navbar-inner.ssr').remove();
    //
    //     console.log($('.navbar-inner.ssr'));
    //
    //
    // })
    // },0)
    route = JSON.parse(sessionStorage.getItem('historyRoute'));
    history = JSON.parse(sessionStorage.getItem('history'));
    index = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
    // if(
    //   !!  route  &&
    //       index  !==  null
    // )console.log(1+route[index]);
    // console.log(1+state.pathname);
    // console.log(route[index]==state.pathname);
    //Only work with SSR
    if(
        (
          !!  route             &&
              index  !==  null  &&
              route[index]==state.pathname
        ) ||
        (
          !   route
        )
    ){
      let oldBody = $('.f7-main')[0];
      // if(JSON.parse(sessionStorage.getItem('history'))){
      //
      // }
      let oldScroll = $('[data-page="'+currentName+'"]>.page-content').scrollTop(); // first time oldScroll
      let historyPosition;
      // console.log($('[data-page="index"]>.page-content').scrollTop());
      // if(!!sessionStorage.getItem('historyPosition'))
      historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
      // console.log(historyPosition);
      if(!historyPosition){
        let position = [];
        let oldScroll = $('[data-page="'+currentName+'"]>.page-content').scrollTop(); // Inside time oldScroll
        // console.log(oldScroll);
        // console.log(currentName);
        if(currentName=='index'){
          if(!oldScroll)oldScroll=0;
          position[0]=  oldScroll ;
        }
        else{
          position[0]=  0         ;
          position[1]=  oldScroll ;
        }
        // console.log(position);
        sessionStorage.setItem('historyPosition', JSON.stringify(position));
        // console.log(JSON.parse(sessionStorage.getItem('historyPosition'));)
      }
      // console.log();
      $('#react-app>noscript').ready(function(){
        // console.log('yo');

        $( "#react-app").append(oldBody);

        $('[data-page="'+currentName+'"]>.page-content').scrollTop(oldScroll)
        $('#react-app>noscript').remove();
      })
      // $('.navbar-inner.ssr').ready(function() {
      //   console.log($('.navbar-inner.ssr'));
      //   setTimeout(function(){
      //     $('.navbar-inner.ssr').remove();
      //   },0)
      //   console.log('kill ssr bar');
      // })
    }
    // console.log('1refresh');
    // if()console.log('1what!');
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
  // page.push('about')
  // console.log(page);
  if(!Meteor.isServer){
    // sessionStorage.setItem('ready', JSON.stringify(false));
    let pagePP = page;
     let newpage= {};
     // let index = 'about'
     let list = [ 'helmet', 'page', 'navbar'];
     let num1 = 0;
     let num  = {};
     let ready = list.length*(pagePP.length-1)+1;
     for (let i = 0; i < list.length; i++) {
       num[list[i]]=0;
       newpage[list[i]]=[];
     }
     for (let i = 0; i < pagePP.length; i++) {
       var handler = {};
       for (let j = 0; j < list.length; j++) {
         if(  pagePP[i]  =='root'
         &&   list[j]   !=='page'  ){
           continue;
         }
          handler[list[j]]= require('bundle!./components/'+list[j]+'/'+pagePP[i]);
          // var handler = require('bundle!./components/bundle/'+pagePP[i]);
          handler[list[j]](bundle =>{
            newpage[list[j]][i] = bundle.default;
            num1++;
            // num[list[j]]++;
            // console.log(pagePP[i] +''+list[j]+''+ num[list[j]]);
            // if(num[list[j]]!=='page'){
            //   if(num[list[j]]==(pagePP.length-1)) num1++;
            // }else{
            //   if(num[list[j]]== pagePP.length   ) num1++;
            // }
            // console.log(num1);
            // console.log(ready);
            if(num1==ready){
              // let index           = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
              // let history         = JSON.parse(sessionStorage.getItem('history'));
              // // let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
              // let currentName     = history[index].replace('#','');
              // sessionStorage.setItem('ready', JSON.stringify(currentName));
              // console.log(currentName);
              let req = require('./AsyncRoute.jsx');
              let callback = {};
              for (let i = 0; i < list.length; i++) {
                if(list[i]!=='page'){
                  newpage[list[i]].shift();
                }
                if(list[i] =='helmet' || Meteor.isServer){
                  callback[list[i]] = req.default(list[i]                   )
                }else {
                  callback[list[i]] = req.default(list[i] , newpage[list[i]])
                }
              }
              //remove the transaction element
              // if($('#react-app>noscript')){
              //   $('#react-app>.f7-main').remove()
              // }
              cb( null, callback);
              // console.log(callback);

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
