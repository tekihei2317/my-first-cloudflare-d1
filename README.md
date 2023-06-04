# my-first-cloudflare-d1

## 目的

- Cloudflare D1を使ってみて、どういう感じの機能なのかを理解すること
- sqldefを使ってD1のマイグレーションを行うこと
- Cloudflare D1の標準のDBクライアントライブラリ(`env.DB`)を使ってCRUD処理を行うこと

## すること

- Overviewを読む
- Getting Startedをやってみる（デプロイするまで）
- 簡易的なブログアプリのAPIを作ってみる

### 分かったこと

- Cloudflare Workersへのデプロイは`wrangler deploy`を使う。
- Wranglerを使うと、d1のデータベースに対してSQLコマンドやSQLファイルを実行できる。SQLを実行する場合は`--comand='query'`、SQLファイルを実行する場合は`--file=path/to/file`を実行する。
  - 本番データベースへの反映も、このコマンドを使って行う

## メモ

### Overview

Cloudflare D1は、SQLiteをベースにしたCloudflare初のリレーショナルデータベースサービス。WorkersやPagesなどから利用できる。

Cloudflare D1のデータベースにに変更を加えるには、Wranglerを使用する。

D1は現在オープンアルファ版なので、今後破壊的な変更が入る可能性がある。

### Getting Started

wrangler initが非推奨になっていたので、npm create cloudflareのHello worldテンプレートを選択しました。

wranglerで、データベースに対してSQLやSQLファイルを実行することができる。ローカルのデータベースは、SQLiteのファイルが使われていたような気がする。

`wrangler dev --local --persist`の--localはつけなくてもよくて、--persistはオプションになかった。おそらくドキュメントとwranglerのバージョンが違うのだと思う。

本番データベースへのマイグレーションは、このチュートリアルでは`wrangler d1 execute`コマンドにファイルを指定して行なった。wrangler.tomlに`migrations_dir`という設定があるみたいなので、これを使うと（他のマイグレーションツールと同様に）実行していないマイグレーションだけ実行できたりするのかもしれない。
