async function test() {
  return await Promise.resolve(1);
}

(async () => {
  const r = await test();
  console.log(r);
})();
