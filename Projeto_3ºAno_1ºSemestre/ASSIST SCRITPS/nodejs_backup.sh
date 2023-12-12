#!/bin/bash

SRC_DIR="/bulletproof-nodejs-ddd"

DEST_DIR="/srv/NodejsBackup"

echo "Iniciando o backup do NodeJS"
rsync -avz --delete $SRC_DIR $DEST_DIR