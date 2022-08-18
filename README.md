// TODO 403?404?id が存在しないときにエラーページに飛ばす
// TODO motorcycle tableに対してCRUD
// TODO maker/view 　でメーカーのバイク一覧を表示
// create makerの欄を作る, update maker もページを作る
// REACT 使ってみたい

// TODO 外部キーを設定する際に CASCADE をつける？参照元のデータも変更・削除できるようにする

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
