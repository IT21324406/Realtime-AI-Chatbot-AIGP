export function useTranscription(onResult) {
  let recognition = null;

  function start() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech API not supported in this browser.");
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (e) => {
      let transcript = "";
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        transcript += e.results[i][0].transcript;
      }
      onResult(transcript);
    };

    recognition.start();
  }

  function stop() {
    recognition?.stop();
  }

  return { start, stop };
}
