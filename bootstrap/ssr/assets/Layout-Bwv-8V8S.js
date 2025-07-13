import { defineComponent, useSSRContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./AppLogoIcon-DBADkq_3.js";
import { a as _sfc_main$4 } from "./AppLayout-4V3vKB4P.js";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "HeadingSmall",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(_attrs)}><h3 class="mb-0.5 text-base font-medium">${ssrInterpolate(_ctx.title)}</h3>`);
      if (_ctx.description) {
        _push(`<p class="text-muted-foreground text-sm">${ssrInterpolate(_ctx.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/HeadingSmall.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Heading",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-8 space-y-0.5" }, _attrs))}><h2 class="text-xl font-semibold tracking-tight">${ssrInterpolate(_ctx.title)}</h2>`);
      if (_ctx.description) {
        _push(`<p class="text-muted-foreground text-sm">${ssrInterpolate(_ctx.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Heading.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const sidebarNavItems = [
      {
        title: "Profile",
        href: "/settings/profile"
      },
      {
        title: "Password",
        href: "/settings/password"
      },
      {
        title: "Appearance",
        href: "/settings/appearance"
      }
    ];
    const page = usePage();
    const currentPath = ((_a = page.props.ziggy) == null ? void 0 : _a.location) ? new URL(page.props.ziggy.location).pathname : "";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 py-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Settings",
        description: "Manage your profile and account settings"
      }, null, _parent));
      _push(`<div class="flex flex-col space-y-8 md:space-y-0 lg:flex-row lg:space-y-0 lg:space-x-12"><aside class="w-full max-w-xl lg:w-48"><nav class="flex flex-col space-y-1 space-x-0"><!--[-->`);
      ssrRenderList(sidebarNavItems, (item) => {
        _push(ssrRenderComponent(unref(_sfc_main$3), {
          key: item.href,
          variant: "ghost",
          class: ["w-full justify-start", { "bg-muted": unref(currentPath) === item.href }],
          "as-child": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Link), {
                href: item.href
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Link), {
                  href: item.href
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(item.title), 1)
                  ]),
                  _: 2
                }, 1032, ["href"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav></aside>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), { class: "my-6 md:hidden" }, null, _parent));
      _push(`<div class="flex-1 md:max-w-2xl"><section class="max-w-xl space-y-12">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/settings/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$2 as a
};
