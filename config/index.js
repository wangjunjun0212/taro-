import { defineConfig } from '@tarojs/cli'
const path = require('path')
import devConfig from './dev'
import prodConfig from './prod'
import vitePluginImp from 'vite-plugin-imp'
const projectName = 'charge-app'
// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName,
    date: '2024-9-19',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sass: {
      resource: [
        path.resolve(__dirname, '..', 'src/assets/styles/custom_theme.scss')
      ],
      // 默认京东 APP 10.0主题 > @import "@nutui/nutui-react-taro/dist/styles/variables.scss";
      data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html'],
    defineConstants: {
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: {
      vitePlugins: [vitePluginImp({
        libList: [
          {
            libName: '@nutui/nutui-react-taro',
            style: (name) => {
              return `@nutui/nutui-react-taro/dist/esm/${name}/style/css`
            },
            replaceOldImport: false,
            camel2DashComponentName: false,
          }
        ]
      })],
      type: 'vite'
    },
    // 控制 Taro 编译日志的输出方式。
    logger: {
      stats: false,
    },
    terser: {
      enable: true,
      config: {
        compress: {
          warnings: true,
          drop_console: true,
          drop_debugger: true,
          pure_funcs:['console.log'] // 移除console
        }
      }
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: ['nut-']
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },

    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      router: {
        mode: 'browser', // 或者是 'hash会有#号'
        basename: `${projectName}/`,
        customRoutes: {
          '/pages/index/index': '/index',
          '/pages/patient/index': '/patient',
          '/pages/login/index': '/login',
          '/pages/order/index': '/order',
          '/pages/packages/order/detail/index': '/order/detail',
        }
      },
      devServer: {
        https: true,
        port: 2024,
      },
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash:8].css',
        chunkFilename: 'css/[name].[chunkhash:8].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      enableSourceMap: false,
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
