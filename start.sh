#!/bin/bash

pushd ./src/ui
npm install
npm run build
popd
pushd ./src/api
npm install
node index.js
popd