const avoid = (timeout: number) => {
  return new Promise<void>(res => {
    setTimeout(() => res(), timeout);
  });
};

export default avoid;
