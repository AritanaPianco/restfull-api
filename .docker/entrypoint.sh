#!/bin/bash

# Aguarde o PostgreSQL estar disponível
until nc -z -v -w30 db 5432; do
  echo "Aguardando o PostgreSQL na porta 5432..."
  sleep 1
done
echo "PostgreSQL está disponível"

# Execute o comando original
exec "$@"

npm install --legacy-peer-deps
npm run typeorm -- -d src/shared/infra/typeorm/index.ts migration:run
npm run dev