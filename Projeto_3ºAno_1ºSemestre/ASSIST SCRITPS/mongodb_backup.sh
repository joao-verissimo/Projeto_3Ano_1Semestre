#!/bin/bash

# Configurações do MongoDB
DB_NAME="Campus" 
MONGO_HOST="vsgate-s1.dei.isep.ipp.pt"
MONGO_PORT="++++++++"
MONGO_USER="++++++++++"
MONGO_PASSWORD="+++++++++++++++++"
MONGO_DB="$DB_NAME"
BACKUP_PATH="/srv/MongoDB/Backup" 
DATE=$(date +"%Y-%m-%d-%H%M")
BACKUP_NAME="backup_$DB_NAME_$DATE"

# Criar o diretório de backup, se não existir
mkdir -p $BACKUP_PATH

# Executa o backup
echo "Iniciando o backup do banco de dados $DB_NAME"
mongodump --host $MONGO_HOST --port $MONGO_PORT --username $MONGO_USER --password $MONGO_PASSWORD --db $MONGO_DB --out $BACKUP_PATH/$BACKUP_NAME

# Compacta
echo "Compactando o backup"
tar -czf $BACKUP_PATH/${BACKUP_NAME}.tar.gz -C $BACKUP_PATH $BACKUP_NAME

# Remove o diretório não compactado
rm -rf $BACKUP_PATH/$BACKUP_NAME

echo "Backup do banco de dados $DB_NAME concluído com sucesso."
