import WeactPage      from  './components/weact/WeactPage'  ;
import WeactNavbar    from  './components/weact/WeactNavbar';

var GetComponents = function(state, cb) {


  //get currentName
  let currentName = "";
  if(state.pathname.split('/')[1]){
    currentName = state.pathname.split('/')[1];
  }else if(state.pathname=='/'){
    currentName = 'index';
  }

  if(!Meteor.isServer){
    // every history is the last page data
    let     historyIndex  = JSON.parse(sessionStorage.getItem('historyIndex'))
    let     history       = JSON.parse(sessionStorage.getItem('history'))

    // if(history && historyIndex!==null)console.log(history[historyIndex])
    // if initial - all is null
    if(!history) console.log('initial')
    // if refresh
    else if(  history[historyIndex]   ==  currentName) console.log('refresh');
    // if back
    else if(  historyIndex-1  >=  0
          &&  history[historyIndex-1] == currentName
      ) console.log('back');
    // if forward
    else if(  historyIndex+1  <   history.length
          &&  history[historyIndex+1] == currentName
      ) console.log('forward');
    // if new
    else console.log('new');

  }

  // if(JSON.parse(sessionStorage.getItem('isRefresh'))==0){
  //   // sessionStorage.setItem('isRefresh', JSON.stringify(0));
  //   // console.log(this.props.location);
  //     HistoryAction(state, currentName)
  // }
  let helmetCb;
  if(!Meteor.isServer){
    let helmetbundle = require('bundle!./components/helmet/'+currentName);
    helmetbundle(helmet =>{
      helmetCb = helmet.default;
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
    let list
    let ll
    let num1
    let handler

    newpage = {}
    handler = {}
    list    = ['helmet', 'page', 'navbar']
    ll      = list.length
    num1    = 0

    for (let j = 0; j < ll; j++) {
       //  if(  pagePP[i]  =='root'
       //  &&   list[j]   !=='page'  ){
       //    continue;
       //  }
       handler[list[j]]= require('bundle!./components/'+list[j]+'/'+currentName);

       handler[list[j]](bundle =>{
         newpage[list[j]] = bundle.default;
         num1++;

         if(num1==ll){
           let bundle = JSON.parse(localStorage.getItem('bundle')) || {}
           bundle[currentName]=newpage
          //  console.log(bundle);
          // sessionStorage.setItem('bundle', JSON.stringify(new));
          // Session.set('bundle', newpage)
           cb(null, {
             navbar: WeactNavbar,
             page  : WeactPage,
             helmet: newpage['helmet']
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
  }else{
    cb(null, {
      navbar: WeactNavbar,
      page  : WeactPage,
      helmet: helmetCb
    })
  }

}

export default GetComponents
