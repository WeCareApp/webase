import Helmet from 'react-helmet';
import { Component, PropTypes } from 'react';

export default class aboutIndex extends Component {
    render() {
      return (
        <Helmet
          title="About"
          meta={[
            { name: 'about', content: 'wecare about' }
          ]}
        />
      )
    }

}
