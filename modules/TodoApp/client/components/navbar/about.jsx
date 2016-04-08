import { Component, PropTypes } from 'react';
import {backBtn} from './_backBtn'

export default class navbarAbout extends Component {
  static propTypes = {}
  componentWillMount() {
  }

  render() {
      return (
        // <script type="text/template" id="about">
        // <div data-page="about" className="navbar-inner {this.props.current}">
        <div data-page="about" className={this.props.class}>
          <div className="left sliding"><a href="" onClick={backBtn} className=" link"> <i className="icon icon-back"/><span>Back</span></a>
          </div>
          <div className="center sliding">About Us</div>
        </div>
        // </script>
      );
  }
}
