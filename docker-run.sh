#! /bin/bash
docker run -d -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://greenphyl:hades2000@gbjhvice075.eame.syngenta.org:2010/funphyl \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       -e HASURA_GRAPHQL_DEV_MODE=true \
       hasura/graphql-engine:v1.3.2
