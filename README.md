# learn-monorepo-yarn

## Prerequisites

|  Module | Ver.                     |
| ------: | ------------------------ |
| Node.js | `./.node-version` を参照 |
|    Yarn | `./.yarnrc.yml` を参照   |

### Node.js

本リポジトリで利用可能な Node.js のバージョンは `./.node-version` ファイルにて管理しているため、開発者にはこのファイルをサポートしている Node.js バージョン管理ツールの利用を推奨します。以下は推奨するバージョン管理ツールの例です。

- [nodenv](https://github.com/nodenv/nodenv)
- [n](https://github.com/tj/n)
- [asdf](https://github.com/asdf-vm/asdf)
- [NVS](https://github.com/jasongin/nvs)
- [fnm](https://github.com/Schniz/fnm)

### Yarn

本リポジトリではパッケージマネージャーに Yarn を使用します。corepack コマンドを実行して Yarn を有効化します。

```bash
corepack enable yarn
```

## Install dependencies

```bash
yarn
```

## Develop

### Package (application) structure

アプリケーションとしてビルド・起動するパッケージは以下の通り:

- `@learn-monorepo-yarn/app`
- `@learn-monorepo-yarn/catalog`

上記以外は API や共通ライブラリの実装となっており、単独で利用することはありません。

### Run

```bash
yarn (app|catalog) start
# e.g. yarn app start
```

上記コマンドで指定のアプリケーションが起動し、web ブラウザも自動で立ち上がります。起動中はファイルの変更を検知して自動的にリビルド、リロードされます。

## Build

### Package (application) structure

アプリケーションとしてビルドするパッケージは以下の通り:

- `@learn-monorepo-yarn/app`
- `@learn-monorepo-yarn/catalog`

### Build

```bash
yarn (app|catalog) build
# e.g. yarn app build
```
