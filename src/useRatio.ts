import { defineComponent, onMounted, onUpdated, ref, Ref, watch } from "vue";

export function calcSizeByRatio(
  containerElement: { clientWidth: number; clientHeight: number },
  ratio: number
) {
  const size = {
    width: 0,
    height: 0,
  };

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
  return size;
}

export const useRatio = () => {
  const ratio = ref(16 / 9);
  const containerNode = ref<HTMLElement>();
  const latestElement = ref<HTMLElement>();

  const containSize = ref({
    width: 0,
    height: 0,
  });

  const resizeObserve = new ResizeObserver(() => {
    containSize.value = calcSizeByRatio(
      containerNode.value as HTMLDivElement,
      ratio.value
    );
  });

  const tryObserve = () => {
    console.log("ob", containerNode.value);
    if (containerNode.value) {
      resizeObserve.observe(containerNode.value, { box: "border-box" });
    }
    if (latestElement.value) {
      resizeObserve.unobserve(latestElement.value);
    }
    latestElement.value = containerNode.value;
  };

  watch(containerNode, tryObserve);
  onMounted(() => {
    tryObserve();
  });

  return {
    ratio,
    containSize,
    containerNode,
  };
};
