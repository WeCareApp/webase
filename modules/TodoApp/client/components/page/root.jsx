import { Component, PropTypes } from 'react';

export default class pageRoot extends Component {
  static propTypes = {}
  componentWillMount() {
  }

  render() {
      return (
        <div data-page="root" className="page">
          {/* Scrollable page content*/}
          {/*{React.cloneElement(this.props.children, {user: this.props.user(), auth: this.props.auth()})}*/}
          {/*{this.props.children}*/}
          {/*{React.cloneElement(this.props.children)}*/}
        </div>
      );
  }
}
