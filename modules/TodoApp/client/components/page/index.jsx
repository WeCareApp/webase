import { Component, PropTypes } from 'react';


// export default function() {
  // return React.createClass({
  export default class pageIndex extends Component {
    static propTypes = {}
    componentWillMount() {
    }
    componentWillUnmount(){

      // alert($('[data-page="index"]>.page-content').scrollTop());
    }

    render() {
        return (
          <div data-page="index" className={this.props.class}>
            {/* Scrollable page content*/}
            {/*{React.cloneElement(this.props.children, {user: this.props.user(), auth: this.props.auth()})}*/}
            {/*{this.props.children}*/}
            {React.cloneElement(this.props.children)}
          </div>
        );
    }
  }
// }
