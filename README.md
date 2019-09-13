# Core Framework Compiler

## Purpose
The purpose of this application is to create a publicly accessible tool for downloading customizable css themes from the nyc-core-framework. The Framework is just a backend API and is designed to work with the CSS Customizer tool on the Core Framework Website. When provided the necessary values to the one working url, it will compile a custom css theme based on the NYC Core Framework theme.

## Technology
The Framework Compiler is built on Node.js with the ExpressJS framework and uses the node-sass module for compiling the sass files into css.

## Getting Started
1. clone the repository to a local directory using the ```git clone``` command.
2. cd into the repository directory and run ```npm install``` and ```npm update``` to build the package.json and load the node_modules. If you do not have node or npm, which you can verify with ```node -v``` you can download and install with the instructions here: nodejs.org.
3. in order to populate the public/nyc-core-framework files, you'll need to initialize and update the submodule. Run ```git submodule init``` and ```git submodule update```.
3. run ```npm start``` to start the server.
4. you can use this api by submitting a post request to the root-address/api/v1/compile url with the following information formatted as json in the body: 'primary': "String", 'secondary': "String", 'info': "String", 'light': "String", and 'dark': "String" with valid color hex codes without the hash sign, and 'compressed' with either a true or false value.
5. for troubleshooting purposes, the inputs received from the front end will be displayed in the console.

Enjoy the app!
