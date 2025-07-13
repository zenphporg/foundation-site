import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, withModifiers, Transition, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$4, a as _sfc_main$6 } from "./Label-CHHcxqKF.js";
import { _ as _sfc_main$1 } from "./AppLayout-4V3vKB4P.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./Layout-Bwv-8V8S.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$7 } from "./AppLogoIcon-DBADkq_3.js";
import { _ as _sfc_main$5 } from "./Input-DT0skB6D.js";
import { u as useRoutes } from "./useRoutes-JSS26hLF.js";
import "reka-ui";
import "class-variance-authority";
import "@vueuse/core";
import "lucide-vue-next";
import "clsx";
import "tailwind-merge";
import "../ssr.js";
import "@inertiajs/vue3/server";
import "@vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Password",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbItems = [
      {
        title: "Password settings",
        href: "/settings/password"
      }
    ];
    const passwordInput = ref(null);
    const currentPasswordInput = ref(null);
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const updatePassword = () => {
      form.put(useRoutes("password.update"), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: (errors) => {
          if (errors.password) {
            form.reset("password", "password_confirmation");
            if (passwordInput.value instanceof HTMLInputElement) {
              passwordInput.value.focus();
            }
          }
          if (errors.current_password) {
            form.reset("current_password");
            if (currentPasswordInput.value instanceof HTMLInputElement) {
              currentPasswordInput.value.focus();
            }
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Password settings" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    title: "Update password",
                    description: "Ensure your account is using a long, random password to stay secure"
                  }, null, _parent3, _scopeId2));
                  _push3(`<form class="space-y-6"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "current_password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Current password`);
                      } else {
                        return [
                          createTextVNode("Current password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "current_password",
                    ref_key: "currentPasswordInput",
                    ref: currentPasswordInput,
                    modelValue: unref(form).current_password,
                    "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    autocomplete: "current-password",
                    placeholder: "Current password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.current_password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`New password`);
                      } else {
                        return [
                          createTextVNode("New password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "password",
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    autocomplete: "new-password",
                    placeholder: "New password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), { for: "password_confirmation" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Confirm password`);
                      } else {
                        return [
                          createTextVNode("Confirm password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    id: "password_confirmation",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    autocomplete: "new-password",
                    placeholder: "Confirm password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    message: unref(form).errors.password_confirmation
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save password`);
                      } else {
                        return [
                          createTextVNode("Save password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p style="${ssrRenderStyle(unref(form).recentlySuccessful ? null : { display: "none" })}" class="text-sm text-neutral-600"${_scopeId2}>Saved.</p></div></form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(_sfc_main$3, {
                        title: "Update password",
                        description: "Ensure your account is using a long, random password to stay secure"
                      }),
                      createVNode("form", {
                        onSubmit: withModifiers(updatePassword, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "current_password" }, {
                            default: withCtx(() => [
                              createTextVNode("Current password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "current_password",
                            ref_key: "currentPasswordInput",
                            ref: currentPasswordInput,
                            modelValue: unref(form).current_password,
                            "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                            type: "password",
                            class: "mt-1 block w-full",
                            autocomplete: "current-password",
                            placeholder: "Current password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.current_password
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "password" }, {
                            default: withCtx(() => [
                              createTextVNode("New password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "password",
                            ref_key: "passwordInput",
                            ref: passwordInput,
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: "password",
                            class: "mt-1 block w-full",
                            autocomplete: "new-password",
                            placeholder: "New password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.password
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(unref(_sfc_main$4), { for: "password_confirmation" }, {
                            default: withCtx(() => [
                              createTextVNode("Confirm password")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), {
                            id: "password_confirmation",
                            modelValue: unref(form).password_confirmation,
                            "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                            type: "password",
                            class: "mt-1 block w-full",
                            autocomplete: "new-password",
                            placeholder: "Confirm password"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$6, {
                            message: unref(form).errors.password_confirmation
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(unref(_sfc_main$7), {
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save password")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(Transition, {
                            "enter-active-class": "transition ease-in-out",
                            "enter-from-class": "opacity-0",
                            "leave-active-class": "transition ease-in-out",
                            "leave-to-class": "opacity-0"
                          }, {
                            default: withCtx(() => [
                              withDirectives(createVNode("p", { class: "text-sm text-neutral-600" }, "Saved.", 512), [
                                [vShow, unref(form).recentlySuccessful]
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ], 32)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Password settings" }),
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(_sfc_main$3, {
                      title: "Update password",
                      description: "Ensure your account is using a long, random password to stay secure"
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(updatePassword, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$4), { for: "current_password" }, {
                          default: withCtx(() => [
                            createTextVNode("Current password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "current_password",
                          ref_key: "currentPasswordInput",
                          ref: currentPasswordInput,
                          modelValue: unref(form).current_password,
                          "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                          type: "password",
                          class: "mt-1 block w-full",
                          autocomplete: "current-password",
                          placeholder: "Current password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.current_password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$4), { for: "password" }, {
                          default: withCtx(() => [
                            createTextVNode("New password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "password",
                          ref_key: "passwordInput",
                          ref: passwordInput,
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: "password",
                          class: "mt-1 block w-full",
                          autocomplete: "new-password",
                          placeholder: "New password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode(unref(_sfc_main$4), { for: "password_confirmation" }, {
                          default: withCtx(() => [
                            createTextVNode("Confirm password")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), {
                          id: "password_confirmation",
                          modelValue: unref(form).password_confirmation,
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          type: "password",
                          class: "mt-1 block w-full",
                          autocomplete: "new-password",
                          placeholder: "Confirm password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$6, {
                          message: unref(form).errors.password_confirmation
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode(unref(_sfc_main$7), {
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save password")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createVNode(Transition, {
                          "enter-active-class": "transition ease-in-out",
                          "enter-from-class": "opacity-0",
                          "leave-active-class": "transition ease-in-out",
                          "leave-to-class": "opacity-0"
                        }, {
                          default: withCtx(() => [
                            withDirectives(createVNode("p", { class: "text-sm text-neutral-600" }, "Saved.", 512), [
                              [vShow, unref(form).recentlySuccessful]
                            ])
                          ]),
                          _: 1
                        })
                      ])
                    ], 32)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/settings/Password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
