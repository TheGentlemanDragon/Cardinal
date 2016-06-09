#!/bin/bash

# Copy all the vendor resources from node_modules to web root
mkdir -p ./src/vendor/fonts

# cp ./node_modules/angular-material/angular-material.css ./src/vendor/

wget -nc https://github.com/google/fonts/raw/master/apache/opensans/OpenSans-Semibold.ttf -P src/vendor/fonts
wget -nc https://apis.google.com/js/platform.js -P src/vendor

# Material Icons
# wget -nc https://fonts.googleapis.com/icon?family=Material+Icons -O src/vendor/MaterialIcons.css
# wget -nc https://github.com/google/material-design-icons/blob/master/iconfont/MaterialIcons-Regular.woff2?raw=true -O src/vendor/fonts/MaterialIcons-Regular.woff2

# Modify Material Icons css
# REMOTE_FONT="https://fonts.gstatic.com/s/materialicons/v12/2fcrYFNaTjcS6g4U3t-Y5StnKWgpfO2iSkLzTz-AABg.ttf"
# LOCAL_FONT="'/vendor/fonts/MaterialIcons-Regular.woff2'"
# sed -i "s,${REMOTE_FONT},${LOCAL_FONT},g" src/vendor/MaterialIcons.css
# sed -i 's/truetype/woff2/g' src/vendor/MaterialIcons.css
