#!/bin/bash

echo "Changing permissions of named volumes..."
chown -R node:node .
echo "Finished changing permissions"

npm install

if [ -n "$ENV" ] && [ "$ENV" == "prod" ]; then
    npm run build
    npm start
else
    npm run dev
fi