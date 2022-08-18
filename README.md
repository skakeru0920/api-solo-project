# api-solo-project

This was created during my time as a student at Code Chrysalis
This was created during my time as a student at Code Chrysalis.

# make env file

cp .env.example .env.local

edit .env.local

# make database

echo "CREATE DATABASE my_motorcycle;" | psql

psql -d my_motorcycle(psql の my_motorcycle にアクセス)

# set up

npm install

npm run migrate
npm run seed
npm run dev
