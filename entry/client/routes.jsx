//import { Route } from 'react-router';

import todoRoutes from 'TodoApp/client/routes'

todoRoutes



Meteor.startup(function() {
  FlowRouter.initialize();
});

//ReactRouterSSR.Run(
//	<Route>
//		{todoRoutes}
//	</Route>
//	, {
//		rootElement: "react-app",
//		rootElementType: "span"
//	});
