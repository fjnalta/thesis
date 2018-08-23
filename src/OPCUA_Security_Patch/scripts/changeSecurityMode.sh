#!/bin/bash

MODE=$1

if [ $# -eq 0 ]; then
    echo "No Arguments. Usage ./scripts/changeSecurityMode.sh [MODE]"
    echo "Options: true/false"
else
    # Change Configuration
    if [ "$MODE" = "true" ]; then
        sed -i 's/config.secure.*/config.secure = true/g' ./dockers/control/config.js
        sed -i 's/config.secure.*/config.secure = true/g' ./dockers/scheduler/config.js
    fi

    if [ "$MODE" = "false" ]; then
        sed -i 's/config.secure.*/config.secure = false/g' ./dockers/control/config.js
        sed -i 's/config.secure.*/config.secure = false/g' ./dockers/scheduler/config.js
    fi

    echo "done"

    # Remove Docker Network so rebuild doesn't fail
    sudo ./scripts/removeNetwork.sh

    # Rebuild Dockers
    echo "rebuild container"
    sudo ./scripts/buildDockers.sh
fi