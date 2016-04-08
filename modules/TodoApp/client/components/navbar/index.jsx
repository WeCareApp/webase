import { Component, PropTypes } from 'react';

export default class navbarIndex extends Component {
  static propTypes = {}
  componentWillMount() {
  }

  render() {
      return (
        // <script type="text/template" id="about">
        <div data-page="index" className={this.props.class}>
          {/* We have home navbar without left link*/}
          <div className="left sliding">Touch2S</div>
          <div className="right">
            {/* Right link contains only icon - additional "icon-only" class*/}
            {/*<a href="#" onClick={this.handleLoginDialog.bind(this)} className={"button " + (this.auth() ? "active" : "")}>{this.auth() ? "Sign Out" : "Sign In"}</a>*/}
            {/* <a href="#" className="link icon-only open-panel"><i className="icon icon-bars"/></a>*/}
          </div>
        </div>
        // </script>
      );
  }
}
