import 'TodoApp/todo-methods';
import 'TodoApp/server/todo-subscriptions'

// Do server-rendering only in proudction mode
if (process.env.NODE_ENV === 'production') {
  // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(JSON.parse(Assets.getText('webpack.stats.json')));

  require('../client/routes');
}
