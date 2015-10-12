# kickstart-simple by thereactivestack

Kickstart a simple project fast! Clone this project to start a simple project using Meteor, React.js and Webpack.

`git clone https://github.com/thereactivestack/kickstart-simple.git`

## The stack & features
- Include the simple todo app example
- ES6 modules
- Meteor
- React.js
- react-router with server-rendering (you can disable it by editing `server/entry.js`)
- Webpack (bundle your app / assets and send them to Meteor)
- Hot-reload with no page refresh in development mode
- Optimize your code in production mode

## How does it work?
Webpack needs one `webpack.conf.js` file for the client and one for the server. It allows you to have a better control over the build process. Every other files are not automatically included by Meteor. Everything is starting from your entry point.

The server entry point in the project is at `server/entry.js`. Everything that you want to load on your Meteor server, they have to be imported or required in some way.

The client entry point in the project is at `client/entry.js` and work the same way as on the server, except it is run on the browser or Cordova.

Go look at them, they are simple!

## Production
To run or build in production, you need to set your environment variable NODE_ENV to production.

You can use meteor run, meteor build, mup or anything working with Meteor.

## Run in production mode
`NODE_ENV=production meteor run --production`

## Build for production
`NODE_ENV=production meteor build .`

*We are going to remove this once we have a fix that detect Meteor production mode in a compiler*
