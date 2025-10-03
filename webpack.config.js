import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import prettier from 'prettier'
import fg from 'fast-glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProd = process.env.NODE_ENV === 'production'

// Парсим верхние мета-комментарии:
// //- @title: ...
// //- @description: ...
function parseMetaFromPug(filePath) {
  const src = fs.readFileSync(filePath, 'utf8')
  const meta = {}
  for (const line of src.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const m = trimmed.match(/^\/\/-\s*@([\w-]+)\s*:\s*(.+)$/)
    if (m) {
      meta[m[1]] = m[2]
      continue
    }
    if (!trimmed.startsWith('//-')) break
  }
  return meta
}

function getHtmlPlugins() {
  const files = fg.sync('src/pages/**/*.pug', { dot: false })
  return files.map((file) => {
    const name = path.relative('src/pages', file).replace(/\.pug$/, '')
    const meta = parseMetaFromPug(file)
    return new HtmlWebpackPlugin({
      template: file,
      filename: `${name}.html`,
      inject: 'body',
      minify: isProd ? { collapseWhitespace: true, removeComments: true } : false,
      templateParameters: {
        page: {
          title: meta.title || 'Страница',
          description: meta.description || '',
          ...meta,
        },
        isProd,
      },
    })
  })
}

class ReplaceJpgToWebpPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('ReplaceJpgToWebpPlugin', (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation)
      hooks.beforeEmit.tap('ReplaceJpgToWebpPlugin', (data) => {
        // Меняем только .jpg/.jpeg → .webp
        data.html = data.html.replace(
          /(<img\b[^>]*\bsrc=["'])([^"']+\.jpe?g)(["'][^>]*>)/gi,
          (m, p1, src, p3) => {
            // Заменяем расширение на .webp
            const webp = src.replace(/\.jpe?g$/i, '.webp')
            return `${p1}${webp}${p3}`
          },
        )
        return data
      })
    })
  }
}

class HtmlPrettifyPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlPrettifyPlugin', (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation)
      hooks.beforeEmit.tap('HtmlPrettifyPlugin', (data) => {
        try {
          data.html = prettier.format(data.html, {
            parser: 'html',
            printWidth: 100,
            tabWidth: 2,
            useTabs: false,
            htmlWhitespaceSensitivity: 'ignore',
            bracketSameLine: false,
          })
        } catch (e) {
          compilation.warnings.push(new Error(`[HtmlPrettifyPlugin] prettify failed: ${e.message}`))
        }
        return data
      })
    })
  }
}

export default {
  entry: './src/scripts/main.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/js/[name].[contenthash:8].js',
    assetModuleFilename: 'assets/media/[name].[hash][ext][query]',
    clean: true,
  },

  devtool: isProd ? false : 'source-map',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } },
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isProd ? '[hash:base64:6]' : '[name]__[local]__[hash:base64:5]',
              },
              sourceMap: !isProd,
            },
          },
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [['autoprefixer']] }, sourceMap: !isProd },
          },
          { loader: 'sass-loader', options: { sourceMap: !isProd } },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { sourceMap: !isProd } },
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [['autoprefixer']] }, sourceMap: !isProd },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd,
              additionalData: `@use "@/styles/variables" as *; @use "@/styles/mixins" as *;`,
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: ['import'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, 'node_modules/swiper'),
          path.resolve(__dirname, 'node_modules/air-datepicker'),
        ], // без exclude!
        use: ['style-loader', 'css-loader'],
        sideEffects: true,
      },
      {
        test: /\.pug$/,
        use: [{ loader: 'pug-loader', options: { pretty: true } }],
      },
      // JPEG/JPG — не инлайнить, всегда файл
      // {
      //   test: /\.jpe?g$/i,
      //   type: 'asset/resource',
      //   generator: { filename: 'assets/images/[name][ext]' }, // без хэшей — чтобы совпадали с .webp
      // },

      // PNG/WEBP/SVG — не трогаем (svg вообще никак не оптимизируем)
      // можно инлайнить до 8kb, при желании число подстрой
      {
        test: /\.(png|webp|svg)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
      },
      {
        test: /\.(woff2?|ttf|eot|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name].[hash][ext]' },
      },
    ],
  },

  plugins: [
    ...getHtmlPlugins().map(
      (p) =>
        new HtmlWebpackPlugin({
          ...p.userOptions,
          minify: false, // отключаем минификацию, чтобы не мешала форматированию
        }),
    ),
    new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash:8].css' }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets', to: 'assets', noErrorOnMissing: true }],
    }),
    // Подмена jpg → webp только на продакшн-сборке
    // ...(isProd ? [new ReplaceJpgToWebpPlugin()] : []),
    ...(isProd ? [new HtmlPrettifyPlugin()] : []),
  ],

  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
    minimize: isProd,
    minimizer: [
      '...',
      // Минификация изображений через Sharp (совместимо с Node 22)
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.sharpMinify,
      //     options: {
      //       encodeOptions: {
      //         // Настрой под себя
      //         jpeg: { quality: 80 },
      //         png: { compressionLevel: 9, palette: true },
      //         webp: { quality: 75 },
      //         avif: { cqLevel: 33 },
      //       },
      //     },
      //   },
      //   // Доп. генерация webp-версий (опционально)
      //   generator: [
      //     {
      //       // генерим .webp для всех исходных растровых
      //       type: 'asset',
      //       implementation: ImageMinimizerPlugin.sharpGenerate,
      //       options: {
      //         encodeOptions: { webp: { quality: 75 } },
      //       },
      //       // имя файла оставим по умолчанию (расширение станет .webp), можно кастомизировать:
      //       // filename: 'assets/media/[name]-webp[ext]'
      //     },
      //   ],
      // }),
      // PNG — lossless (без потери качества)
      new ImageMinimizerPlugin({
        test: /\.png$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              png: { compressionLevel: 9, palette: true },
            },
          },
        },
      }),

      // SVG — SVGO, сохраняем viewBox
      // new ImageMinimizerPlugin({
      //   test: /\.svg$/i,
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.svgoMinify,
      //     options: {
      //       plugins: [
      //         'preset-default',
      //         { name: 'removeViewBox', active: false },
      //         { name: 'cleanupNumericValues', params: { floatPrecision: 2 } },
      //       ],
      //     },
      //   },
      // }),

      // Только для JPEG/JPG генерируем .webp (размеры не меняем)
      // new ImageMinimizerPlugin({
      //   test: /\.jpe?g$/i,
      //   generator: [
      //     {
      //       type: 'asset',
      //       implementation: ImageMinimizerPlugin.sharpGenerate,
      //       options: {
      //         encodeOptions: { webp: { quality: 75 } }, // подстрой, если нужно
      //       },
      //       // Кладём рядом с оригиналом, без хэшей — чтобы легко заменить ссылку
      //       filename: 'assets/images/[name].webp',
      //     },
      //   ],
      // }),
    ],
  },

  resolve: {
    extensions: ['.js', '.scss', '.pug'],
    alias: { '@': path.resolve(__dirname, 'src') },
  },

  devServer: {
    static: { directory: path.join(__dirname, 'build') },
    watchFiles: ['src/**/*'],
    hot: true,
    liveReload: true,
    open: ['/index.html'],
    port: Number(process.env.PORT) || 5173,
    client: { overlay: true },
  },
}
