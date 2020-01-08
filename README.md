# Node TypeScript Boilerplate

[![N|Solid](https://video.oznoz.com/media/brands/property_logo/1421940829_S1_AlienMonkeys_logo.png)](https://github.com/SAshwinAchu10)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://#)

This is a Node ts boilerplate that helps starters to quickly grab and use the template code provided.
This boilerplate code is packed up with components such below
  - Swagger 2.0
  - Serverless Deployment With Proxy (`Can be deployed in a EC2 Instance as well Lambda based Api Gateway Deployment through Serverless framework`)
  - JWT Authentication
  - A CRUD with a Mongo Model (Customizable)
  - Docker Support
  - Travis Build
  - Linting
  - Configurable Secrets

### Installation

This requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd node-ts-starter
$ npm install
$ npm start
```

For production environments...

```sh
$ npm install --production
$ npm start
```

### Docker
Node ts boilerplate is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 3000, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd node-ts-starter
docker build -t PROJECT:${package.json.version} .
```
This will create the server image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of PROJECT.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 3000 of the host to port 3000 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 3000:3080 --restart="always" PROJECT:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```

### Todos

 - Write MORE Tests

License
----

MIT


**Free Software, Hell Yeah!**
