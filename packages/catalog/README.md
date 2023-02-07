# @learn-monorepo-yarn/catalog

## Storybook の基本セットアップ

### 関連モジュールをインストール

Storybook CLI を使ってインストールすることも可能だが、当該プロジェクトでは不要なモジュールも数多くインストールされてしまう。どのみちそれらはアンインストールするため、必要最小限なモジュールだけ[^1]を一つ一つマニュアルでインストールするのが妥当。

[^1]: npm, yarn なら hoisting が働くため、マニュアルでインストールするモジュールの数はそれほど多くはない。

```bash
yarn add -D @babel/core babel-loader @storybook/addon-{actions,docs,essentials,interactions,links} @storybook/{builder,manager}-webpack5 @storybook/react
```

### 設定ファイルを作成

#### `.storybook/main.js`

```js
module.exports = {
  stories: [
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
