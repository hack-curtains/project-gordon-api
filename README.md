# project-gordon-api

## AWS Deployment Instructions

The following instructions detail how to deploy 2 docker containers to an EC2.
The Dockerfiles in (a) root directory (b) database, contain instructions on how to create the images
The docker-compose.yml file in root contains instructions on how to run these images in 2 networked containers
and expose port 3000 for incoming requests.

1. Set up an EC2, make sure you expose port 3000, thats what we'll be exposing from our docker container.

2. Once you ssh into your EC2 you need to install docker & docker compose. <a href='https://phoenixnap.com/kb/install-docker-on-ubuntu-20-04'>this tutorial</a> outlines the instructions.

3. Once you have docker set up, you might need to log out and log back in (or even try rebooting the instance).

4. From the root directory in your EC2. Note the github repo contains a SQL file containing the initial data.

`git clone https://github.com/hack-curtains/project-gordon-api.git`

5. cd into the project directory

6. run `docker-compose up --build` -- this should start your docker containers.
