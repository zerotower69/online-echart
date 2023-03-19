/*
 * @Author: zerotower69 zerotower@163.com
 * @Date: 2023-03-16 20:37:26
 * @LastEditors: zerotower69 zerotower@163.com
 * @LastEditTime: 2023-03-19 21:35:46
 * @FilePath: /online/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueJsx({
  })],
  // esbuild: {
  //   jsxFactory:'h',
  //   jsxFragment: "Fragment",
  //   jsxInject: "import { h } from 'vue';",
  // },
  resolve: {
    extensions:['.js','.ts','.jsx','.tsx'],
    "alias": {
      "@":resolve(__dirname,'./src')
    }
  },
  server: {
    hmr:true
  },
 // 生产环境打包配置
    build: {
      target: "es2015", // 浏览器兼容性
      cssTarget: "chrome79", // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target
      chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）。
      outDir: "dist", // 指定输出路径
      assetsDir: "static", // 指定生成静态资源的存放路径（相对于 build.outDir）。
      manifest: false, // 当设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 的资源文件名和 hash 后版本的映射。可以为一些服务器框架渲染时提供正确的资源引入链接。
    },
})
