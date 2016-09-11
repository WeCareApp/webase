let StorePosition = function(){
  let index           = JSON.parse(sessionStorage.getItem('historyRouteIndex'));
  let history         = JSON.parse(sessionStorage.getItem('history'));
  let historyPosition = JSON.parse(sessionStorage.getItem('historyPosition'));
  if(!history ) return;
  if( index==  null      ||
      index==  undefined ) return;
  let currentName     = history[index].replace('#','');

  // console.log(tmp);
  // console.log('onLeave'+);
  // historyPosition[index] = $('[data-page="'+currentName+'"]>.page-content').scrollTop()
  // sessionStorage.setItem('historyPosition', JSON.stringify(historyPosition));
}
export default StorePosition
