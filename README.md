# my-first-cloudflare-d1

## 目的

- [ ] Cloudflare D1を使ってみて、どういう感じの機能なのかを理解すること
- [ ] sqldefを使ってD1のマイグレーションを行うこと
- [ ] Cloudflare D1の標準のDBクライアントライブラリ(`env.DB`)を使ってCRUD処理を行うこと

## すること

- [x] Overviewを読む
- [x] Getting Startedをやってみる（デプロイするまで）
- [ ] 簡易的なブログアプリのAPIを作ってみる

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

### Use indexes

ぱっとみた感じ一般的な内容だったので省略。

### Query JSON

JSON対応のドキュメントがこの位置にあるのは、JSONを格納するユースケースがそれなりに想定されているということなのかな...？

### Data location

データベースは、データベースの作成リクエストを送ったところに近い場所に自動的に配置される。変更したい場合は、明示的に指定することもできる。

### Debug

エラーの原因を見たい場合は、D1 client APIがスローするエラーの`e.message`または`e.cause.message`を確認する。また、`wrangler tail`でエラーメッセージを確認できる。

### Local development

ローカル環境では本番環境とは別のデータベースを使用する。本番環境のデータベースを使いたい場合は、`wrangler dev`に`--remote`フラグをつける。

データベースは、`wrangler dev`をまたがって永続化される。つまり、データベースのデータはローカルの開発中は永続化されている。特定の場所にデータベースを作成したい場合は、`--persist-to=/path/to/file`オプションを使用する。

### Migrations

データベースのシンプルなマイグレーション方法がサポートされている。`migrations`ディレクトリのSQLファイルを使って、マイグレーションを行う。

現在は、空のマイグレーションファイルの作成・適用されていないマイグレーションの確認・残りのマイグレーションの適用の3つのコマンドがサポートされている。

マイグレーションファイルの置き場所は、デフォルトでは`migrations`になっている。`wrangler.toml`の`migrations_dir`でカスタマイズできる。

将来的には、マイグレーションを適用済みにマークする方法や、特定のマイグレーションを適用する方法もサポートされる予定。
