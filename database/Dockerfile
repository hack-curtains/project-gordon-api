
FROM postgres:latest

ENV POSTGRES_USER sieke
ENV POSTGRES_PASSWORD temp
ENV POSTGRES_DB recipes

# docker-entrypoint-initdb.d
COPY init/DATA.sql /docker-entrypoint-initdb.d/