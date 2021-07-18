import { onMounted, reactive } from "vue";
import { defineFunctionComponent } from "./support/defineFunctionComponent";

export const Contain = defineFunctionComponent((a, { slots }) => {
  const ratio = 16 / 9;

  const size = reactive({
    width: 0,
    height: 0,
  });

  const container = (
    <div class="bg-gray-400 absolute left-0 right-0 top-0 bottom-0 -z-1"></div>
  );

  const observe = new ResizeObserver((event) => {
    const containerElement = container.el as HTMLDivElement;
    const wSize = {
      clientWidth: containerElement.clientWidth,
      clientHeight: containerElement.clientWidth / ratio,
    };
    const hSize = {
      clientWidth: containerElement.clientHeight * ratio,
      clientHeight: containerElement.clientHeight,
    };
    const wElement = wSize;
    const hElement = hSize;

    if (wElement.clientHeight <= containerElement.clientHeight) {
      size.width = wElement.clientWidth;
      size.height = wElement.clientHeight;
    } else {
      size.width = hElement.clientWidth;
      size.height = hElement.clientHeight;
    }
    // console.log(
    //   "resize",
    //   JSON.stringify(size, undefined, 4),
    //   size.width / size.height,
    //   16 / 9
    // );
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
