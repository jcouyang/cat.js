#!/bin/bash
git clone git@github.com:jcouyang/cat.js.git -b gh-pages api
npm run doc
cd api
git add .
git commit -m "publi:ship: api doc"
git push
