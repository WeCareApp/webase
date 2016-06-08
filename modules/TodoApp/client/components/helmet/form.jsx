import Helmet from 'react-helmet';
import { Component, PropTypes } from 'react';

export default class formIndex extends Component {
    render() {
      return (
        <Helmet
          title="Form"
          meta={[
            { name: 'form', content: 'wecare form' }
          ]}
        />
      )
    }

}
