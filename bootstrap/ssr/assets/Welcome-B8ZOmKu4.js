import { defineComponent, computed, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Welcome",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const appName = computed(() => page.props.name);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, {
        title: _ctx.__("Coming Soon")
      }, null, _parent));
      _push(`<div class="welcome-page flex min-h-screen flex-col items-center justify-center p-6 text-white"><div class="w-full max-w-2xl text-center"><div class="mb-8"><img src="/storage/img/logo.svg" alt="Logo" class="mx-auto h-auto w-48"></div><div class="mb-12"><h2 class="mb-4 text-xl font-medium text-slate-400 md:text-2xl">${ssrInterpolate(_ctx.__("Coming Soon"))}</h2><h1 class="mb-4 text-2xl font-semibold text-white md:text-4xl">${ssrInterpolate(unref(appName))}</h1><p class="text-lg text-slate-400 md:text-xl">${ssrInterpolate(_ctx.__("We're working hard to bring you something amazing. Stay tuned!"))}&#39;</p></div><div class="text-sm text-slate-400"><p>${ssrInterpolate(_ctx.__("For inquiries, please contact us at:"))}</p><a href="mailto:hello@jetstreamlabs.com" class="font-medium text-orange-400 hover:text-orange-600">${ssrInterpolate(_ctx.__("hello@jetstreamlabs.com"))}</a></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
