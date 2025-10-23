import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { a as _sfc_main$2 } from "./AppLogoIcon-C4Tc7rVh.js";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthSplitLayout",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    const page = usePage();
    const name = page.props.name;
    const quote = page.props.quote;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0" }, _attrs))}><div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r"><div class="absolute inset-0 bg-zinc-900"></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: "relative z-20 flex items-center text-lg font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { class: "mr-2 size-8 fill-current text-white" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(name))}`);
          } else {
            return [
              createVNode(_sfc_main$2, { class: "mr-2 size-8 fill-current text-white" }),
              createTextVNode(" " + toDisplayString(unref(name)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(quote)) {
        _push(`<div class="relative z-20 mt-auto"><blockquote class="space-y-2"><p class="text-lg">“${ssrInterpolate(unref(quote).message)}”</p><footer class="text-sm text-neutral-300">${ssrInterpolate(unref(quote).author)}</footer></blockquote></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="lg:p-8"><div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"><div class="flex flex-col space-y-2 text-center">`);
      if (__props.title) {
        _push(`<h1 class="text-xl font-medium tracking-tight">${ssrInterpolate(__props.title)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.description) {
        _push(`<p class="text-muted-foreground text-sm">${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/auth/AuthSplitLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthLayout",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        title: __props.title,
        description: __props.description
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/AuthLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
