# Welcome to SermonBeacon 👋

Sermon Beacon is an open source project meant for church archives at its core, but also a great way to manage and store valuable information for your church such as speakers and visiting speakers, sermon videos and sermon notes, etc.

![image](https://user-images.githubusercontent.com/31123803/68713219-98625c80-055a-11ea-8f84-7ac310084660.png)

## Prerequisites

Before you begin you need to make sure you have everything needed to get the project up and running.

* Make sure you are on the latest [node](https://nodejs.org/en/)
* We are using [yarn](https://yarnpkg.com/lang/en/) as the package manager for the frontend application.
* It will be best if you are on a MacOS machine, otherwise, there may be extra configurations needed on your end.
* Depending on your role on this project, reach out for specific permissions.
* Familiarize yourself with this README

## Getting Started

Once all prerequisites are installed, run `make init` to download other necessary tools for development on MacOS.

If the AWS CLI has never been installed on your machine before, make sure to [configure](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html#configure-awscli) it.

## Local Development

For local development, run the following make commands:

```sh
# Run this first and only once to install client dependencies.
make install

# Starting the server
$ make start # starts up hasura and applies migrations
# Open a new terminal
$ cd server
$ hasura console # if this is not opening up hasura, then please refer to the "Getting Started" section.

# Starting the client applications
$ make start-local-admin # This will start the admin app
$ make start-local-user # This will start the user app

# Run this to start clean versions of the applications
make start-clean
```

> Note: we are currently working on a better solution for starting the apps and the server. So, check back frequently in case anything has changed.

The frontend is available on [http://localhost:4200](http://localhost:4200) (admin) or [http://localhost:4300](http://localhost:4300) (user) and the backend is available on [http://localhost:9695](http://localhost:9695).

## Troubleshooting

If for some reason you are running into any issues, try running `make start-clean` to clear your container and images and restarting Local Developement process.

## Available Make Commands

Below are all the available Make targets (copied from running `make help`).

```sh
Available targets:
docker-clean                   Clean up the last containers for this project
help                           Help documentation
init                           Install required tools for local environment on macOS
install                        Install dependencies for frontend application
start-clean                    Clean the docker containers then start
start                          Start the containers
```
