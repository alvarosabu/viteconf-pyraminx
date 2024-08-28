import {
  createEventHook,
  refDebounced,
  toValue,
  tryOnScopeDispose,
  unrefElement,
  useDevicePixelRatio,
  useElementBounding,
  useElementSize,
  useFps,
  useMemory,
  usePointer,
  useRafFn,
  useWindowSize
} from "./chunk-MXSAXFKJ.js";
import {
  Fragment,
  computed,
  createElementBlock,
  createRenderer,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  normalizeClass,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  shallowRef,
  unref,
  useSlots,
  watch,
  watchEffect
} from "./chunk-L4HIV4YJ.js";
import {
  ACESFilmicToneMapping,
  ArrowHelper,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Camera,
  Clock,
  Color,
  DirectionalLightHelper,
  DoubleSide,
  Float32BufferAttribute,
  HemisphereLightHelper,
  Line,
  LineBasicMaterial,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  NoToneMapping,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLightHelper,
  REVISION,
  Raycaster,
  SRGBColorSpace,
  Scene,
  SpotLightHelper,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
  three_module_exports
} from "./chunk-XPLT6QMO.js";

// node_modules/@tresjs/core/dist/tres.js
var at = Object.defineProperty;
var lt = (e, t, r) => t in e ? at(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var ie = (e, t, r) => (lt(e, typeof t != "symbol" ? t + "" : t, r), r);
var qt = "@tresjs/core";
var Yt = "module";
var Jt = "4.0.2";
var Qt = "pnpm@9.1.4";
var Kt = "Declarative ThreeJS using Vue Components";
var Xt = "Alvaro Saburido <hola@alvarosaburido.dev> (https://github.com/alvarosabu/)";
var Zt = "MIT";
var er = [
  "vue",
  "3d",
  "threejs",
  "three",
  "threejs-vue"
];
var tr = false;
var rr = {
  ".": {
    types: "./dist/index.d.ts",
    import: "./dist/tres.js",
    require: "./dist/tres.umd.cjs"
  },
  "./components": {
    types: "./dist/src/components/index.d.ts"
  },
  "./composables": {
    types: "./dist/src/composables/index.d.ts"
  },
  "./types": {
    types: "./dist/src/types/index.d.ts"
  },
  "./utils": {
    types: "./dist/src/utils/index.d.ts"
  },
  "./*": "./*"
};
var nr = "./dist/tres.js";
var or = "./dist/tres.js";
var sr = "./dist/index.d.ts";
var ir = [
  "*.d.ts",
  "dist"
];
var ar = {
  access: "public"
};
var lr = {
  dev: "cd playground && npm run dev",
  build: "vite build",
  playground: "cd playground && npm run dev",
  test: "vitest",
  "test:ci": "vitest run",
  "test:ui": "vitest --ui --coverage.enabled=true",
  release: "release-it",
  coverage: "vitest run --coverage",
  lint: "eslint .",
  "lint:fix": "eslint . --fix",
  "docs:dev": "vitepress dev docs",
  "docs:build": "vitepress build docs",
  "docs:serve": "vitepress serve docs",
  "docs:preview": "vitepress preview docs",
  "docs:contributors": "esno scripts/update-contributors.ts",
  prepare: "node .husky/install.mjs"
};
var ur = {
  three: ">=0.133",
  vue: ">=3.4"
};
var cr = {
  "@alvarosabu/utils": "^3.2.0",
  "@vue/devtools-api": "^6.6.2",
  "@vueuse/core": "^10.10.0"
};
var fr = {
  "@release-it/conventional-changelog": "^8.0.1",
  "@stackblitz/sdk": "^1.10.0",
  "@tresjs/cientos": "3.9.0",
  "@tresjs/eslint-config": "^1.1.0",
  "@types/three": "^0.165.0",
  "@typescript-eslint/eslint-plugin": "^7.11.0",
  "@typescript-eslint/parser": "^7.11.0",
  "@vitejs/plugin-vue": "^5.0.5",
  "@vitest/coverage-c8": "^0.33.0",
  "@vitest/coverage-v8": "^1.6.0",
  "@vitest/ui": "^1.6.0",
  "@vue/test-utils": "^2.4.6",
  eslint: "^9.4.0",
  "eslint-plugin-vue": "^9.26.0",
  esno: "^4.7.0",
  gsap: "^3.12.5",
  husky: "^9.0.11",
  jsdom: "^24.1.0",
  kolorist: "^1.8.0",
  ohmyfetch: "^0.4.21",
  pathe: "^1.1.2",
  "release-it": "^17.3.0",
  "rollup-plugin-analyzer": "^4.0.0",
  "rollup-plugin-copy": "^3.5.0",
  "rollup-plugin-visualizer": "^5.12.0",
  three: "^0.165.0",
  unocss: "^0.60.4",
  unplugin: "^1.10.1",
  "unplugin-vue-components": "^0.27.0",
  vite: "^5.2.12",
  "vite-plugin-banner": "^0.7.1",
  "vite-plugin-dts": "3.9.1",
  "vite-plugin-inspect": "^0.8.4",
  "vite-plugin-require-transform": "^1.0.21",
  "vite-svg-loader": "^5.1.0",
  vitepress: "1.2.2",
  vitest: "^1.6.0",
  vue: "^3.4.27",
  "vue-demi": "^0.14.8"
};
var dr = {
  name: qt,
  type: Yt,
  version: Jt,
  packageManager: Qt,
  description: Kt,
  author: Xt,
  license: Zt,
  keywords: er,
  sideEffects: tr,
  exports: rr,
  main: nr,
  module: or,
  types: sr,
  files: ir,
  publishConfig: ar,
  scripts: lr,
  peerDependencies: ur,
  dependencies: cr,
  devDependencies: fr
};
var pr = ({ sizes: e }) => {
  const t = ref([]), r = computed(
    () => t.value[0]
  ), o = (a) => {
    const s = a instanceof Camera ? a : t.value.find((f) => f.uuid === a);
    if (!s)
      return;
    const n = t.value.filter(({ uuid: f }) => f !== s.uuid);
    t.value = [s, ...n];
  }, i = (a, s = false) => {
    t.value.some(({ uuid: n }) => n === a.uuid) || (s ? o(a) : t.value.push(a));
  }, u = (a) => {
    t.value = t.value.filter(({ uuid: s }) => s !== a.uuid);
  };
  return watchEffect(() => {
    e.aspectRatio.value && t.value.forEach((a) => {
      !a.manual && (a instanceof PerspectiveCamera || mr(a)) && (a instanceof PerspectiveCamera ? a.aspect = e.aspectRatio.value : (a.left = e.width.value * -0.5, a.right = e.width.value * 0.5, a.top = e.height.value * 0.5, a.bottom = e.height.value * -0.5), a.updateProjectionMatrix());
    });
  }), onUnmounted(() => {
    t.value = [];
  }), {
    camera: r,
    cameras: t,
    registerCamera: i,
    deregisterCamera: u,
    setCameraActive: o
  };
};
function mr(e) {
  return e.hasOwnProperty("isOrthographicCamera") && e.isOrthographicCamera;
}
var Ke = createEventHook();
var Xe = createEventHook();
var ye = createEventHook();
var V = new Clock();
var ne = 0;
var oe = 0;
var { pause: vr, resume: Be, isActive: gr } = useRafFn(
  () => {
    Ke.trigger({ delta: ne, elapsed: oe, clock: V }), Xe.trigger({ delta: ne, elapsed: oe, clock: V }), ye.trigger({ delta: ne, elapsed: oe, clock: V });
  },
  { immediate: false }
);
ye.on(() => {
  ne = V.getDelta(), oe = V.getElapsedTime();
});
var je = false;
var fn = () => (je || (je = true, Be()), {
  onBeforeLoop: Ke.on,
  onLoop: Xe.on,
  onAfterLoop: ye.on,
  pause: vr,
  resume: Be,
  isActive: gr
});
var dn = true;
var K = "[TresJS ▲ ■ ●] ";
function U() {
  function e(...o) {
    typeof o[0] == "string" ? o[0] = K + o[0] : o.unshift(K), console.error(...o);
  }
  function t(...o) {
    typeof o[0] == "string" ? o[0] = K + o[0] : o.unshift(K), console.warn(...o);
  }
  function r(o, i) {
  }
  return {
    logError: e,
    logWarning: t,
    logMessage: r
  };
}
function pn(e) {
  return typeof e == "number" ? [e, e, e] : e instanceof Vector3 ? [e.x, e.y, e.z] : e;
}
function hr(e) {
  return e instanceof Color ? e : Array.isArray(e) ? new Color(...e) : new Color(e);
}
var yr = class extends Mesh {
  constructor(...r) {
    super(...r);
    ie(this, "type", "HightlightMesh");
    ie(this, "createTime");
    this.createTime = Date.now();
  }
  onBeforeRender() {
    const o = (Date.now() - this.createTime) / 1e3, a = 1 + 0.07 * Math.sin(2.5 * o);
    this.scale.set(a, a, a);
  }
};
var Ze = (e, t) => {
  for (const r of Object.keys(t))
    t[r] instanceof Object && Object.assign(t[r], Ze(e[r], t[r]));
  return Object.assign(e || {}, t), e;
};
var br = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var wr = _r(br);
function Re(e) {
  return e && e.nodeType === 1;
}
function X(e) {
  return e.replace(/-([a-z])/g, (t, r) => r.toUpperCase());
}
var Mr = /\B([A-Z])/g;
function Pr(e) {
  return e.replace(Mr, "-$1").toLowerCase();
}
function _r(e, t) {
  const r = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let i = 0; i < o.length; i++)
    r[o[i]] = true;
  return (i) => !!r[i];
}
var Cr = (e, t) => {
  const r = /* @__PURE__ */ new Set(), o = [];
  for (const i of e) {
    const u = t(i);
    r.has(u) || (r.add(u), o.push(i));
  }
  return o;
};
var Ie = (e, t) => {
  if (!t)
    return;
  const r = Array.isArray(t) ? t : t.match(/([^[.\]])+/g);
  return r == null ? void 0 : r.reduce((o, i) => o && o[i], e);
};
var Er = (e, t, r) => {
  const o = Array.isArray(t) ? t : t.match(/([^[.\]])+/g);
  o && o.reduce((i, u, a) => (i[u] === void 0 && (i[u] = {}), a === o.length - 1 && (i[u] = r), i[u]), e);
};
function et(e, t) {
  if (Re(e) && Re(t)) {
    const i = e.attributes, u = t.attributes;
    return i.length !== u.length ? false : Array.from(i).every(({ name: a, value: s }) => t.getAttribute(a) === s);
  }
  if (e === t)
    return true;
  if (e === null || typeof e != "object" || t === null || typeof t != "object")
    return false;
  const r = Object.keys(e), o = Object.keys(t);
  if (r.length !== o.length)
    return false;
  for (const i of r)
    if (!o.includes(i) || !et(e[i], t[i]))
      return false;
  return true;
}
function kr(e, t) {
  if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length)
    return false;
  for (let r = 0; r < e.length; r++)
    if (!et(e[r], t[r]))
      return false;
  return true;
}
var Sr = Array.isArray;
function xr(e, t, r, o) {
  const i = (n) => {
    if (n.uuid === t)
      return n;
    for (const f of n.children) {
      const h2 = i(f);
      if (h2)
        return h2;
    }
  }, u = i(e);
  if (!u) {
    console.warn("Object with UUID not found in the scene.");
    return;
  }
  let a = u;
  for (let n = 0; n < r.length - 1; n++)
    if (a[r[n]] !== void 0)
      a = a[r[n]];
    else {
      console.warn(`Property path is not valid: ${r.join(".")}`);
      return;
    }
  const s = r[r.length - 1];
  a[s] !== void 0 ? a[s] = o : console.warn(`Property path is not valid: ${r.join(".")}`);
}
function Tr(e) {
  const t = new MeshBasicMaterial({
    color: 11003607,
    // Highlight color, e.g., yellow
    transparent: true,
    opacity: 0.2,
    depthTest: false,
    // So the highlight is always visible
    side: DoubleSide
    // To e
  });
  return new yr(e.geometry.clone(), t);
}
function Ar(e) {
  var r;
  let t = e.value;
  return e.value && ((r = e.value) != null && r.isMesh) && (t = e.value.position), Array.isArray(e.value) && (t = new Vector3(...t)), t;
}
function Or(e) {
  return "map" in e;
}
function He(e) {
  Or(e) && e.map && e.map.dispose(), e.dispose();
}
function be(e) {
  var r, o;
  if (e.parent && ((r = e.removeFromParent) == null || r.call(e)), delete e.__tres, [...e.children].forEach((i) => be(i)), !(e instanceof Scene)) {
    const i = e;
    e && ((o = e.dispose) == null || o.call(e)), i.geometry && (i.geometry.dispose(), delete i.geometry), Array.isArray(i.material) ? (i.material.forEach((u) => He(u)), delete i.material) : i.material && (He(i.material), delete i.material);
  }
}
var Lr = Number.parseInt(REVISION.replace("dev", ""));
var Z = {
  realistic: {
    shadows: true,
    physicallyCorrectLights: true,
    outputColorSpace: SRGBColorSpace,
    toneMapping: ACESFilmicToneMapping,
    toneMappingExposure: 3,
    shadowMap: {
      enabled: true,
      type: PCFSoftShadowMap
    }
  },
  flat: {
    toneMapping: NoToneMapping,
    toneMappingExposure: 1
  }
};
function Dr({
  canvas: e,
  options: t,
  contextParts: { sizes: r, render: o, invalidate: i, advance: u }
}) {
  const a = computed(() => ({
    alpha: toValue(t.alpha) ?? true,
    depth: toValue(t.depth),
    canvas: unrefElement(e),
    context: toValue(t.context),
    stencil: toValue(t.stencil),
    antialias: toValue(t.antialias) ?? true,
    precision: toValue(t.precision),
    powerPreference: toValue(t.powerPreference),
    premultipliedAlpha: toValue(t.premultipliedAlpha),
    preserveDrawingBuffer: toValue(t.preserveDrawingBuffer),
    logarithmicDepthBuffer: toValue(t.logarithmicDepthBuffer),
    failIfMajorPerformanceCaveat: toValue(t.failIfMajorPerformanceCaveat)
  })), s = shallowRef(new WebGLRenderer(a.value));
  function n() {
    t.renderMode === "on-demand" && i();
  }
  watch(a, () => {
    s.value.dispose(), s.value = new WebGLRenderer(a.value), n();
  }), watch([r.width, r.height], () => {
    s.value.setSize(r.width.value, r.height.value), n();
  }, {
    immediate: true
  }), watch(() => t.clearColor, n);
  const { pixelRatio: f } = useDevicePixelRatio();
  watch(f, () => {
    s.value.setPixelRatio(f.value);
  });
  const { logError: h2 } = U(), b = (() => {
    const d = new WebGLRenderer(), P = {
      shadowMap: {
        enabled: d.shadowMap.enabled,
        type: d.shadowMap.type
      },
      toneMapping: d.toneMapping,
      toneMappingExposure: d.toneMappingExposure,
      outputColorSpace: d.outputColorSpace
    };
    return d.dispose(), P;
  })(), w = toValue(t.renderMode);
  return w === "on-demand" && i(), w === "manual" && setTimeout(() => {
    u();
  }, 100), watchEffect(() => {
    const d = toValue(t.preset);
    d && (d in Z || h2(`Renderer Preset must be one of these: ${Object.keys(Z).join(", ")}`), Ze(s.value, Z[d])), w === "always" && (o.frames.value = Math.max(1, o.frames.value));
    const P = (p, M) => {
      const _ = toValue(p), c = () => {
        if (d)
          return Ie(Z[d], M);
      };
      if (_ !== void 0)
        return _;
      const g = c();
      return g !== void 0 ? g : Ie(b, M);
    }, y = (p, M) => Er(s.value, M, P(p, M));
    y(t.shadows, "shadowMap.enabled"), y(t.toneMapping ?? ACESFilmicToneMapping, "toneMapping"), y(t.shadowMapType, "shadowMap.type"), Lr < 150 && y(!t.useLegacyLights, "physicallyCorrectLights"), y(t.outputColorSpace, "outputColorSpace"), y(t.toneMappingExposure, "toneMappingExposure");
    const v = P(t.clearColor, "clearColor");
    v && s.value.setClearColor(
      v ? hr(v) : new Color(0)
      // default clear color is not easily/efficiently retrievable from three
    );
  }), onUnmounted(() => {
    s.value.dispose(), s.value.forceContextLoss();
  }), {
    renderer: s
  };
}
var ee = (e) => typeof e == "function";
var Br = (e) => !!e && e.constructor === Array;
function jr(e) {
  const t = { nodes: {}, materials: {} };
  return e && e.traverse((r) => {
    r.name && (t.nodes[r.name] = r), r.material && !t.materials[r.material.name] && (t.materials[r.material.name] = r.material);
  }), t;
}
async function mn(e, t, r, o, i) {
  const { logError: u } = U(), a = new e();
  i && i(a), r && r(a);
  const n = (Array.isArray(t) ? t : [t]).map(
    (f) => new Promise((h2, l) => {
      a.load(
        f,
        (b) => {
          b.scene && Object.assign(b, jr(b.scene)), h2(b);
        },
        o,
        (b) => l(u("[useLoader] - Failed to load resource", b))
      );
    })
  );
  return Br(t) ? await Promise.all(n) : await n[0];
}
async function vn(e, t) {
  const r = new TextureLoader(t), o = (i) => new Promise((u, a) => {
    r.load(
      i,
      (s) => u(s),
      () => null,
      () => {
        a(new Error("[useTextures] - Failed to load texture"));
      }
    );
  });
  if (Sr(e)) {
    const i = await Promise.all(e.map((u) => o(u)));
    return e.length > 1 ? i : i[0];
  } else {
    const {
      map: i,
      displacementMap: u,
      normalMap: a,
      roughnessMap: s,
      metalnessMap: n,
      aoMap: f,
      alphaMap: h2,
      matcap: l
    } = e;
    return {
      map: i ? await o(i) : null,
      displacementMap: u ? await o(u) : null,
      normalMap: a ? await o(a) : null,
      roughnessMap: s ? await o(s) : null,
      metalnessMap: n ? await o(n) : null,
      aoMap: f ? await o(f) : null,
      alphaMap: h2 ? await o(h2) : null,
      matcap: l ? await o(l) : null
    };
  }
}
var tt = (e, t) => {
  const r = computed(() => t.renderer.value.domElement), o = shallowRef([]), { x: i, y: u } = usePointer({ target: r }), a = computed(() => e.value.filter((m) => {
    var C;
    return ((C = m.__tres) == null ? void 0 : C.eventCount) > 0;
  }));
  let s = 0;
  const { width: n, height: f, top: h2, left: l } = useElementBounding(r), b = ({ x: m, y: C }) => {
    if (r.value)
      return {
        x: (m - l.value) / n.value * 2 - 1,
        y: -((C - h2.value) / f.value) * 2 + 1
      };
  }, w = ({ x: m, y: C }) => {
    if (t.camera.value)
      return t.raycaster.value.setFromCamera(new Vector2(m, C), t.camera.value), o.value = t.raycaster.value.intersectObjects(a.value, true), o.value;
  }, d = (m) => {
    const C = b({
      x: (m == null ? void 0 : m.clientX) ?? i.value,
      y: (m == null ? void 0 : m.clientY) ?? u.value
    });
    return C ? w(C) || [] : [];
  }, P = createEventHook(), y = createEventHook(), v = createEventHook(), p = createEventHook(), M = createEventHook(), _ = createEventHook(), c = createEventHook(), g = createEventHook();
  function E(m) {
    const C = {};
    for (const R in m)
      typeof R != "function" && (C[R] = m[R]);
    return C;
  }
  const k = (m, C) => {
    var Ee, ke, Se;
    const R = E(C), Q = new Vector3(C == null ? void 0 : C.clientX, C == null ? void 0 : C.clientY, 0).unproject((Ee = t.camera) == null ? void 0 : Ee.value);
    m.trigger({
      ...R,
      intersections: o.value,
      // The unprojectedPoint is wrong, math needs to be fixed
      unprojectedPoint: Q,
      ray: (ke = t.raycaster) == null ? void 0 : ke.value.ray,
      camera: (Se = t.camera) == null ? void 0 : Se.value,
      sourceEvent: C,
      delta: s,
      stopPropagating: false
    });
  };
  let B;
  const x = (m) => {
    d(m), k(v, m), B = m;
  }, T = () => {
    B && x(B);
  };
  let $, A, q;
  const Y = (m) => {
    var C;
    $ = (C = o.value[0]) == null ? void 0 : C.object, s = 0, A = new Vector2(
      (m == null ? void 0 : m.clientX) ?? i.value,
      (m == null ? void 0 : m.clientY) ?? u.value
    ), k(M, m);
  };
  let se, J = false;
  const Me = (m) => {
    var C, R, Q;
    m instanceof PointerEvent && (o.value.length === 0 && k(_, m), $ === ((C = o.value[0]) == null ? void 0 : C.object) && (q = new Vector2(
      (m == null ? void 0 : m.clientX) ?? i.value,
      (m == null ? void 0 : m.clientY) ?? u.value
    ), s = A == null ? void 0 : A.distanceTo(q), m.button === 0 ? (k(P, m), se === ((R = o.value[0]) == null ? void 0 : R.object) ? J = true : (se = (Q = o.value[0]) == null ? void 0 : Q.object, J = false)) : m.button === 2 && k(c, m)), k(p, m));
  }, Pe = (m) => {
    J && (k(y, m), se = void 0, J = false);
  }, _e = (m) => k(v, m), Ce = (m) => k(g, m);
  return r.value.addEventListener("pointerup", Me), r.value.addEventListener("pointerdown", Y), r.value.addEventListener("pointermove", x), r.value.addEventListener("pointerleave", _e), r.value.addEventListener("dblclick", Pe), r.value.addEventListener("wheel", Ce), onUnmounted(() => {
    r != null && r.value && (r.value.removeEventListener("pointerup", Me), r.value.removeEventListener("pointerdown", Y), r.value.removeEventListener("pointermove", x), r.value.removeEventListener("pointerleave", _e), r.value.removeEventListener("dblclick", Pe), r.value.removeEventListener("wheel", Ce));
  }), {
    intersects: o,
    onClick: (m) => P.on(m).off,
    onDblClick: (m) => y.on(m).off,
    onContextMenu: (m) => c.on(m).off,
    onPointerMove: (m) => v.on(m).off,
    onPointerUp: (m) => p.on(m).off,
    onPointerDown: (m) => M.on(m).off,
    onPointerMissed: (m) => _.on(m).off,
    onWheel: (m) => g.on(m).off,
    forceUpdate: T
  };
};
function gn() {
  const { logWarning: e } = U();
  function t(u, a, s) {
    let n = null;
    return u.traverse((f) => {
      f[a] === s && (n = f);
    }), n || e(`Child with ${a} '${s}' not found.`), n;
  }
  function r(u, a, s) {
    const n = [];
    return u.traverse((f) => {
      f[a].includes(s) && n.push(f);
    }), n.length || e(`Children with ${a} '${s}' not found.`), n;
  }
  function o(u, a) {
    return t(u, "name", a);
  }
  function i(u, a) {
    return r(u, "name", a);
  }
  return {
    seek: t,
    seekByName: o,
    seekAll: r,
    seekAllByName: i
  };
}
var hn = (e) => {
  const t = reactive({
    click: /* @__PURE__ */ new Map(),
    pointerMove: /* @__PURE__ */ new Map(),
    pointerEnter: /* @__PURE__ */ new Map(),
    pointerLeave: /* @__PURE__ */ new Map()
  }), r = ref(/* @__PURE__ */ new Set()), o = (l) => {
    r.value.add(l);
  }, i = (l) => {
    r.value.delete(l);
  }, u = (l) => {
    Object.values(t).forEach((b) => b.delete(l)), i(l);
  }, a = (l) => {
    const { onClick: b, onPointerMove: w, onPointerEnter: d, onPointerLeave: P } = l;
    b && t.click.set(l, b), w && t.pointerMove.set(l, w), d && t.pointerEnter.set(l, d), P && t.pointerLeave.set(l, P);
  }, s = computed(
    () => Cr(
      [
        ...Array.from(r.value),
        ...Object.values(t).map((l) => Array.from(l.keys())).flat()
      ],
      ({ uuid: l }) => l
    )
  );
  e.registerObjectAtPointerEventHandler = a, e.deregisterObjectAtPointerEventHandler = u, e.registerBlockingObjectAtPointerEventHandler = o, e.deregisterBlockingObjectAtPointerEventHandler = i;
  const { onClick: n, onPointerMove: f } = tt(s, e);
  n(({ intersects: l, event: b }) => {
    var w;
    l.length && ((w = t.click.get(l[0].object)) == null || w(l[0], b));
  });
  let h2;
  return f(({ intersects: l, event: b }) => {
    var v, p, M, _;
    const w = (v = l == null ? void 0 : l[0]) == null ? void 0 : v.object, { pointerLeave: d, pointerEnter: P, pointerMove: y } = t;
    h2 && h2 !== w && ((p = d.get(h2)) == null || p(h2, b)), w && (h2 !== w && ((M = P.get(w)) == null || M(l[0], b)), (_ = y.get(w)) == null || _(l[0], b)), h2 = w || null;
  }), {
    registerObject: a,
    deregisterObject: u,
    registerBlockingObject: o,
    deregisterBlockingObject: i
  };
};
function we(e) {
  let t = 0;
  return e.traverse((r) => {
    if (r.isMesh && r.geometry) {
      const o = r.geometry, i = o.attributes.position.count * 3 * Float32Array.BYTES_PER_ELEMENT, u = o.index ? o.index.count * Uint32Array.BYTES_PER_ELEMENT : 0, a = o.attributes.normal ? o.attributes.normal.count * 3 * Float32Array.BYTES_PER_ELEMENT : 0, s = o.attributes.uv ? o.attributes.uv.count * 2 * Float32Array.BYTES_PER_ELEMENT : 0, n = i + u + a + s;
      t += n;
    }
  }), t;
}
function Rr(e) {
  return (e / 1024).toFixed(2);
}
var pe = ref({});
var me = (e) => Object.assign(pe.value, e);
function Ir(e, t, r = 10) {
  const o = toValue(e) ? useWindowSize() : useElementSize(computed(() => toValue(t).parentElement)), i = readonly(refDebounced(o.width, r)), u = readonly(refDebounced(o.height, r)), a = computed(() => i.value / u.value);
  return {
    height: u,
    width: i,
    aspectRatio: a
  };
}
function ue() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let r = 0, o = false;
  const i = () => {
    const f = Array.from(e.entries()).sort((h2, l) => {
      const b = h2[1].priority - l[1].priority;
      return b === 0 ? h2[1].addI - l[1].addI : b;
    });
    t.clear(), f.forEach((h2) => t.add(h2[0]));
  }, u = (f) => {
    e.delete(f), t.delete(f);
  };
  return { on: (f, h2 = 0) => {
    e.set(f, { priority: h2, addI: r++ });
    const l = () => u(f);
    return tryOnScopeDispose(l), o = true, {
      off: l
    };
  }, off: u, trigger: (...f) => {
    o && (i(), o = false), t.forEach((h2) => h2(...f));
  }, dispose: () => {
    e.clear(), t.clear();
  }, get count() {
    return e.size;
  } };
}
function Hr() {
  const e = new Clock(false), t = ref(false), r = ref(false);
  let o;
  const i = MathUtils.generateUUID();
  let u = null;
  const a = ue(), s = ue(), n = ue();
  let f = {};
  function h2(M) {
    f = M;
  }
  function l(M, _, c = 0) {
    switch (_) {
      case "before":
        return a.on(M, c);
      case "render":
        return u || (u = M), s.dispose(), s.on(M);
      case "after":
        return n.on(M, c);
    }
  }
  function b() {
    t.value || (e.start(), t.value = true, p());
  }
  function w() {
    t.value && (e.stop(), cancelAnimationFrame(o), t.value = false);
  }
  function d() {
    e.stop(), t.value = false;
  }
  function P() {
    e.start(), t.value = true;
  }
  function y() {
    r.value = true;
  }
  function v() {
    r.value = false;
  }
  function p() {
    const M = e.getDelta(), _ = e.getElapsedTime(), c = {
      camera: unref(f.camera),
      scene: unref(f.scene),
      renderer: unref(f.renderer),
      raycaster: unref(f.raycaster),
      controls: unref(f.controls),
      invalidate: f.invalidate,
      advance: f.advance
    }, g = { delta: M, elapsed: _, clock: e, ...c };
    t.value && a.trigger(g), r.value || (s.count ? s.trigger(g) : u && u(g)), t.value && n.trigger(g), o = requestAnimationFrame(p);
  }
  return {
    loopId: i,
    register: (M, _, c) => l(M, _, c),
    start: b,
    stop: w,
    pause: d,
    resume: P,
    pauseRender: y,
    resumeRender: v,
    isRenderPaused: r,
    isActive: t,
    setContext: h2
  };
}
function Ur({
  scene: e,
  canvas: t,
  windowSize: r,
  disableRender: o,
  rendererOptions: i,
  emit: u
}) {
  const { logWarning: a } = U(), s = shallowRef(e), n = Ir(r, t), {
    camera: f,
    cameras: h2,
    registerCamera: l,
    deregisterCamera: b,
    setCameraActive: w
  } = pr({ sizes: n, scene: e }), d = {
    mode: ref(i.renderMode || "always"),
    priority: ref(0),
    frames: ref(0),
    maxFrames: 60,
    canBeInvalidated: computed(() => d.mode.value === "on-demand" && d.frames.value === 0)
  };
  function P(A = 1) {
    i.renderMode === "on-demand" ? d.frames.value = Math.min(d.maxFrames, d.frames.value + A) : a("`invalidate` can only be used when `renderMode` is set to `on-demand`");
  }
  function y() {
    i.renderMode === "manual" ? d.frames.value = 1 : a("`advance` can only be used when `renderMode` is set to `manual`");
  }
  const { renderer: v } = Dr(
    {
      scene: e,
      canvas: t,
      options: i,
      emit: u,
      // TODO: replace contextParts with full ctx at https://github.com/Tresjs/tres/issues/516
      contextParts: { sizes: n, camera: f, render: d, invalidate: P, advance: y },
      disableRender: o
    }
  ), p = {
    sizes: n,
    scene: s,
    camera: f,
    cameras: readonly(h2),
    renderer: v,
    raycaster: shallowRef(new Raycaster()),
    controls: ref(null),
    perf: {
      maxFrames: 160,
      fps: {
        value: 0,
        accumulator: []
      },
      memory: {
        currentMem: 0,
        allocatedMem: 0,
        accumulator: []
      }
    },
    render: d,
    advance: y,
    extend: me,
    invalidate: P,
    registerCamera: l,
    setCameraActive: w,
    deregisterCamera: b,
    loop: Hr()
  };
  provide("useTres", p), p.scene.value.__tres = {
    root: p
  }, p.loop.register(() => {
    f.value && d.frames.value > 0 && (v.value.render(e, f.value), u("render", p.renderer.value)), d.priority.value = 0, d.mode.value === "always" ? d.frames.value = 1 : d.frames.value = Math.max(0, d.frames.value - 1);
  }, "render"), p.loop.start(), onUnmounted(() => {
    p.loop.stop();
  });
  const M = 100, _ = useFps({ every: M }), { isSupported: c, memory: g } = useMemory({ interval: M }), E = 160;
  let k = performance.now();
  const B = ({ timestamp: A }) => {
    p.scene.value && (p.perf.memory.allocatedMem = we(p.scene.value)), A - k >= M && (k = A, p.perf.fps.accumulator.push(_.value), p.perf.fps.accumulator.length > E && p.perf.fps.accumulator.shift(), p.perf.fps.value = _.value, c.value && g.value && (p.perf.memory.accumulator.push(g.value.usedJSHeapSize / 1024 / 1024), p.perf.memory.accumulator.length > E && p.perf.memory.accumulator.shift(), p.perf.memory.currentMem = p.perf.memory.accumulator.reduce((q, Y) => q + Y, 0) / p.perf.memory.accumulator.length));
  };
  let x = 0;
  const T = 1, { pause: $ } = useRafFn(({ delta: A }) => {
    window.__TRES__DEVTOOLS__ && (B({ timestamp: performance.now() }), x += A, x >= T && (window.__TRES__DEVTOOLS__.cb(p), x = 0));
  }, { immediate: true });
  return onUnmounted(() => {
    $();
  }), p;
}
function rt() {
  const e = inject("useTres");
  if (!e)
    throw new Error("useTresContext must be used together with useTresContextProvider");
  return e;
}
var yn = rt;
function bn() {
  const {
    camera: e,
    scene: t,
    renderer: r,
    loop: o,
    raycaster: i,
    controls: u,
    invalidate: a,
    advance: s
  } = rt();
  o.setContext({
    camera: e,
    scene: t,
    renderer: r,
    raycaster: i,
    controls: u,
    invalidate: a,
    advance: s
  });
  function n(l, b = 0) {
    return o.register(l, "before", b);
  }
  function f(l) {
    return o.register(l, "render");
  }
  function h2(l, b = 0) {
    return o.register(l, "after", b);
  }
  return {
    pause: o.pause,
    resume: o.resume,
    pauseRender: o.pauseRender,
    resumeRender: o.resumeRender,
    isActive: o.isActive,
    onBeforeRender: n,
    render: f,
    onAfterRender: h2
  };
}
function $r(e, t, r) {
  const o = shallowRef(), i = shallowRef();
  e && (o.value = e), t && (i.value = t);
  const u = computed(
    () => o.value ? o.value.children : []
  );
  function a(c, g) {
    if (Array.isArray(c))
      for (const E of c)
        E(g);
    typeof c == "function" && c(g);
  }
  function s(c, g) {
    const E = [], k = () => g.stopPropagating = true;
    g.stopPropagation = k;
    for (const B of g == null ? void 0 : g.intersections) {
      if (g.stopPropagating)
        return;
      g = { ...g, ...B };
      const { object: x } = B;
      g.eventObject = x, a(x[c], g), E.push(x);
      let T = x.parent;
      for (; T !== null && !g.stopPropagating && !E.includes(T); )
        g.eventObject = T, a(T[c], g), E.push(T), T = T.parent;
      const $ = Pr(c.slice(2));
      r($, { intersection: B, event: g });
    }
  }
  const {
    onClick: n,
    onDblClick: f,
    onContextMenu: h2,
    onPointerMove: l,
    onPointerDown: b,
    onPointerUp: w,
    onPointerMissed: d,
    onWheel: P,
    forceUpdate: y
  } = tt(u, t);
  w((c) => s("onPointerUp", c)), b((c) => s("onPointerDown", c)), n((c) => s("onClick", c)), f((c) => s("onDoubleClick", c)), h2((c) => s("onContextMenu", c)), P((c) => s("onWheel", c));
  let v = [];
  l((c) => {
    const g = c.intersections.map(({ object: k }) => k), E = c.intersections;
    v.forEach(({ object: k }) => {
      g.includes(k) || (c.intersections = v, s("onPointerLeave", c), s("onPointerOut", c));
    }), c.intersections = E, c.intersections.forEach(({ object: k }) => {
      v.includes(k) || (s("onPointerEnter", c), s("onPointerOver", c));
    }), s("onPointerMove", c), v = c.intersections;
  });
  const p = [];
  d((c) => {
    const g = () => c.stopPropagating = true;
    c.stopPropagation = g, p.forEach((E) => {
      c.stopPropagating || (c.eventObject = E, a(E.onPointerMissed, c));
    }), r("pointer-missed", { event: c });
  });
  function M(c) {
    p.push(c);
  }
  function _(c) {
    const g = p.indexOf(c);
    g > -1 && p.splice(g, 1);
  }
  return t.eventManager = {
    forceUpdate: y,
    registerPointerMissedObject: M,
    deregisterPointerMissedObject: _
  }, { forceUpdate: y, registerPointerMissedObject: M, deregisterPointerMissedObject: _ };
}
var { logError: Ue } = U();
var $e = [
  "onClick",
  "onContextMenu",
  "onPointerMove",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut",
  "onDoubleClick",
  "onPointerDown",
  "onPointerUp",
  "onPointerCancel",
  "onPointerMissed",
  "onLostPointerCapture",
  "onWheel"
];
function Fe(e) {
  var r;
  const t = (r = e == null ? void 0 : e.__tres) == null ? void 0 : r.root;
  t && t.render && t.render.canBeInvalidated.value && t.invalidate();
}
var Fr = () => {
  let e = null;
  function t(n, f, h2, l) {
    if (l || (l = {}), l.args || (l.args = []), n === "template" || wr(n))
      return null;
    let b = n.replace("Tres", ""), w;
    if (n === "primitive") {
      (l == null ? void 0 : l.object) === void 0 && Ue("Tres primitives need a prop 'object'");
      const d = l.object;
      b = d.type, w = Object.assign(d.clone(), { type: b });
    } else {
      const d = pe.value[b];
      d || Ue(
        `${b} is not defined on the THREE namespace. Use extend to add it to the catalog.`
      ), w = new d(...l.args);
    }
    return w ? (w.isCamera && (l != null && l.position || w.position.set(3, 3, 3), l != null && l.lookAt || w.lookAt(0, 0, 0)), (l == null ? void 0 : l.attach) === void 0 && (w.isMaterial ? w.attach = "material" : w.isBufferGeometry && (w.attach = "geometry")), w.__tres = {
      ...w.__tres,
      type: b,
      memoizedProps: l,
      eventCount: 0,
      disposable: true,
      primitive: n === "primitive"
    }, w.isObject3D && w.__tres && (l != null && l.material || l != null && l.geometry) && (w.__tres.disposable = false), w) : null;
  }
  function r(n, f) {
    var l, b, w, d, P;
    if (!n)
      return;
    f && f.isScene && (e = f), e && n.__tres && (n.__tres.root = e.__tres.root);
    const h2 = f || e;
    if (n != null && n.isObject3D) {
      const { registerCamera: y } = (l = n == null ? void 0 : n.__tres) == null ? void 0 : l.root;
      n != null && n.isCamera && y(n), n.onPointerMissed && ((b = n == null ? void 0 : n.__tres) != null && b.root) && ((P = (d = (w = n == null ? void 0 : n.__tres) == null ? void 0 : w.root) == null ? void 0 : d.eventManager) == null || P.registerPointerMissedObject(n));
    }
    n != null && n.isObject3D && (h2 != null && h2.isObject3D) ? (h2.add(n), n.dispatchEvent({ type: "added" })) : n != null && n.isFog ? h2.fog = n : typeof (n == null ? void 0 : n.attach) == "string" && (n.__previousAttach = n[h2 == null ? void 0 : h2.attach], h2 && (h2[n.attach] = n));
  }
  function o(n) {
    var h2, l, b, w;
    if (!n)
      return;
    const f = n.__tres;
    if (n.parent = n.parent || e, n.isObject3D) {
      const d = (y) => {
        var p, M;
        const v = (M = (p = n == null ? void 0 : n.__tres) == null ? void 0 : p.root) == null ? void 0 : M.deregisterCamera;
        y.isCamera && (v == null || v(y));
      };
      (h2 = n.removeFromParent) == null || h2.call(n), n.traverse((y) => {
        var v, p;
        d(y), y.onPointerMissed && ((p = (v = f == null ? void 0 : f.root) == null ? void 0 : v.eventManager) == null || p.deregisterPointerMissedObject(y));
      }), d(n), Fe(n), !((l = n.__tres) == null ? void 0 : l.primitive) && ((b = n.__tres) != null && b.disposable) && be(n), (w = n.dispose) == null || w.call(n);
    }
  }
  function i(n, f, h2, l) {
    var b, w;
    if (n) {
      let d = n, P = f;
      if ((b = n == null ? void 0 : n.__tres) != null && b.primitive && P === "object" && h2 !== null) {
        const M = t("primitive", void 0, void 0, {
          object: l
        });
        for (const _ in M) {
          if (_ === "uuid")
            continue;
          const c = n[_], g = M[_];
          !(c != null && c.set) && !ee(c) ? n[_] = g : c.constructor === g.constructor && (c != null && c.copy) ? c == null || c.copy(g) : Array.isArray(g) ? c.set(...g) : !c.isColor && c.setScalar ? c.setScalar(g) : c.set(g);
        }
        M != null && M.__tres && (M.__tres.root = e == null ? void 0 : e.__tres.root), M != null && M.isGroup ? (n.geometry = void 0, n.material = void 0) : delete n.isGroup;
      }
      if (n != null && n.isObject3D && P === "blocks-pointer-events") {
        l || l === "" ? n[P] = l : delete n[P];
        return;
      }
      $e.includes(f) && (n.__tres.eventCount += 1);
      let y = X(P), v = d == null ? void 0 : d[y];
      if (P === "args") {
        const M = n, _ = h2 ?? [], c = l ?? [], g = ((w = n == null ? void 0 : n.__tres) == null ? void 0 : w.type) || n.type;
        g && _.length && !kr(_, c) && (d = Object.assign(
          M,
          new pe.value[g](...l)
        ));
        return;
      }
      if (d.type === "BufferGeometry") {
        if (P === "args")
          return;
        d.setAttribute(
          X(P),
          new BufferAttribute(...l)
        );
        return;
      }
      if (P.includes("-") && v === void 0) {
        const M = P.split("-");
        v = M.reduce((_, c) => _[X(c)], d), P = M.pop(), y = P, v != null && v.set || (d = M.reduce((_, c) => _[X(c)], d));
      }
      let p = l;
      if (p === "" && (p = true), ee(v)) {
        $e.includes(f) || (Array.isArray(p) ? n[y](...p) : n[y](p)), y.startsWith("on") && ee(p) && (d[y] = p);
        return;
      }
      !(v != null && v.set) && !ee(v) ? d[y] = p : v.constructor === p.constructor && (v != null && v.copy) ? v == null || v.copy(p) : Array.isArray(p) ? v.set(...p) : !v.isColor && v.setScalar ? v.setScalar(p) : v.set(p), Fe(n);
    }
  }
  function u(n) {
    return (n == null ? void 0 : n.parent) || null;
  }
  function a(n) {
    const f = new Object3D();
    return f.name = n, f.__tres = { type: "Comment" }, f.__tres.root = e == null ? void 0 : e.__tres.root, f;
  }
  function s(n) {
    if (!n)
      return null;
    const f = n.parent || e, h2 = f.children.indexOf(n);
    return f.children[h2 + 1] || null;
  }
  return {
    insert: r,
    remove: o,
    createElement: t,
    patchProp: i,
    parentNode: u,
    createText: () => void 0,
    createComment: a,
    setText: () => void 0,
    setElementText: () => void 0,
    nextSibling: s,
    querySelector: () => void 0,
    setScopeId: () => void 0,
    cloneNode: () => void 0,
    insertStaticContent: () => void 0
  };
};
function Wr() {
  return nt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function nt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
var Nr = typeof Proxy == "function";
var zr = "devtools-plugin:setup";
var Gr = "plugin:settings:set";
var F;
var ve;
function Vr() {
  var e;
  return F !== void 0 || (typeof window < "u" && window.performance ? (F = true, ve = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (F = true, ve = globalThis.perf_hooks.performance) : F = false), F;
}
function qr() {
  return Vr() ? ve.now() : Date.now();
}
var Yr = class {
  constructor(t, r) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = r;
    const o = {};
    if (t.settings)
      for (const a in t.settings) {
        const s = t.settings[a];
        o[a] = s.defaultValue;
      }
    const i = `__vue-devtools-plugin-settings__${t.id}`;
    let u = Object.assign({}, o);
    try {
      const a = localStorage.getItem(i), s = JSON.parse(a);
      Object.assign(u, s);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return u;
      },
      setSettings(a) {
        try {
          localStorage.setItem(i, JSON.stringify(a));
        } catch {
        }
        u = a;
      },
      now() {
        return qr();
      }
    }, r && r.on(Gr, (a, s) => {
      a === this.plugin.id && this.fallbacks.setSettings(s);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, s) => this.target ? this.target.on[s] : (...n) => {
        this.onQueue.push({
          method: s,
          args: n
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, s) => this.target ? this.target[s] : s === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(s) ? (...n) => (this.targetQueue.push({
        method: s,
        args: n,
        resolve: () => {
        }
      }), this.fallbacks[s](...n)) : (...n) => new Promise((f) => {
        this.targetQueue.push({
          method: s,
          args: n,
          resolve: f
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const r of this.onQueue)
      this.target.on[r.method](...r.args);
    for (const r of this.targetQueue)
      r.resolve(await this.target[r.method](...r.args));
  }
};
function Jr(e, t) {
  const r = e, o = nt(), i = Wr(), u = Nr && r.enableEarlyProxy;
  if (i && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !u))
    i.emit(zr, e, t);
  else {
    const a = u ? new Yr(r, i) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: r,
      setupFn: t,
      proxy: a
    }), a && t(a.proxiedTarget);
  }
}
function Qr(e, t) {
  const r = `▲ ■ ●${e}`;
  typeof We == "function" ? We(r, t) : console.log(r);
}
function We(e, t) {
  throw new Error(e + t);
}
var ot = (e) => {
  const t = {
    id: e.uuid,
    label: e.type,
    children: [],
    tags: []
  };
  e.name !== "" && t.tags.push({
    label: e.name,
    textColor: 5750629,
    backgroundColor: 15793395
  });
  const r = we(e);
  return r > 0 && t.tags.push({
    label: `${Rr(r)} KB`,
    textColor: 15707189,
    backgroundColor: 16775644,
    tooltip: "Memory usage"
  }), e.type.includes("Light") && (t.tags.push({
    label: `${e.intensity}`,
    textColor: 9738662,
    backgroundColor: 16316922,
    tooltip: "Intensity"
  }), t.tags.push({
    label: `#${e.color.getHexString()}`,
    textColor: 9738662,
    backgroundColor: 16316922,
    tooltip: "Color"
  })), e.type.includes("Camera") && (t.tags.push({
    label: `${e.fov}°`,
    textColor: 9738662,
    backgroundColor: 16316922,
    tooltip: "Field of view"
  }), t.tags.push({
    label: `x: ${Math.round(e.position.x)} y: ${Math.round(e.position.y)} z: ${Math.round(e.position.z)}`,
    textColor: 9738662,
    backgroundColor: 16316922,
    tooltip: "Position"
  })), t;
};
function st(e, t, r = "") {
  e.children.forEach((o) => {
    if (o.type === "HightlightMesh" || r && !o.type.includes(r) && !o.name.includes(r))
      return;
    const i = ot(o);
    t.children.push(i), st(o, i, r);
  });
}
var Kr = [];
var z = "tres:inspector";
var Xr = reactive({
  sceneGraph: null
});
function Zr(e, t) {
  Jr(
    {
      id: "dev.esm.tres",
      label: "TresJS 🪐",
      logo: "https://raw.githubusercontent.com/Tresjs/tres/main/public/favicon.svg",
      packageName: "tresjs",
      homepage: "https://tresjs.org",
      componentStateTypes: Kr,
      app: e
    },
    (r) => {
      typeof r.now != "function" && Qr(
        "You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."
      ), r.addInspector({
        id: z,
        label: "TresJS 🪐",
        icon: "account_tree",
        treeFilterPlaceholder: "Search instances"
      }), setInterval(() => {
        r.sendInspectorTree(z);
      }, 1e3), setInterval(() => {
        r.notifyComponentUpdate();
      }, 5e3), r.on.getInspectorTree((u) => {
        if (u.inspectorId === z) {
          const a = ot(t.scene.value);
          st(t.scene.value, a, u.filter), Xr.sceneGraph = a, u.rootNodes = [a];
        }
      });
      let o = null, i = null;
      r.on.getInspectorState((u) => {
        var a;
        if (u.inspectorId === z) {
          const [s] = t.scene.value.getObjectsByProperty("uuid", u.nodeId);
          if (!s)
            return;
          if (i && o && o.parent && i.remove(o), s.isMesh) {
            const n = Tr(s);
            s.add(n), o = n, i = s;
          }
          u.state = {
            object: [
              {
                key: "uuid",
                editable: true,
                value: s.uuid
              },
              {
                key: "name",
                editable: true,
                value: s.name
              },
              {
                key: "type",
                editable: true,
                value: s.type
              },
              {
                key: "position",
                editable: true,
                value: s.position
              },
              {
                key: "rotation",
                editable: true,
                value: s.rotation
              },
              {
                key: "scale",
                editable: true,
                value: s.scale
              },
              {
                key: "geometry",
                value: s.geometry
              },
              {
                key: "material",
                value: s.material
              },
              {
                key: "color",
                editable: true,
                value: s.color
              },
              {
                key: "intensity",
                editable: true,
                value: s.intensity
              },
              {
                key: "castShadow",
                editable: true,
                value: s.castShadow
              },
              {
                key: "receiveShadow",
                editable: true,
                value: s.receiveShadow
              },
              {
                key: "frustumCulled",
                editable: true,
                value: s.frustumCulled
              },
              {
                key: "matrixAutoUpdate",
                editable: true,
                value: s.matrixAutoUpdate
              },
              {
                key: "matrixWorldNeedsUpdate",
                editable: true,
                value: s.matrixWorldNeedsUpdate
              },
              {
                key: "matrixWorld",
                value: s.matrixWorld
              },
              {
                key: "visible",
                editable: true,
                value: s.visible
              }
            ]
          }, s.isScene && (u.state.info = {
            memory: we(s),
            objects: s.children.length,
            calls: t.renderer.value.info.render.calls,
            triangles: t.renderer.value.info.render.triangles,
            points: t.renderer.value.info.render.points,
            lines: t.renderer.value.info.render.lines
          }, u.state.programs = ((a = t.renderer.value.info.programs) == null ? void 0 : a.map((n) => ({
            key: n.name,
            value: {
              ...n,
              vertexShader: n.vertexShader,
              attributes: n.getAttributes(),
              uniforms: n.getUniforms()
            }
          }))) || []);
        }
      }), r.on.editInspectorState((u) => {
        u.inspectorId === z && xr(t.scene.value, u.nodeId, u.path, u.state.value);
      });
    }
  );
}
var en = ["data-scene", "data-tres"];
var tn = defineComponent({
  __name: "TresCanvas",
  props: {
    shadows: { type: Boolean, default: void 0 },
    clearColor: {},
    toneMapping: {},
    shadowMapType: {},
    useLegacyLights: { type: Boolean, default: void 0 },
    outputColorSpace: {},
    toneMappingExposure: {},
    renderMode: { default: "always" },
    camera: {},
    preset: {},
    windowSize: { type: Boolean, default: void 0 },
    disableRender: { type: Boolean, default: void 0 },
    context: {},
    precision: {},
    alpha: { type: Boolean, default: void 0 },
    premultipliedAlpha: { type: Boolean },
    antialias: { type: Boolean, default: void 0 },
    stencil: { type: Boolean, default: void 0 },
    preserveDrawingBuffer: { type: Boolean, default: void 0 },
    powerPreference: {},
    depth: { type: Boolean, default: void 0 },
    logarithmicDepthBuffer: { type: Boolean, default: void 0 },
    failIfMajorPerformanceCaveat: { type: Boolean, default: void 0 }
  },
  emits: [
    "render",
    "click",
    "double-click",
    "context-menu",
    "pointer-move",
    "pointer-up",
    "pointer-down",
    "pointer-enter",
    "pointer-leave",
    "pointer-over",
    "pointer-out",
    "pointer-missed",
    "wheel"
  ],
  setup(e, { expose: t, emit: r }) {
    var P;
    const o = e, i = r, u = useSlots(), { logWarning: a } = U(), s = ref(), n = shallowRef(new Scene()), f = (P = getCurrentInstance()) == null ? void 0 : P.appContext.app;
    me(three_module_exports);
    const h2 = (y) => defineComponent({
      setup() {
        var p;
        const v = (p = getCurrentInstance()) == null ? void 0 : p.appContext;
        return v && (v.app = f), provide("useTres", y), provide("extend", me), typeof window < "u" && Zr(v == null ? void 0 : v.app, y), () => h(Fragment, null, u != null && u.default ? u.default() : []);
      }
    }), l = (y) => {
      const v = h2(y), { render: p } = createRenderer(Fr());
      p(h(v), n.value);
    }, b = (y, v = false) => {
      be(y.scene.value), v && (y.renderer.value.dispose(), y.renderer.value.renderLists.dispose(), y.renderer.value.forceContextLoss()), n.value.__tres = {
        root: y
      }, l(y);
    }, w = computed(() => o.disableRender), d = shallowRef(null);
    return t({ context: d, dispose: () => b(d.value, true) }), onMounted(() => {
      const y = s;
      d.value = Ur({
        scene: n.value,
        canvas: y,
        windowSize: o.windowSize ?? false,
        disableRender: w.value ?? false,
        rendererOptions: o,
        emit: i
      }), $r(n.value, d.value, i);
      const { registerCamera: v, camera: p, cameras: M, deregisterCamera: _ } = d.value;
      l(d.value);
      const c = () => {
        const g = new PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1e3
        );
        g.position.set(3, 3, 3), g.lookAt(0, 0, 0), v(g);
        const E = watchEffect(() => {
          M.value.length >= 2 && (g.removeFromParent(), _(g), E == null || E());
        });
      };
      watch(
        () => o.camera,
        (g, E) => {
          g && v(g), E && (E.removeFromParent(), _(E));
        },
        {
          immediate: true
        }
      ), p.value || (a(
        "No camera found. Creating a default perspective camera. To have full control over a camera, please add one to the scene."
      ), c());
    }), onUnmounted(() => {
      b(d.value);
    }), (y, v) => (openBlock(), createElementBlock("canvas", {
      ref_key: "canvas",
      ref: s,
      "data-scene": n.value.uuid,
      class: normalizeClass(y.$attrs.class),
      "data-tres": `tresjs ${unref(dr).version}`,
      style: normalizeStyle({
        display: "block",
        width: "100%",
        height: "100%",
        position: y.windowSize ? "fixed" : "relative",
        top: 0,
        left: 0,
        pointerEvents: "auto",
        touchAction: "none",
        ...y.$attrs.style
      })
    }, null, 14, en));
  }
});
var rn = [
  "TresCanvas",
  "TresLeches",
  "TresScene"
];
var nn = {
  template: {
    compilerOptions: {
      isCustomElement: (e) => e.startsWith("Tres") && !rn.includes(e) || e === "primitive"
    }
  }
};
var wn = nn;
var Mn = {
  mounted: (e, t) => {
    if (t.arg) {
      console.log(`v-log:${t.arg}`, e[t.arg]);
      return;
    }
    console.log("v-log", e);
  }
};
var it = class extends Line {
  constructor(t, r) {
    const o = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], i = new BufferGeometry();
    i.setAttribute("position", new Float32BufferAttribute(o, 3)), i.computeBoundingSphere();
    const u = new LineBasicMaterial({ fog: false });
    super(i, u), this.light = t, this.color = r, this.type = "RectAreaLightHelper";
    const a = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], s = new BufferGeometry();
    s.setAttribute("position", new Float32BufferAttribute(a, 3)), s.computeBoundingSphere(), this.add(new Mesh(s, new MeshBasicMaterial({ side: BackSide, fog: false })));
  }
  updateMatrixWorld() {
    if (this.scale.set(0.5 * this.light.width, 0.5 * this.light.height, 1), this.color !== void 0)
      this.material.color.set(this.color), this.children[0].material.color.set(this.color);
    else {
      this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
      const t = this.material.color, r = Math.max(t.r, t.g, t.b);
      r > 1 && t.multiplyScalar(1 / r), this.children[0].material.color.copy(this.material.color);
    }
    this.matrixWorld.extractRotation(this.light.matrixWorld).scale(this.scale).copyPosition(this.light.matrixWorld), this.children[0].matrixWorld.copy(this.matrixWorld);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
};
var { logWarning: Ne } = U();
var te;
var I;
var on = {
  DirectionalLight: DirectionalLightHelper,
  PointLight: PointLightHelper,
  SpotLight: SpotLightHelper,
  HemisphereLight: HemisphereLightHelper,
  RectAreaLight: it
};
var Pn = {
  mounted: (e) => {
    if (!e.isLight) {
      Ne(`${e.type} is not a light`);
      return;
    }
    te = on[e.type], e.parent.add(new te(e, 1, e.color.getHex()));
  },
  updated: (e) => {
    I = e.parent.children.find((t) => t instanceof te), !(I instanceof it) && I.update();
  },
  unmounted: (e) => {
    if (!e.isLight) {
      Ne(`${e.type} is not a light`);
      return;
    }
    I = e.parent.children.find((t) => t instanceof te), I && I.dispose && I.dispose(), e.parent.remove(I);
  }
};
var { logWarning: sn } = U();
var j = null;
var _n = {
  updated: (e, t) => {
    var i;
    const r = Ar(t);
    if (!r) {
      sn(`v-distance-to: problem with binding value: ${t.value}`);
      return;
    }
    j && (j.dispose(), e.parent.remove(j));
    const o = r.clone().sub(e.position);
    o.normalize(), j = new ArrowHelper(o, e.position, e.position.distanceTo(r), 16776960), e.parent.add(j), console.table(
      [
        ["Distance:", e.position.distanceTo(r)],
        [`origin: ${e.name || e.type}`, `x:${e.position.x}, y:${e.position.y}, z:${(i = e.position) == null ? void 0 : i.z}`],
        [`Destiny: ${e.name || e.type}`, `x:${r.x}, y:${r.y}, z:${r == null ? void 0 : r.z}`]
      ]
    );
  },
  unmounted: (e) => {
    j == null || j.dispose(), e.parent.remove(j);
  }
};
var Cn = {
  install(e) {
    e.component("TresCanvas", tn);
  }
};

export {
  pr,
  fn,
  dn,
  U,
  pn,
  hr,
  be,
  Dr,
  jr,
  mn,
  vn,
  tt,
  gn,
  hn,
  pe,
  me,
  Hr,
  Ur,
  rt,
  yn,
  bn,
  $r,
  tn,
  wn,
  Mn,
  Pn,
  _n,
  Cn
};
//# sourceMappingURL=chunk-RFEAB4KQ.js.map
