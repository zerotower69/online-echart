<!--
 * @Author: zerotower69 zerotower@163.com
 * @Date: 2023-03-16 20:42:54
 * @LastEditors: zerotower69 zerotower@163.com
 * @LastEditTime: 2023-03-19 22:59:09
 * @FilePath: /online/src/components/Editor/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="zero-editor">
       <Codemirror v-model="code" :extensions="extensions" style="height: 100%;" @change="handleChange"></Codemirror>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Codemirror } from "vue-codemirror"
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark"

const props = defineProps({
    modelValue: {
        type: String,
        default:""
    }
})

const emits = defineEmits(['update:modelValue'])

const code = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    code.value = val;
})

function handleChange(val:any) {
    emits('update:modelValue',val)
}

const extensions=[javascript(),oneDark]

function editorInit() {
    
}
</script>

<style scoped>
.zero-editor{
  height: 100%;
}
</style>