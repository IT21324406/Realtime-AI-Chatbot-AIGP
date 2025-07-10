export function speak(text, { onStart, onEnd } = {}) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}
