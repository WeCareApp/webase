import WeactPage      from  './components/weact/WeactPage'  ;
import WeactNavbar    from  './components/weact/WeactNavbar';

var GetComponents = function(state, cb) {
  // console.log(JSON.parse(sessionStorage.getItem('isRefresh1')));
  let isRefresh = 0
  if(!Meteor.isServer){
    if(JSON.parse(sessionStorage.getItem('isRefresh1'))==1){
      isRefresh = 1
      sessionStorage.setItem('isRefresh1', JSON.stringify(0));
    }
  }

  // let isRefresh = !!$('html.loaded')
  // if(!$('html.loaded'))$('html').addClass('loaded')
  // console.log(isRefresh);
  //get currentName
  let currentName = "";
  if(state.pathname.split('/')[1]){
    currentName = state.pathname.split('/')[1];
  }else if(state.pathname=='/'){
    currentName = 'index';
  }

  // console.log(!!$('[data-page="'+currentName+'"]'));

  let toLoad = []

  if(!Meteor.isServer){
    // every history is the last page data
    let             route = JSON.parse(sessionStorage.getItem('historyRoute'));
    let     historyIndex  = JSON.parse(sessionStorage.getItem('historyIndex'))
    let     history       = JSON.parse(sessionStorage.getItem('history'))
    let     correntIndex  = historyIndex
    let            index  = historyIndex


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

      let oldScroll = $('[data-page="'+currentName+'"]>.page-content').scrollTop(); // first time oldScroll
      let historyPosition;
      //
      // historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
      //
      // if(!historyPosition){
      //   let position = [];
      //   let oldScroll = $('[data-page="'+currentName+'"]>.page-content').scrollTop(); // Inside time oldScroll
      //
      //   if(currentName=='index'){
      //     if(!oldScroll)oldScroll=0;
      //     position[0]=  oldScroll ;
      //   }
      //   else{
      //     position[0]=  0         ;
      //     position[1]=  oldScroll ;
      //   }
      //
      //   sessionStorage.setItem('historyPosition', JSON.stringify(position));
      //
      // }

      $('#react-app>noscript').ready(function(){

        $( "#react-app").append(oldBody);

        $('[data-page="'+currentName+'"]>.page-content').scrollTop(oldScroll)
        $('#react-app>noscript').remove();
      })

    }

    // if(history && historyIndex!==null)console.log(history[historyIndex])
    // if initial - all is null
    if     ( !history){

    }
    // if refresh at the same page
    else if(  history[historyIndex]   ==  currentName){
      sessionStorage.setItem('loaded', JSON.stringify([]));
    }
    // jump out to other page and get in
    else if(isRefresh==1){
      sessionStorage.setItem('loaded', JSON.stringify([]));
      correntIndex = 1
      sessionStorage.setItem('origin', JSON.stringify(state.pathname));
    }
    // if back
    else if(  historyIndex-1  >=  0
          &&  history[historyIndex-1] == currentName
    ){
      correntIndex--
    }
    // if forward
    else if(  historyIndex+1  <   history.length
          &&  history[historyIndex+1] == currentName
    ){
      correntIndex++
    }
    // if new
    else{
      correntIndex++
    }

    if(currentName!=='index'){
      toLoad.push(currentName)
    }

    // no need to load index for back
    if(historyIndex!==null && correntIndex>1){
      toLoad.push(history[correntIndex-1])
    }

    let     loaded        = JSON.parse(sessionStorage.getItem('loaded'))
    if(!!loaded){
      let k = 0;
      // console.log(pageP);
      while(k<toLoad.length){
        if(loaded.indexOf(toLoad[k])!==-1){
          toLoad.splice(k,1)
        }
        else k++
      }
    }

    // console.log(toLoad);

  }

  let wrapComponent = function(Component, props) {
    return React.createClass({
      render: function() {
        var propsMerge = {};
        if(this.props!==null) for (var attrname in this.props) { propsMerge[attrname] = this.props[attrname]; }
        if(props!==null) for (var attrname in props)      { propsMerge[attrname] = props[attrname]; }
        return React.createElement(Component, propsMerge);
      }
    });
  };

  // if(JSON.parse(sessionStorage.getItem('isRefresh'))==0){
  //   // sessionStorage.setItem('isRefresh', JSON.stringify(0));
  //   // console.log(this.props.location);
  //     HistoryAction(state, currentName)
  // }
  let helmetCb;
  let num1
  let square
  let list
  let ll
  if(!Meteor.isServer){
    list    = ['page', 'navbar']
    ll      = list.length
    square = ll * toLoad.length+1
    num1    = 0
    let helmetbundle = require('bundle!./components/helmet/'+currentName);
    helmetbundle(helmet =>{
      num1 ++
      helmetCb = helmet.default;
      if(num1==square){
        // let bundle = JSON.parse(localStorage.getItem('bundle')) || {}
        // bundle=newpage
       //  console.log(bundle);
       // sessionStorage.setItem('bundle', JSON.stringify(new));
       // Session.set('bundle', newpage)
       let         loaded  = JSON.parse(sessionStorage.getItem('loaded'))
       if(!loaded) loaded  = []
       // loaded.push(currentName)
       // console.log(Array.from(new Set(loaded.concat(toLoad))));
       // console.log(loaded);
       loaded = Array.from(new Set(loaded.concat(toLoad)))
       // console.log(loaded);
       sessionStorage.setItem('loaded', JSON.stringify(loaded));
       // console.log(bundle);
        cb(null, {
          navbar: WeactNavbar,
          page  : WeactPage,
          helmet: helmetCb
        })
       //  let req = require('./AsyncRoute.jsx');
       //  let callback = {};
       //  for (let i = 0; i < ll; i++) {
          // if(list[i]!=='page'){
          //   newpage[list[i]].shift();
          // }
         //  if(list[i] =='helmet' || Meteor.isServer){
         //    callback[list[i]] = req.default(list[i]                   )
         //  }else {
         //    console.log(newpage[list[i]]);
         //    callback[list[i]] = req.default(list[i] , newpage[list[i]])
         //  }
       //  }

       //  cb( null, callback);

      }
      // component.setState({loading: false});
      // return;
    })
  }else{
    let helmet = require('./components/helmet/'+currentName);
      helmetCb = helmet.default;
      // component.setState({loading: false});
      // return;
  }

  if(!Meteor.isServer && currentName!=='index'){

    let newpage
    // let list
    // let ll

    let handler

    newpage = {}
    handler = {}


    if(toLoad.length>0){

      for (let i = 0; i < toLoad.length; i++) {
        for (let j = 0; j < ll; j++) {
           //  if(  pagePP[i]  =='root'
           //  &&   list[j]   !=='page'  ){
           //    continue;
           //  }
           if(!newpage[list[j]])newpage[list[j]]={}
           if(!handler[list[j]])handler[list[j]]={}
           handler[list[j]][toLoad[i]]= require('bundle!./components/'+list[j]+'/'+toLoad[i]);

           handler[list[j]][toLoad[i]](bundle =>{

             newpage[list[j]][toLoad[i]] = bundle.default;
             num1++;

             if(num1==square){
               let bundle = JSON.parse(localStorage.getItem('bundle')) || {}
               bundle=newpage
              //  console.log(bundle);
              // sessionStorage.setItem('bundle', JSON.stringify(new));
              // Session.set('bundle', newpage)
              let         loaded  = JSON.parse(sessionStorage.getItem('loaded'))
              if(!loaded) loaded  = []
              // loaded.push(currentName)
              // console.log(Array.from(new Set(loaded.concat(toLoad))));
              // console.log(loaded);
              loaded = Array.from(new Set(loaded.concat(toLoad)))
              // console.log(loaded);
              sessionStorage.setItem('loaded', JSON.stringify(loaded));
              // console.log(bundle);
               cb(null, {
                 navbar: WeactNavbar,
                 page  : WeactPage,
                 helmet: helmetCb
               })
              //  let req = require('./AsyncRoute.jsx');
              //  let callback = {};
              //  for (let i = 0; i < ll; i++) {
                 // if(list[i]!=='page'){
                 //   newpage[list[i]].shift();
                 // }
                //  if(list[i] =='helmet' || Meteor.isServer){
                //    callback[list[i]] = req.default(list[i]                   )
                //  }else {
                //    console.log(newpage[list[i]]);
                //    callback[list[i]] = req.default(list[i] , newpage[list[i]])
                //  }
              //  }

              //  cb( null, callback);

             }
           })
         }
      }
    }
    else{
      cb(null, {
        navbar: WeactNavbar,
        page  : WeactPage,
        helmet: helmetCb
      })
    }


  }else{
    cb(null, {
      navbar: WeactNavbar,
      page  : WeactPage,
      helmet: helmetCb
    })
  }

}

export default GetComponents
