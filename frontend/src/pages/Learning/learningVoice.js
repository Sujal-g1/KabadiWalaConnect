const VOICE_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
  ta: "ta-IN",
  te: "te-IN",
  kn: "kn-IN",
};

const getVoice = (language) => {
  const voices = window.speechSynthesis.getVoices();

  const targetLang = VOICE_MAP[language];

  if (!targetLang) {
    return null;
  }

  // Tamil: explicitly use Vani
  if (language === "ta") {
    return (
      voices.find(
        (voice) =>
          voice.name === "Vani" &&
          voice.lang === "ta-IN"
      ) ||
      voices.find(
        (voice) =>
          voice.lang === "ta-IN"
      )
    );
  }

  return (
    voices.find(
      (voice) => voice.lang === targetLang
    ) ||
    voices.find((voice) =>
      voice.lang
        ?.toLowerCase()
        .startsWith(language)
    ) ||
    null
  );
};

export const speakLearningText = (
  sections,
  {
    language = "hi",
    onStart,
    onEnd,
    onError,
  } = {}
) => {
  if (
    typeof window === "undefined" ||
    !window.speechSynthesis
  ) {
    onError?.(
      new Error(
        "Speech synthesis is not supported."
      )
    );
    return;
  }

  if (!sections?.length) {
    onError?.(
      new Error(
        "There is no content to speak."
      )
    );
    return;
  }

  // Stop previous speech
  window.speechSynthesis.cancel();

  const voice = getVoice(language);

  if (!voice) {
    onError?.({
      code: "VOICE_UNAVAILABLE",
      language,
      message: `No voice available for ${language}`,
    });

    return;
  }

  /*
    Clean the text
  */
  const text = sections
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) {
    onError?.(
      new Error(
        "There is no text to speak."
      )
    );
    return;
  }

  console.log("===== SPEECH =====");
  console.log("Language:", language);
  console.log("Voice:", voice.name);
  console.log("Voice language:", voice.lang);
  console.log("Text:", text);
  console.log("==================");

  /*
    IMPORTANT:
    Tamil uses exactly the same structure
    as the console test that worked.
  */
  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.voice = voice;
  utterance.lang = voice.lang;

  if (language === "ta") {
    utterance.rate = 0.75;
  } else if (language === "en") {
    utterance.rate = 0.88;
  } else {
    utterance.rate = 0.8;
  }

  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = () => {
    console.log(
      "Speech started:",
      voice.name,
      voice.lang
    );

    onStart?.();
  };

  utterance.onend = () => {
    console.log("Speech finished");
    onEnd?.();
  };

  utterance.onerror = (event) => {
    console.error(
      "Speech error:",
      event.error,
      event
    );

    if (event.error !== "canceled") {
      onError?.(event);
    }
  };

  /*
    IMPORTANT:
    Same delay as your successful manual test.
  */
  setTimeout(() => {
    window.speechSynthesis.speak(
      utterance
    );

    /*
      Safari/Chrome can occasionally leave
      the speech engine paused.
    */
    setTimeout(() => {
      if (
        window.speechSynthesis.paused
      ) {
        window.speechSynthesis.resume();
      }
    }, 100);
  }, 200);
};

export const stopLearningSpeech = () => {
  if (
    typeof window !== "undefined" &&
    window.speechSynthesis
  ) {
    window.speechSynthesis.cancel();
  }
};

export const isSpeechSupported = () => {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  );
};