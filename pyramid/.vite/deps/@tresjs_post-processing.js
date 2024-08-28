import {
  bn,
  hr,
  rt
} from "./chunk-RFEAB4KQ.js";
import {
  BlendFunction,
  BloomEffect,
  DepthDownsamplingPass,
  DepthOfFieldEffect,
  EffectComposer,
  EffectPass,
  GlitchEffect,
  GlitchMode,
  NoiseEffect,
  NormalPass,
  OutlineEffect,
  PixelationEffect,
  RenderPass,
  VignetteEffect,
  VignetteTechnique
} from "./chunk-BXZRPRSO.js";
import "./chunk-MXSAXFKJ.js";
import {
  computed,
  defineComponent,
  inject,
  onUnmounted,
  provide,
  renderSlot,
  shallowRef,
  watch,
  watchEffect
} from "./chunk-L4HIV4YJ.js";
import {
  HalfFloatType
} from "./chunk-XPLT6QMO.js";
import "./chunk-PZ5AY32C.js";

// node_modules/@tresjs/post-processing/dist/tres-postprocessing.js
var W = Symbol("effectComposer");
var p = (l) => {
  const n = inject(W), e = shallowRef(null), t = shallowRef(null), { scene: o, camera: a } = rt();
  watchEffect(() => {
    !a.value || !(t != null && t.value) || (t.value.mainCamera = a.value);
  });
  let s = () => {
  };
  return s = watchEffect(() => {
    !a.value || !(n != null && n.value) || !o.value || (s(), !t.value && (t.value = l(), e.value = new EffectPass(a.value, t.value), n.value.addPass(e.value)));
  }), onUnmounted(() => {
    var r, i, f;
    e.value && ((r = n == null ? void 0 : n.value) == null || r.removePass(e.value)), (i = t.value) == null || i.dispose(), (f = e.value) == null || f.dispose();
  }), {
    pass: e,
    effect: t
  };
};
var j = /([^[.\]])+/g;
var oe = (l, n) => {
  if (!n)
    return;
  const e = Array.isArray(n) ? n : n.match(j);
  return e == null ? void 0 : e.reduce((t, o) => t && t[o], l);
};
var M = (l, n, e) => {
  const t = Array.isArray(n) ? n : n.match(j);
  t && t.reduce((o, a, s) => (o[a] === void 0 && (o[a] = {}), s === t.length - 1 && (o[a] = e), o[a]), l);
};
var B = (l, n) => {
  const e = { ...l };
  return n.forEach((t) => delete e[t]), e;
};
var X = (l, n, e, t, o = {}) => watch(l, (a) => {
  var s;
  if (n.value)
    if (a === void 0) {
      const r = t();
      M(n.value, e, oe(r, e)), (s = r.dispose) == null || s.call(r);
    } else
      M(n.value, e, l());
}, o);
var y = (l, n, e) => l.map(([t, o]) => X(
  t,
  n,
  o,
  e
));
var C = (l, n, e) => Object.keys(l).map((t) => X(
  () => l[t],
  n,
  t,
  e
));
var ue = defineComponent({
  __name: "Bloom",
  props: {
    blendFunction: {},
    intensity: {},
    kernelSize: {},
    luminanceThreshold: {},
    luminanceSmoothing: {},
    mipmapBlur: { type: Boolean, default: void 0 }
  },
  setup(l, { expose: n }) {
    const e = l, { pass: t, effect: o } = p(() => new BloomEffect(e));
    return n({ pass: t, effect: o }), y(
      [
        // blendFunction is not updated, because it has no setter in BloomEffect
        [() => e.intensity, "intensity"],
        [() => e.kernelSize, "kernelSize"],
        [() => e.luminanceSmoothing, "luminanceMaterial.smoothing"],
        [() => e.luminanceThreshold, "luminanceMaterial.threshold"]
      ],
      o,
      () => new BloomEffect()
    ), (a, s) => null;
  }
});
var ie = defineComponent({
  __name: "DepthOfField",
  props: {
    blendFunction: {},
    worldFocusDistance: {},
    worldFocusRange: {},
    focusDistance: {},
    focusRange: {},
    bokehScale: {},
    resolutionScale: {},
    resolutionX: {},
    resolutionY: {}
  },
  setup(l, { expose: n }) {
    const e = l, { camera: t } = rt(), { pass: o, effect: a } = p(() => new DepthOfFieldEffect(t.value, e));
    return n({ pass: o, effect: a }), y(
      [
        // blendFunction is not updated, because it has no setter in BloomEffect
        [() => e.worldFocusDistance, "circleOfConfusionMaterial.worldFocusDistance"],
        [() => e.focusDistance, "circleOfConfusionMaterial.focusDistance"],
        [() => e.worldFocusRange, "circleOfConfusionMaterial.worldFocusRange"],
        [() => e.focusRange, "circleOfConfusionMaterial.focusRange"],
        [() => e.bokehScale, "bokehScale"],
        [() => e.resolutionScale, "blurPass.resolution.scale"],
        [() => e.resolutionX, "resolution.width"],
        [() => e.resolutionY, "resolution.height"]
      ],
      a,
      () => new DepthOfFieldEffect()
    ), (s, r) => null;
  }
});
var v;
function N() {
  var l;
  if (v !== void 0)
    return v;
  try {
    let n;
    const e = document.createElement("canvas");
    return v = !!(window.WebGL2RenderingContext && (n = e.getContext("webgl2"))), n && ((l = n.getExtension("WEBGL_lose_context")) == null || l.loseContext()), v;
  } catch {
    return v = false;
  }
}
var ce = defineComponent({
  __name: "EffectComposer",
  props: {
    enabled: { type: Boolean, default: true },
    children: {},
    depthBuffer: { type: Boolean, default: void 0 },
    disableNormalPass: { type: Boolean, default: false },
    stencilBuffer: { type: Boolean, default: void 0 },
    resolutionScale: {},
    autoClear: { type: Boolean, default: true },
    multisampling: { default: 0 },
    frameBufferType: { default: HalfFloatType }
  },
  emits: ["render"],
  setup(l, { expose: n, emit: e }) {
    const t = l, o = e, { scene: a, camera: s, renderer: r, sizes: i, render: f } = rt(), u = shallowRef(null);
    let g = null, h = null;
    provide(W, u), n({ composer: u });
    const Y = () => {
      u.value && (h = new NormalPass(a.value, s.value), h.enabled = false, u.value.addPass(h), t.resolutionScale !== void 0 && N() && (g = new DepthDownsamplingPass({
        normalBuffer: h.texture,
        resolutionScale: t.resolutionScale
      }), g.enabled = false, u.value.addPass(g)));
    }, V = computed(() => {
      const c = new EffectComposer(), m = {
        depthBuffer: t.depthBuffer !== void 0 ? t.depthBuffer : c.inputBuffer.depthBuffer,
        stencilBuffer: t.stencilBuffer !== void 0 ? t.stencilBuffer : c.inputBuffer.stencilBuffer,
        multisampling: N() ? t.multisampling !== void 0 ? t.multisampling : c.multisampling : 0,
        frameBufferType: t.frameBufferType !== void 0 ? t.frameBufferType : HalfFloatType
      };
      return c.dispose(), m;
    }), F = () => {
      !r.value && !a.value && !s.value || (u.value = new EffectComposer(r.value, V.value), u.value.addPass(new RenderPass(a.value, s.value)), t.disableNormalPass || Y());
    };
    watch([r, a, s, () => t.disableNormalPass], () => {
      !i.width.value || !i.height.value || F();
    }), watch(() => [i.width.value, i.height.value], ([c, m]) => {
      !c && !m || (u.value ? u.value.setSize(c, m) : F());
    }, {
      immediate: true
    });
    const { render: U } = bn();
    return U(() => {
      if (t.enabled && r.value && u.value && i.width.value && i.height.value && f.frames.value > 0) {
        const c = r.value.autoClear;
        r.value.autoClear = t.autoClear, t.stencilBuffer && !t.autoClear && r.value.clearStencil(), u.value.render(), o("render", u.value), r.value.autoClear = c;
      }
      f.priority.value = 0, f.mode.value === "always" ? f.frames.value = 1 : f.frames.value = Math.max(0, f.frames.value - 1);
    }), onUnmounted(() => {
      var c;
      (c = u.value) == null || c.dispose();
    }), (c, m) => renderSlot(c.$slots, "default");
  }
});
var fe = defineComponent({
  __name: "Glitch",
  props: {
    blendFunction: {},
    delay: {},
    duration: {},
    strength: {},
    mode: {},
    active: { type: Boolean },
    ratio: {},
    columns: {},
    chromaticAberrationOffset: {},
    perturbationMap: {},
    dtSize: {}
  },
  setup(l, { expose: n }) {
    const e = l, { pass: t, effect: o } = p(() => new GlitchEffect(e));
    return n({ pass: t, effect: o }), watchEffect(() => {
      const a = () => {
        if (e.mode !== void 0)
          return e.active === false ? GlitchMode.DISABLED : e.mode;
        const s = new GlitchEffect(), r = s.mode;
        return s.dispose(), r;
      };
      o.value && (o.value.mode = a());
    }), C(
      B(e, ["active", "mode", "blendFunction"]),
      o,
      () => new GlitchEffect()
    ), (a, s) => null;
  }
});
var de = defineComponent({
  __name: "Outline",
  props: {
    outlinedObjects: {},
    blur: { type: Boolean, default: void 0 },
    xRay: { type: Boolean, default: void 0 },
    kernelSize: {},
    pulseSpeed: {},
    resolutionX: {},
    resolutionY: {},
    edgeStrength: {},
    patternScale: {},
    multisampling: {},
    blendFunction: {},
    patternTexture: {},
    resolutionScale: {},
    hiddenEdgeColor: {},
    visibleEdgeColor: {}
  },
  setup(l, { expose: n }) {
    const e = l, t = (u) => u !== void 0 ? hr(u).getHex() : void 0, { camera: o, scene: a } = rt(), s = {
      blur: e.blur,
      xRay: e.xRay,
      kernelSize: e.kernelSize,
      pulseSpeed: e.pulseSpeed,
      resolutionX: e.resolutionX,
      resolutionY: e.resolutionY,
      patternScale: e.patternScale,
      edgeStrength: e.edgeStrength,
      blendFunction: e.blendFunction,
      multisampling: e.multisampling,
      patternTexture: e.patternTexture,
      resolutionScale: e.resolutionScale,
      hiddenEdgeColor: t(e.hiddenEdgeColor),
      visibleEdgeColor: t(e.visibleEdgeColor)
    }, { pass: r, effect: i } = p(() => new OutlineEffect(a.value, o.value, s));
    n({ pass: r, effect: i }), watch(
      [() => e.outlinedObjects, i],
      // watchEffect is intentionally not used here as it would result in an endless loop
      () => {
        var u;
        (u = i.value) == null || u.selection.set(e.outlinedObjects || []);
      },
      {
        immediate: true
      }
    );
    const f = computed(() => ({
      hiddenEdgeColor: e.hiddenEdgeColor ? hr(e.hiddenEdgeColor) : void 0,
      visibleEdgeColor: e.visibleEdgeColor ? hr(e.visibleEdgeColor) : void 0
    }));
    return y(
      [
        /* some properties are not updated because of different reasons:
            resolutionX - has no setter in OutlineEffect
            resolutionY - has no setter in OutlineEffect
            blendFunction - has no setter in OutlineEffect
            patternTexture - different type in constructor and in setter
            resolutionScale - has no setter in OutlineEffect
          */
        [() => e.blur, "blur"],
        [() => e.xRay, "xRay"],
        [() => e.pulseSpeed, "pulseSpeed"],
        [() => e.kernelSize, "kernelSize"],
        [() => e.edgeStrength, "edgeStrength"],
        [() => e.patternScale, "patternScale"],
        [() => e.multisampling, "multisampling"],
        [() => f.value.hiddenEdgeColor, "hiddenEdgeColor"],
        [() => f.value.visibleEdgeColor, "visibleEdgeColor"]
      ],
      i,
      () => new OutlineEffect()
    ), (u, g) => null;
  }
});
var pe = defineComponent({
  __name: "Pixelation",
  props: {
    granularity: {}
  },
  setup(l, { expose: n }) {
    const e = l, { pass: t, effect: o } = p(() => new PixelationEffect(e.granularity));
    return n({ pass: t, effect: o }), C(
      e,
      o,
      () => new PixelationEffect()
    ), (a, s) => null;
  }
});
var me = defineComponent({
  __name: "Vignette",
  props: {
    technique: { default: VignetteTechnique.DEFAULT },
    blendFunction: { default: BlendFunction.NORMAL },
    offset: { default: 0.5 },
    darkness: { default: 0.5 }
  },
  setup(l, { expose: n }) {
    const e = l, { pass: t, effect: o } = p(() => new VignetteEffect(e));
    return n({ pass: t, effect: o }), C(
      B(e, ["blendFunction"]),
      o,
      () => new VignetteEffect()
    ), (a, s) => null;
  }
});
var ve = defineComponent({
  __name: "Noise",
  props: {
    premultiply: { type: Boolean, default: false },
    blendFunction: { default: BlendFunction.SCREEN }
  },
  setup(l, { expose: n }) {
    const e = l, { pass: t, effect: o } = p(() => new NoiseEffect(e));
    return n({ pass: t, effect: o }), C(
      B(e, ["blendFunction"]),
      o,
      () => new NoiseEffect()
    ), (a, s) => null;
  }
});
export {
  ue as Bloom,
  ie as DepthOfField,
  ce as EffectComposer,
  fe as Glitch,
  ve as Noise,
  de as Outline,
  pe as Pixelation,
  me as Vignette,
  p as useEffect
};
//# sourceMappingURL=@tresjs_post-processing.js.map
