export const sleepImitator = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
};
