export function generateTaskId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const a = letters[Math.floor(Math.random() * letters.length)];
  const b = letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(1000 + Math.random() * 9000);

  return `${a}${b}-${num}`;
}