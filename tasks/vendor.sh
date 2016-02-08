#!/bin/bash

# Copy all the vendor resources from node_modules to web root
mkdir -p ./src/vendor/font-awesome/css
mkdir -p ./src/vendor/font-awesome/fonts
mkdir -p ./src/vendor/fonts

cp ./node_modules/angular-material/angular-material.css ./src/vendor/
cp ./node_modules/font-awesome/css/font-awesome.min.css ./src/vendor/font-awesome/css
cp ./node_modules/font-awesome/fonts/* ./src/vendor/font-awesome/fonts/
cp ./node_modules/md-color-picker/dist/mdColorPicker.min.css ./src/vendor/

wget https://github.com/google/fonts/raw/master/apache/opensans/OpenSans-Semibold.ttf -o src/vendor/fonts/OpenSans-Semibold.ttf
