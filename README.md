# Montink — Mini ERP com Laravel + React + Mantine

Este é um projeto full stack utilizando **Laravel** no backend e **React** no frontend. 
O objetivo era criar um mini ERP para controle de Pedidos, Produtos, Cupons e Estoque. 

# Funcionalidades do ERP

📦 Gerenciamento de Produtos

🧾 Controle de Pedidos

🎟️ Sistema de Cupons

🧮 Gestão de Estoque

---

## 🚀 Requisitos

Antes de iniciar, certifique-se de ter instalado:
- PHP na versão 8.2^
- Composer
- Node.js
- Npm

## 📥 Instalação

Clone o repositório do projeto: 
```bash
git clone https://github.com/Carolinaribeirodacol/montink-test
cd montink-test
```

Na pasta do projeto, rode os seguintes comandos para instalar as dependências:
```bash
composer install
npm install
```

Copie o arquivo .env:
```bash
cp .env.example e renomeie para .env
```

Preencha as variáveis de banco

Gere a chave da aplicação:
```bash
php artisan key:generate
```

Rode as migrations:
```bash
php artisan migrate
```

Rode os seeders:
```bash
php artisan db:seed
```

## Frontend (React)
Instale as dependências:
```bash
npm install
```

Inicie o servidor:
```bash
composer run dev
```

## Acesse o projeto
http://localhost:8000

## Deixando o usuário inicial como admin:
```bash
php artisan tinker
```

```php
$user = App\Models\User::find(1);
$user->is_admin = true;
$user->save();
```
