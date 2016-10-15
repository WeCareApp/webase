import Helmet from 'react-helmet';
import { Component, PropTypes } from 'react';

// export default function() {
//   return React.createClass({
export default class helmetIndex extends Component {
  static propTypes = {}
    render() {
      return (
        <Helmet
          title="Touch2S To-Do2"
          meta={[
            { name: 'description', content: 'Touch2S Meteor F7 Boilerplate' }
          ]}
        />
      )
    }
  // })
}
