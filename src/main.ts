/*
 * @Author: zerotower69 zerotower@163.com
 * @Date: 2023-03-16 20:37:26
 * @LastEditors: zerotower69 zerotower@163.com
 * @LastEditTime: 2023-03-19 15:27:46
 * @FilePath: /online/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App).use(ElementPlus).mount('#app')
