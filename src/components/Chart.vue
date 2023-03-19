<!--
 * @Author: zerotower69 zerotower@163.com
 * @Date: 2023-03-16 22:51:57
 * @LastEditors: zerotower69 zerotower@163.com
 * @LastEditTime: 2023-03-19 21:21:13
 * @FilePath: /online/src/components/Chart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <!-- <div ref="chartRef" class="chart-zero"></div> -->
    <iframe src="/chart.html" ref="frameRef" class="chart-frame"></iframe>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { EChartsOption, ECharts } from "echarts";
import { onMounted, ref, watch } from "vue";

interface ChartProps {
    options: EChartsOption;
    autoRender: boolean;
    code: String;
    data: {
        title: string;
        codeStr: string;
    };
}
const props = defineProps<ChartProps>();

const chartRef = ref();
const frameRef = ref<HTMLIFrameElement>();

let chart: ECharts;

const docStr = ref("");
const subIsLoaded = ref(false);
onMounted(() => {
    // init()
    initWindow();
});

watch(() => props.data.codeStr, (val) => {
    if (props.autoRender) {
        setCode()
    }
})

let doc: Document | null = null;
let win: Window | null = null;
function initWindow() {
    win = frameRef.value?.contentWindow as Window;
    if (!win || !win.document) return;
    const dm = win.document;
    dm.title = props.data.title;
    win.onload = function (e) {
        subIsLoaded.value = true;
        doc = e.target as Document;
        //加载后设置代码
        setScript(e.target as Document, 'chart-code', win as Window,'light');

    }
}
//设置代码
function setScript(dm: Document, id: string, win?: Window,theme?:string) {
    if (subIsLoaded.value) {
        debugger;
        //移除原来的,记得销毁实例防止内存溢出
        const oldScript = dm.getElementById(id);
        if (oldScript?.remove) {
            if (win?.myChart?.dispose) {
                win.myChart.dispose()
            }
            oldScript.remove();
        }
        const rawCode = `
     var dom = document.getElementById("container");
      var myChart = echarts.init(dom, "${theme}", {
        renderer: "canvas",
        useDirtyRect: false,
      });
      var app = {};

      var option;

      ${props.data.codeStr}

       if (option && typeof option === "object") {
        myChart.setOption(option);
      }
      window.myChart=myChart;

      window.addEventListener("resize", myChart.resize);
    `;
        const script = dm.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('id', id);
        script.textContent = rawCode;
        dm.body.appendChild(script);
    }
}

//外部调用设置代码
function setCode(theme?: string) {
     theme = theme ? theme : 'light';
    setScript(doc as Document, 'chart-code', win as Window,theme);
}
// get chart base64 image data, then transform it to object url
function getImage() {
    try {
        const base64 = win.myChart.getDataURL();
    // const img = new Image();
    // img.src = base64;
    let parts = base64.split(';base64,')
    let contentType = parts[0].split(':')[1]
    let raw = window.atob(parts[1]) // 解码base64得到二进制字符串
    let rawLength = raw.length
    let uInt8Array = new Uint8Array(rawLength) // 创建8位无符号整数值的类型化数组
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i) // 数组接收二进制字符串
    }
    const blob = new Blob([uInt8Array], { type: contentType });
        const url = URL.createObjectURL(blob);
    return Promise.resolve(url)
    }
    catch (err) {
        return Promise.reject(err);
    }
}

defineExpose({
    setCode,
    getImage,
});
</script>

<style scoped>
.chart-zero {
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
}

.chart-frame {
    height: 100%;
    width: 100%;
    border: none;
    background: none;
}
</style>
