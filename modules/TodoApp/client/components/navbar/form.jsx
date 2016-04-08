import { Component, PropTypes } from 'react';
import {backBtn} from './_backBtn'

export default class navbarForm extends Component {
  static propTypes = {}
  componentWillMount() {
  }

  render() {
      return (
        <div data-page="form" className={this.props.class}>
          <div className="left sliding"><a href="" onClick={backBtn} className=" link"> <i className="icon icon-back"/><span>Back</span></a>
          </div>
          <div className="center sliding">Form</div>
        </div>
      );
  }
}
