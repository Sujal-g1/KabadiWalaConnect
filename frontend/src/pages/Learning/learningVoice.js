export const speakLearningText = (
  text,
  {
    lang = "hi-IN",
    onStart,
    onEnd,
    onError,
  } = {}
) => {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    onError?.(
      new Error(
        "Speech synthesis is not supported."
      )
    );

    return;
  }

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang = lang;

  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (event) => {
    onError?.(event);
  };

  window.speechSynthesis.speak(
    utterance
  );
};

export const stopLearningVoice = () => {
  if (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {
    window.speechSynthesis.cancel();
  }
};