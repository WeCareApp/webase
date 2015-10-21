# kickstart-simple by thereactivestack

Kickstart a simple project fast!

If you would like a more sophisticated kickstart with code splitting, see the [kickstart-hugeapp project](https://github.com/thereactivestack/kickstart-hugeapp).

Clone this project to start a simple project using Meteor, React.js and Webpack.

1. `git clone https://github.com/thereactivestack/kickstart-simple.git`
1. `cd kickstart-simple`
1. `meteor`

## The stack & features
- Include the simple todo app example
- ES6 modules
- Meteor
- React.js
- react-router with server-rendering (you can disable it by editing `server/entry.js`)
- Webpack (bundle your app / assets and send them to Meteor)
- Hot-reload with no page refresh in development mode
- Optimize your code in production mode
- Give access to NPM by using packages.json

## How does it work?
Webpack needs one [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-simple/blob/master/entry/client/webpack.conf.js) file for the client and one [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-simple/blob/master/entry/server/webpack.conf.js) for the server. It allows you to have a better control over the build process. Every other files are not automatically included by Meteor. Everything is starting from your entry point. You can also have a [`webpack.conf.js`](https://github.com/thereactivestack/kickstart-simple/blob/master/entry/webpack.conf.js) that is shared between client and server for common settings.

The server entry point in the project is at [`modules/entry/server/entry.js`](https://github.com/thereactivestack/kickstart-simple/blob/master/entry/server/entry.js). Everything that you want to load on your Meteor server, they have to be imported or required in some way.

The client entry point in the project is at [`modules/entry/client/entry.js`](https://github.com/thereactivestack/kickstart-simple/blob/master/entry/server/entry.js) and work the same way as on the server, except it is run on the browser or Cordova.

You can use any package coming from NPM by adding it to [`packages.json`](https://github.com/thereactivestack/kickstart-simple/blob/master/packages.json).

Go look at them, they are simple!

# Production
You can use meteor run, meteor build, mup or anything working with Meteor.

## Run in production mode
`meteor run --production`

## Build for production
`meteor build .`

## Deploy with Meteor-up
`mup deploy`
