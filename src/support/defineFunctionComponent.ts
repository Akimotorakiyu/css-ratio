import { SetupContext, defineComponent, h, VNode } from "vue";
/**
 * defineFunctionComponent
 * @author 臭哥哥·湫曗
 * @param component
 * @param option
 * @returns
 */
export const defineFunctionComponent = <
  P extends {},
  I extends { render: () => VNode }
>(
  component: (props: P, ctx: SetupContext) => I,
  option?: { name: string; inheritAttrs: boolean }
) => {
  const comName = option?.name || component.name || "Anonymous Component";

  const OptionCom = defineComponent({
    name: comName,
    inheritAttrs: option?.inheritAttrs ?? true,
    setup(_, ctx) {
      return component(ctx.attrs as P, ctx);
    },
    render(ctx: { render: () => VNode }) {
      return ctx.render();
    },
  });

  const funtionCom = {
    [comName]: (props: P) => {
      const instance = h(OptionCom, props);
      return instance as unknown as I;
    },
  };

  Reflect.set(OptionCom, "create", funtionCom[comName]);

  type Sign = (props: P) => I & VNode;

  const com = OptionCom as unknown as Sign & {
    create: Sign;
  };

  return com;
};
