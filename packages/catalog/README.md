# @learn-monorepo-yarn/catalog

## Storybook の基本セットアップ

### 関連モジュールをインストール

Storybook CLI を使ってインストールすることも可能だが、当該プロジェクトでは不要なモジュールも数多くインストールされてしまう。どのみちそれらはアンインストールするため、必要最小限なモジュールだけを一つ一つマニュアルでインストールするのが妥当。

```bash
yarn add -D \
  @babel/core \
  babel-loader \
  @storybook/react \
  @storybook/{builder,manager}-webpack5 \
  @storybook/addon-{essentials,interactions,links}
```

アドオンは `addon-essentials` が必須なのはもちろん、 `addon-interactions`, `addon-links` も実質デファクトスタンダードなので併せてインストールします。

### 設定ファイルを作成

#### `.storybook/main.js`

```js
const { resolve } = require('path');

module.exports = {
  stories: [
    {
      directory: '../../app/src',
      titlePrefix: 'app',
    },
    {
      directory: '../../core/src',
      titlePrefix: 'core',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // 各サブパッケージ配下のコードにある path alias を Storybook に認識させる。
    config.resolve.alias = {
      ...config.resolve.alias,
      '@learn-monorepo-yarn/core': resolve(__dirname, '../../core/src'),
    };
    return config;
  },
};
```

#### `.storybook/preview.js`

```js
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

上記は Storybook CLI で自動生成されるコードと同じ。ひとまずこれで OK。

#### `tsconfig.json`

各サブパッケージ配下のコードに記述されている path alias を Storybook に認識させるために `tsconfig.json` の `compilerOptions` を設定します。
既に `.storybook/main.js` に同様の記述をしていますが、 `tsconfig.json` も必要です。

```json
{
  ...
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@learn-monorepo-yarn/core/*": ["../core/src/*"]
    }
  }
}
```

## CSS Modules ( Sass ) に対応させる

Storybook はデフォルトでは CSS Modules および Sass を認識しないため、これに対応させる必要があります。

### 関連モジュールをインストール

```bash
yarn add -D css-loader sass sass-loader style-loader
```

### `.storybook/main.js` を編集

CSS Modules と Sass 記法を読み込めるように `.storybook/main.js` を編集します。

```js
const { resolve } = require('path');

module.exports = {
  stories: [
    {
      directory: '../../app/src',
      titlePrefix: 'app',
    },
    {
      directory: '../../core/src',
      titlePrefix: 'core',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // 各サブパッケージ配下のコードにある path alias を Storybook に認識させる。
    config.resolve.alias = {
      ...config.resolve.alias,
      '@learn-monorepo-yarn/core': resolve(__dirname, '../../core/src'),
    };
    // 各サブパッケージ配下のコードにある CSS Modules (Sass) を Storybook に認識させる。
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
            },
          },
        },
        'sass-loader',
      ],
      include: resolve(__dirname, '../../'),
    });
    return config;
  },
};
```

## npm scripts を定義

```js
{
  "scripts": {
    "start": "start-storybook -p 6006",
    "build": "build-storybook"
  }
}
```

環境によっては Storybook を起動しようとすると `error:0308010C:digital envelope routines::unsupported` というエラーが発生して起動に失敗することがあります。その場合は npm scripts を以下のように修正します。

```diff
- "start": "start-storybook -p 6006",
- "build": "build-storybook"
+ "start": "NODE_OPTIONS=--openssl-legacy-provider start-storybook -p 6006",
+ "build": "NODE_OPTIONS=--openssl-legacy-provider build-storybook"
```

## 参考文献

- [Next.js+CSS Modules(scss 含む) で Storybook の環境構築をする ++ Gaji-Labo ブログ](https://www.gaji.jp/blog/2021/10/20/8350/)
- [Nodejs のバージョンを上げたら`error:0308010C:digital envelope routines::unsupported`が出てしまう - Qiita](https://qiita.com/akitkat/items/f455bbc088a408cbc3a5)

---

## Builder を webpack から Vite に置き換える

Storybook の標準ビルダーは webpack ですが、Vite の選択も可能です。webpack と比較するとピーキーなのは否めませんが、こちらに移行することでより高速な開発体験を得られます。

### 関連モジュールをインストール

```bash
yarn add -D \
  @babel/core \
  babel-loader \
  @storybook/react \
  @storybook/builder-vite \
  @storybook/addon-{essentials,interactions,links} \
  vite \
  @vitejs/plugin-react
```

React を Vite でビルドするため、 `vite` と `@vitejs/plugin-react` も併せてインストールします。

### 設定ファイルを作成

#### `.storybook/main.js`

```js
const { resolve } = require('path');

module.exports = {
  stories: [
    {
      directory: '../../app/src',
      titlePrefix: 'app',
    },
    {
      directory: '../../core/src',
      titlePrefix: 'core',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@learn-monorepo-yarn/core': resolve(__dirname, '../../core/src'),
    };
    return config;
  },
};
```

code splitting に対応するために `storyStoreV7` フラグを有効化します。これをしないと起動時に `Couldn't find any stories in your Storybook.` というエラーになって stories の読み込みに失敗してしまうため、この設定は必須です。

- 参考文献: [Webpack](https://storybook.js.org/docs/react/builders/webpack#code-splitting)

#### `.storybook/preview.js`

```js
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

上記は Storybook CLI で自動生成されるコードと同じ。ひとまずこれで OK。

#### `.storybook/preview-head.html`

```html
<script>
  window.global = window;
</script>
```

webpack のときは不要ですが Vite でビルドする際はこれが必要となります。

- 参考文献: [Interactions-addon relies on polyfilled `global` (via jest-mock) · Issue #17516 · storybookjs/storybook](https://github.com/storybookjs/storybook/issues/17516)
