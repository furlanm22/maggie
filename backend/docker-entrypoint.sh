#!/bin/bash

# Instala as dependências do projeto
pip install -r requirements.txt

# Aguarda a inicialização do serviço do banco de dados
while ! nc -z db 27017; do
  sleep 0.1
done

# Inicializa a aplicação
python app/main.py