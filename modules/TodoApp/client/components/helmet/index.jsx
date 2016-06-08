import Helmet from 'react-helmet';
import { Component, PropTypes } from 'react';

export default class helmetIndex extends Component {
    render() {
      return (
        <Helmet
          title="Touch2S To-Do1"
          meta={[
            { name: 'description', content: 'Touch2S Meteor F7 Boilerplate' }
          ]}
        />
      )
    }

}
