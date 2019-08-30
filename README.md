# Core Framework Compiler

## Purpose
The purpose of this application is to create a publicly accessible tool for downloading customizable css themes from the nyc-core-framework.

## Getting Started
1. clone the repository to a local directory using the ```git clone``` command.
2. cd into the repository directroy and run ```npm install```.
3. in order to populate the public/nyc-core-framework files, you'll need to initialize and update the submodule. Run ```git submodule init``` and ```git submodule update```.
3. run ```set DEBUG=framework-compiler:* & npm start``` to start the server.
4. you can use this api by hitting the /compiler url with the following: 'primary', 'secondary', 'info', 'light', and 'dark' with valid color hex codes without the hash sign, and 'compressed' with either a true or false value.
5. for troubleshooting purposes, the inputs received from the front end will be displayed in the console.

Enjoy the app!
