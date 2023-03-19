<!--
 * @Author: zerotower69 zerotower@163.com
 * @Date: 2023-03-16 20:37:26
 * @LastEditors: zerotower69 zerotower@163.com
 * @LastEditTime: 2023-03-19 23:05:20
 * @FilePath: /online/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import Chart from "@/components/Chart.vue";
import Editor from "@/components/Editor/index.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { Download, Camera, Share,VideoPlay } from "@element-plus/icons-vue"
import { Base64 } from "js-base64"
import useClipboard from "vue-clipboard3"
import { ElMessage } from "element-plus"

const autoUpdate = ref(false);

const chartRef = ref();
const shareRef = ref();
onMounted(() => {
  initPage();
});
const activeName = ref('code');
const scritStr = ref("");
//init code
scritStr.value =
  `option = {
};
`
const chartMode = ref('light');  //图表模式
const chartData = reactive({
  title: "",
  codeStr: ""
})

const currentTheme = ref('light');

const shareUrl = computed(() => {
  const url = window.location.origin;
  //code to base64;
  const baseCode = Base64.encode(scritStr.value);
  return url + "?code=" + baseCode;
})

watch(() => scritStr.value, (val) => {
  chartData.codeStr = val;
}, {
  immediate: true
})

// click to run code
function runCode() {
  chartRef.value.setCode(currentTheme.value)
}

//snapshot the chart
function snapshot() {
  chartRef.value.getImage().then((img: string) => {
    download(img, new Date().getTime() + '.png');
  })
    .catch((err: any) => {
      ElMessage.error('图片下载失败!')
    })
}

//give url, get file!
function download(url: string, fileName: string) {
  let aLink = document.createElement('a');
  let evt = document.createEvent('HTMLEvents');
  evt.initEvent('click', true, true);// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = url;
  // aLink.dispatchEvent(evt);
  aLink.click();
}

//download the demo ===> get html
function getDemo() {

}

//switch the chart theme
function handleSwitch(val: string) {
  currentTheme.value = val;
  chartRef.value.setCode(val);
}

//share to others, very good!
function toFriend(event: Event) {
  const { toClipboard } = useClipboard();
  toClipboard(shareUrl.value).then(() => {
    ElMessage.success('分享链接已复制');
  }).catch(() => {
    ElMessage.error('分享链接复制失败');
  })
}

//init page if code=xxx in the url,load it!
function initPage() {
  const suffix = window.location.search;
  if (!suffix) return;
  const list = suffix.substring(1).split('&');
  const map: Record<string, any> = {};
  list.forEach((item) => {
    const [key, val] = item.split('=');
    map[key] = val;
  })
  if (map['code']) {
    scritStr.value = Base64.decode(map['code']);
    ElMessage.warning('该图表由用户数据自行生成，请注意辨别!')
  }
}

</script>

<template>
  <div class="container">
    <Splitpanes class="default-theme">
      <Pane min-size="20">
        <div class="left-container">
          <el-tabs v-model="activeName" type="card" @tab-click="(val:string)=>activeName=val">
            <el-tab-pane name="code" label="代码编辑">
              <el-container class="editor-container">
                <el-header class="toolbar">
                    <el-button class="run" type="primary" @click="runCode" :icon="VideoPlay">运行</el-button>
                </el-header>
                <el-main class="coder">
                  <Editor v-model="scritStr"></Editor>
                </el-main>
              </el-container>
            </el-tab-pane>
          </el-tabs>
        </div>
      </Pane>
      <Pane min-size="20">
        <div class="right-container">
          <div>
            <el-switch v-model="chartMode" active-text="深色模式" active-value="dark" inactive-value="light"
              @change="handleSwitch"></el-switch>
          </div>
          <div class="my-chart">
            <Chart :auto-render="autoUpdate" :data="chartData" ref="chartRef" />
          </div>
          <div class="btn-list">
            <el-button :icon="Download">下载示例</el-button>
            <el-button :icon="Camera" @click="snapshot">截图</el-button>
            <el-button :icon="Share" @click="toFriend($event)" ref="shareRef">分享</el-button>
          </div>
        </div>
      </Pane>
    </Splitpanes>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body,
#app {
  width: 100vw;
  height: 100vh;
}
</style>
<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  padding: 0 10px;
  background-color: #edeef3;
}

#app {
  margin: 0;
  padding: 0 10px;
}

.left-container {
  height: 100%;
}

.right-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  background-color: #edeef3;

  .my-chart {
    flex: 1;
    padding: 10px;
    background: #fff;
  }
}

:deep(.el-tabs) {
  height: calc(100% - 45px);

  .el-tabs__content {
    height: 100%;
  }

  .el-tab-pane {
    height: 100%;
  }

  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__item{
    &.is-active{
      background-color: #fff;
    }
  }
}

.btn-list {
  height: 50px;
  padding: 10px 0;
}

.editor-container {
  height: 100%;

  .toolbar {
    padding:  5px;
    display: flex;
    flex-direction: row-reverse;
    height: 40px;
    width: 100%;
    z-index: 10;
    position: relative;
    background-color: #fff;
  }

  .coder {
    height: 100%;
    position: relative;
    padding:5px 10px;
  }
}</style>
