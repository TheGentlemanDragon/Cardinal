#!/bin/bash

# Copy all the vendor resources from node_modules to web root
mkdir -p ./src/vendor/fonts

cp ./node_modules/angular-material/angular-material.css ./src/vendor/

wget https://github.com/google/fonts/raw/master/apache/opensans/OpenSans-Semibold.ttf -P src/vendor/fonts
