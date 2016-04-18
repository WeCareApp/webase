import { Component, PropTypes } from 'react';

export default class pageForm extends Component {
  static propTypes = {}
  componentWillMount() {
  }

  render() {
      return (
        <div data-page="form" className="page cached">
          <div className="page-content">
            <div className="content-block-title">Form Example</div>
            <div className="list-block">
              <ul>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-name"/></div>
                    <div className="item-inner">
                      <div className="item-title label">Name</div>
                      <div className="item-input">
                        <input type="text" placeholder="Your name"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-email"/></div>
                    <div className="item-inner">
                      <div className="item-title label">E-mail</div>
                      <div className="item-input">
                        <input type="email" placeholder="E-mail"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-url"/></div>
                    <div className="item-inner">
                      <div className="item-title label">URL</div>
                      <div className="item-input">
                        <input type="url" placeholder="URL"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-password"/></div>
                    <div className="item-inner">
                      <div className="item-title label">Password</div>
                      <div className="item-input">
                        <input type="password" placeholder="Password"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-tel"/></div>
                    <div className="item-inner">
                      <div className="item-title label">Phone</div>
                      <div className="item-input">
                        <input type="tel" placeholder="Phone"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-gender"/></div>
                    <div className="item-inner">
                      <div className="item-title label">Gender</div>
                      <div className="item-input">
                        <select>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-calendar"/></div>
                    <div className="item-inner">
                      <div className="item-title label">Birth date</div>
                      <div className="item-input">
                        <input type="date" placeholder="Birth day" defaultValue="2014-04-30"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-toggle"/></div>
                    <div className="item-inner">
                      <div className="item-title label">Switch</div>
                      <div className="item-input">
                        <label className="label-switch">
                          <input type="checkbox"/>
                          <div className="checkbox"/>
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-settings"/></div>
                    <div className="item-inner">
                      <div className="item-title label">Slider</div>
                      <div className="item-input">
                        <div className="range-slider">
                          <input type="range" min={0} max={100} defaultValue={50} step="0.1"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="align-top">
                  <div className="item-content">
                    <div className="item-media"><i className="icon icon-form-comment"/></div>
                    <div className="item-inner">
                      <div className="item-title label">Textarea</div>
                      <div className="item-input">
                        <textarea defaultValue={""}/>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="content-block">
              <div className="row">
                <div className="col-50"><a href="#" className="button button-big button-fill color-red">Cancel</a>
                </div>
                <div className="col-50">
                  <input type="submit" defaultValue="Submit"
                         className="button button-big button-fill color-green"/>
                </div>
              </div>
            </div>
            <div className="content-block-title">Checkbox group</div>
            <div className="list-block">
              <ul>
                <li>
                  <label className="label-checkbox item-content">
                    <input type="checkbox" name="ks-checkbox" defaultValue="Books" defaultChecked/>
                    <div className="item-media"><i className="icon icon-form-checkbox"/></div>
                    <div className="item-inner">
                      <div className="item-title">Books</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label className="label-checkbox item-content">
                    <input type="checkbox" name="ks-checkbox" defaultValue="Movies"/>
                    <div className="item-media"><i className="icon icon-form-checkbox"/></div>
                    <div className="item-inner">
                      <div className="item-title">Movies</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label className="label-checkbox item-content">
                    <input type="checkbox" name="ks-checkbox" defaultValue="Food"/>
                    <div className="item-media"><i className="icon icon-form-checkbox"/></div>
                    <div className="item-inner">
                      <div className="item-title">Food</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label className="label-checkbox item-content">
                    <input type="checkbox" name="ks-checkbox" defaultValue="Drinks"/>
                    <div className="item-media"><i className="icon icon-form-checkbox"/></div>
                    <div className="item-inner">
                      <div className="item-title">Drinks</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
            <div className="content-block-title">Radio buttons group</div>
            <div className="list-block">
              <ul>
                <li>
                  <label className="label-radio item-content">
                    <input type="radio" name="ks-radio" defaultValue="Books" defaultChecked/>
                    <div className="item-inner">
                      <div className="item-title">Books</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label className="label-radio item-content">
                    <input type="radio" name="ks-radio" defaultValue="Movies"/>
                    <div className="item-inner">
                      <div className="item-title">Movies</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label className="label-radio item-content">
                    <input type="radio" name="ks-radio" defaultValue="Food"/>
                    <div className="item-inner">
                      <div className="item-title">Food</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label className="label-radio item-content">
                    <input type="radio" name="ks-radio" defaultValue="Drinks"/>
                    <div className="item-inner">
                      <div className="item-title">Drinks</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
  }
}
