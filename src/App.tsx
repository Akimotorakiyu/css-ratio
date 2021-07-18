import { onMounted, reactive } from "vue";
import { defineFunctionComponent } from "./support/defineFunctionComponent";

import { useRatio } from "./useRatio";
export const Contain = defineFunctionComponent((a, { slots }) => {
  const { ratio, containerNode, containSize } = useRatio();

  const container = (
    <div class="bg-gray-400 absolute left-0 right-0 top-0 bottom-0 -z-1"></div>
  );

  onMounted(() => {
    containerNode.value = container.el as HTMLDivElement;
  });

  return {
    render() {
      return (
        <>
          <div class="relative inline-block min-w-36 min-h-36 overflow-hidden resize flex items-center justify-center">
            {[container]}
            <div
              class="bg-red-600"
              style={{
                width: `${containSize.value.width}px`,
                height: `${containSize.value.height}px`,
              }}
            >
              {slots?.default?.()}
            </div>
          </div>
        </>
      );
    },
  };
});

export const App = defineFunctionComponent(() => {
  return {
    render() {
      return <Contain>124</Contain>;
    },
  };
});
