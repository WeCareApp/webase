import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {backBtn} from './_backBtn'

export default class navbarForm extends Component {
  static propTypes = {}
  componentWillMount() {
  }

  render() {
      return (
        // <div data-page='form' className={this.props.class}>
        <div data-page={this.props.dataPage} className={this.props.class}>
          <div className="left sliding"><a href={this.props.back} onClick={()=> backBtn(this)} className=" link"> <i className="icon icon-back"/><span>Back</span></a>
          </div>
          <div className="center sliding">Form</div>
        </div>
      );
  }
}
