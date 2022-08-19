# About

好きなバイクやバイクメーカーの情報を登録できます！

# エンドポイント

get("/");
get("/makers");
get("/makers/view/:id");
get("/makers/edit/:id");
get("/makers/new");
post("/makers/edit/:id/save");
post("/makers/post");
get("/motorcycle");
get("/motorcycle/view/:id");
get("/motorcycle/edit/:id");
get("/motorcycle/new");
post("/motorcycle/edit/:id/save");
post("/motorcycle/post");
post("/motorcycle/delete/:id/");

# セットアップ

## make env file

cp .env.example .env.local
edit .env.local

## make database

echo "CREATE DATABASE my_motorcycle;" | psql

## run this command

npm install
npm run migrate
npm run seed
npm run dev

# Note

・データ追加時に id が重複してるエラーが出る時（seed でデータ入力したら発生する？）
run this command

SELECT setval('makers_id_seq', (SELECT MAX(id) FROM makers));
SELECT setval('motorcycle_id_seq', (SELECT MAX(id) FROM motorcycle));

・motorcycle の picture カラムには html<img>要素を入れてください

# TODO

・ TODO Navbar を常時表示
・ TODO 403?404?id が存在しないときにエラーページに飛ばす
・ TODO React 使って見た目をリッチに
・ TODO 外部キーを設定する際に 参照元のデータも変更・削除できるようにする
・ TODO delete の時も post で呼び出してるから delete method に変更する
・ TODO カテゴリでソートする

# api-solo-project

This was created during my time as a student at Code Chrysalis.
