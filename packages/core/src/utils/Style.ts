import { css } from '@linaria/core';
import { Color, FontFamily, Shadow } from '../constants/Style';

/**
 * スタイル定数から CSS 変数にアクセスする式を返します。
 *
 * @param key カラーネーム
 *
 * @example
 * cssVar('Primary')      // var(--primary)
 * cssVar('TexturePaper') // var(--texture-paper)
 */
export function cssVar(
  key: keyof typeof Color | keyof typeof Shadow,
): `var(--${keyof typeof Color | keyof typeof Shadow})` {
  return `var(--${key})`;
}

/**
 * Margin や Padding など余白の値を算出して返す。
 *
 * 余白は 4 の倍数として定義されている。
 * @param value
 */
export function gutter(value: number): string {
  return `${4 * value}px`;
}

/**
 * 矩形サイズを返す。
 *
 * @param value 一辺の長さ
 */
export function square(value: string | number) {
  const side = typeof value === 'number' ? `${value}px` : value;

  return `
    width: ${side};
    height: ${side};
  `;
}

export function textEllipsis() {
  return `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;
}

export function textEllipsisMultiline(line: number) {
  return `
    display: box;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: ${line};
    line-clamp: ${line};
    -webkit-box-orient: vertical;
    box-orient: vertical;
  `;
}

/**
 * @see https://github.com/hankchizljaw/modern-css-reset/blob/master/dist/reset.min.css
 */
export function applyResetStyle() {
  return css`
    :global() {
      *,
      *:before,
      *:after {
        box-sizing: border-box;
        margin: 0;
      }
      html {
        overflow-x: hidden;
        font-family: sans-serif;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        scroll-behavior: smooth;
      }
      body {
        text-rendering: optimizeSpeed;
        line-height: 1.6;
      }
      a:not([class]) {
        text-decoration-skip-ink: auto;
      }
      img,
      picture {
        display: block;
        max-width: 100%;
      }
      input,
      button,
      textarea,
      select {
        font: inherit;

        &:focus:not(:focus-visible) {
          /* キーボード操作"以外"でフォーカスされた際は outline を消す */
          outline: 0;
        }
      }
      main {
        display: block;
        overflow-x: hidden;
      }
    }
  `;
}

export function applyGlobalStyle() {
  return css`
    :global() {
      :root {
        ${Object.entries({ ...Color, ...Shadow }).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [`--${key}`]: value.light,
          }),
          {},
        )}
      }

      @media (prefers-color-scheme: dark) {
        :root {
          color-scheme: dark;

          ${Object.entries({ ...Color, ...Shadow }).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [`--${key}`]: value.dark,
            }),
            {},
          )}
        }
      }

      html {
        font-size: 100%;
        background-color: black;
      }

      body {
        margin: 0;
        color: ${cssVar('TextNeutral')};
        background-color: ${cssVar('TextureBody')};
      }

      html,
      body {
        padding: 0;
        margin: 0;
        font-family: ${FontFamily.Default};
        font-weight: 500;
        font-feature-settings: palt 1;
      }
      body,
      h1,
      h2,
      h3,
      h4,
      p,
      ul,
      ol,
      figure,
      blockquote,
      dl,
      dd {
        margin: 0;
      }
      ul,
      ol {
        padding: 0;
        list-style: none;
      }
      a {
        color: inherit;
      }
    }
  `;
}
