const VOICE_LANGUAGE_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  pa: "pa-IN",
  gu: "gu-IN",
  bn: "bn-IN",
  ta: "ta-IN",
  te: "te-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  or: "or-IN",
  as: "as-IN",
};

const getSpeechLanguage = (language) => {
  return (
    VOICE_LANGUAGE_MAP[language] ||
    "en-IN"
  );
};

/* ============================================================
   FIND A MATCHING BROWSER VOICE
============================================================ */

const getBestVoice = (language) => {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    return null;
  }

  const voices =
    window.speechSynthesis.getVoices();

  if (!voices.length) {
    return null;
  }

  const targetLanguage =
    getSpeechLanguage(language).toLowerCase();

  /*
    1. Exact match
    Example:
    ta-IN === ta-IN
  */
  const exactVoice = voices.find(
    (voice) =>
      voice.lang?.toLowerCase() ===
      targetLanguage
  );

  if (exactVoice) {
    return exactVoice;
  }

  /*
    2. Regional match
    Example:
    ta-IN → ta
  */
  const baseLanguage =
    language.toLowerCase();

  const regionalVoice = voices.find(
    (voice) =>
      voice.lang
        ?.toLowerCase()
        .startsWith(baseLanguage)
  );

  if (regionalVoice) {
    return regionalVoice;
  }

  return null;
};

/* ============================================================
   WAIT UNTIL BROWSER VOICES ARE AVAILABLE
============================================================ */

const getAvailableVoices = () => {
  return new Promise((resolve) => {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      resolve([]);
      return;
    }

    const voices =
      window.speechSynthesis.getVoices();

    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    const handleVoicesChanged = () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );

      resolve(
        window.speechSynthesis.getVoices()
      );
    };

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      handleVoicesChanged
    );

    /*
      Some browsers don't fire voiceschanged.
    */
    window.setTimeout(() => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );

      resolve(
        window.speechSynthesis.getVoices()
      );
    }, 1000);
  });
};

/* ============================================================
   SPEAK LEARNING CONTENT
============================================================ */

export const speakLearningText = async (
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
    !("speechSynthesis" in window)
  ) {
    onError?.(
      new Error(
        "Speech synthesis is not supported by this browser."
      )
    );

    return;
  }

  if (
    !Array.isArray(sections) ||
    sections.length === 0
  ) {
    onError?.(
      new Error(
        "There is no content to speak."
      )
    );

    return;
  }

  /*
    Stop previous speech.
  */
  window.speechSynthesis.cancel();

  /*
    Wait for browser voices.
  */
  const voices =
    await getAvailableVoices();

  const targetLanguage =
    getSpeechLanguage(language);

  console.log(
    "Requested language:",
    language
  );

  console.log(
    "Speech language:",
    targetLanguage
  );

  console.log(
    "Available voices:",
    voices.map(
      (voice) =>
        `${voice.name} (${voice.lang})`
    )
  );

  /*
    Find matching voice.
  */
  const voice = getBestVoice(language);

  if (!voice) {
    onError?.(
      new Error(
        `No speech voice is available for ${targetLanguage}.`
      )
    );

    console.warn(
      `No voice found for ${targetLanguage}`
    );

    return;
  }

  console.log(
    "Selected voice:",
    voice.name,
    voice.lang
  );

  /*
    Clean sections.
  */
  const cleanSections = sections
    .map((section) =>
      section
        ?.replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean);

  let sectionIndex = 0;
  let started = false;

  const speakSection = () => {
    if (
      sectionIndex >=
      cleanSections.length
    ) {
      onEnd?.();
      return;
    }

    const text =
      cleanSections[sectionIndex];

    const utterance =
      new SpeechSynthesisUtterance(text);

    /*
      Set BOTH the language and matching voice.
    */
    utterance.lang = targetLanguage;
    utterance.voice = voice;

    /*
      Slower speech for accessibility.
    */
    utterance.rate =
      language === "en"
        ? 0.88
        : 0.78;

    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      if (!started) {
        started = true;
        onStart?.();
      }
    };

    utterance.onend = () => {
      sectionIndex += 1;

      window.setTimeout(
        speakSection,
        350
      );
    };

    utterance.onerror = (event) => {
      if (
        event.error === "canceled"
      ) {
        return;
      }

      console.error(
        "Speech synthesis error:",
        event
      );

      onError?.(event);
    };

    window.speechSynthesis.speak(
      utterance
    );
  };

  speakSection();
};

/* ============================================================
   STOP SPEECH
============================================================ */

export const stopLearningSpeech = () => {
  if (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {
    window.speechSynthesis.cancel();
  }
};

/* ============================================================
   SPEECH SUPPORT
============================================================ */

export const isSpeechSupported = () => {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  );
};

/* ============================================================
   DEBUG HELPER
============================================================ */

export const getAvailableSpeechLanguages = () => {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    return [];
  }

  return [
    ...new Set(
      window.speechSynthesis
        .getVoices()
        .map((voice) => voice.lang)
        .filter(Boolean)
    ),
  ];
};