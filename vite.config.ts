/*
 * @Author: zerotower69 zerotower@163.com
 * @Date: 2023-03-16 20:37:26
 * @LastEditors: zerotower69 zerotower@163.com
 * @LastEditTime: 2023-03-19 12:15:04
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
  }
})
