# simple-blog

Cloudflare D1を使って、シンプルなブログアプリのAPIを使ってみる。作成する機能は次の通り。

- ブログアプリにはユーザーがいる
- ユーザーは記事を投稿・更新・削除できる
- ユーザーは記事にタグをつけられる
- ユーザーは記事のタグを更新できる

認証機能は簡単に作る方法が思いつかなかったので、とりあえず作らないことにします。

フロントエンドも作ってみることになったら使ってみようかなと思います。

## 試したいこと

- sqldefでマイグレーションを実行すること
- D1 Client APIでCRUD処理を実行すること

## メモ

```bash
npm create cloudflare simple-blog
cd simple-blog

wrangler d1 create blog
```
