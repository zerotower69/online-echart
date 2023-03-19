const CDN_MAP = {
  echarts: {
    list: [
      "https://fastly.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js",
      "https://cdn.bootcdn.net/ajax/libs/echarts/5.4.1/echarts.common.js",
    ],
    current: 0,
  },

  dataTool: {
    list: [
          "https://fastly.jsdelivr.net/npm/echarts@5.4.1/dist/extension/dataTool.min.js",
        "https://cdn.bootcdn.net/ajax/libs/echarts/5.4.1/extension/dataTool.js",
      "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/echarts/5.3.0-rc.1/extension/dataTool.js",
    ],
    current: 0,
    },
    bmap: {
        list: [
            "https://fastly.jsdelivr.net/npm/echarts@5.4.1/dist/extension/bmap.min.js",
            "https://cdn.bootcdn.net/ajax/libs/echarts/5.4.1/extension/dataTool.js",
          "https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/echarts/4.8.0/extension/bmap.min.js"
        ],
        current:0
    },
    echartsGl: {
        list: [
            "https://fastly.jsdelivr.net/npm/echarts-gl@2/dist/echarts-gl.min.js",
            "https://cdn.bootcdn.net/ajax/libs/echarts-gl/2.0.8/echarts-gl.min.js"
        ],
        current:0
    }
};

//错误选择新的CDN重载
/**
 *
 * @param {HTMLScriptElement} script
 * @param {string} type
 */
function cndReload(script, type) {
  const obj = CDN_MAP[type];
  const cur = obj.current;
  if (obj.current + 1 > obj.list.length) {
    return;
  }
  obj.current++;
  const link = obj.list[obj.current];
  script.setAttribute("src", link);
  CDN_LINKS[type] = link;
}

const CDN_LINKS = {};

//自动加载CDN
(function () {
  [...Object.keys(CDN_MAP)].forEach((key) => {
    const script = document.createElement("script");
    const link = CDN_MAP[key].list[0];
    script.setAttribute("src", link);
    script.onerror = cndReload(script, key);
    document.body.appendChild(script);
    CDN_LINKS[key] = link;
  });
})();
