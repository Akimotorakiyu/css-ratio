import { onMounted, reactive } from "vue";
import { defineFunctionComponent } from "./support/defineFunctionComponent";

export const Contain = defineFunctionComponent((a, { slots }) => {
  const w = (
    <div
      class=" inline-block w-full opacity-40 absolute"
      style={{
        aspectRatio: (16 / 9).toString(),
      }}
    ></div>
  );

  const h = (
    <div
      class=" inline-block h-full opacity-40 absolute"
      style={{
        aspectRatio: (16 / 9).toString(),
      }}
    ></div>
  );

  const size = reactive({
    width: 0,
    height: 0,
  });

  const container = (
    <div class="bg-gray-400 absolute left-0 right-0 top-0 bottom-0 -z-1">
      {[w, h]}
    </div>
  );

  const observe = new ResizeObserver((event) => {
    const containerElement = container.el as HTMLDivElement;
    const wElement = w.el as HTMLDivElement;
    const hElement = h.el as HTMLDivElement;

    if (wElement.clientHeight <= containerElement.clientHeight) {
      size.width = wElement.clientWidth;
      size.height = wElement.clientHeight;
      console.log();
    } else {
      size.width = hElement.clientWidth;
      size.height = hElement.clientHeight;
    }
    console.log(
      "resize",
      JSON.stringify(size, undefined, 4),
      size.width / size.height,
      16 / 9
    );
  });

  onMounted(() => {
    observe.observe(container.el as Element);
    console.log(container.el);
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
                width: `${size.width}px`,
                height: `${size.height}px`,
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
