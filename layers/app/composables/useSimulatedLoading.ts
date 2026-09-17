export const useSimulatedLoading = (delayMs = 500) => {
  const isLoading = ref(true);

  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, delayMs);
  });

  return isLoading;
};
