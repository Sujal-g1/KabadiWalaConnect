import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Activity,
  ArrowUpRight,
  MessageCircle,
  Mic,
  Send,
  Sparkles,
  Square,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo.webp";

import { sendAIMessage, } from "../../services/ai/aiApi";

const AIChatbot = () => {
  const navigate = useNavigate();
  const [ isActiveVoice, setIsActiveVoice, ] = useState(false);

  /* ==========================================================
     STATE
  ========================================================== */

  const [messages, setMessages] =
    useState([
      {
        role: "assistant",
        text:
          "Namaste! I'm ECO-MITRA. I can help you with e-waste prices, collections, recyclers and more.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [isListening, setIsListening] =
    useState(false);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [mute, setMute] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const [inputFocused, setInputFocused] =
    useState(false);

  const scrollRef =
    useRef(null);

  /* ==========================================================
     DETERMINISTIC WAVEFORM
  ========================================================== */

  const waveform =
    [8, 16, 11, 23, 14, 28, 18, 25, 13, 20, 9];

  /* ==========================================================
     CURRENT AI STATE
  ========================================================== */

  const aiState =
    isListening
      ? "listening"
      : loading
        ? "thinking"
        : isSpeaking
          ? "speaking"
          : "idle";

  /* ==========================================================
     AUTO SCROLL
  ========================================================== */

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* ==========================================================
     CLOSE
  ========================================================== */

  const handleClose = () => {
    stopSpeaking();
    navigate(-1);
  };

  /* ==========================================================
     ESCAPE
  ========================================================== */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* ==========================================================
     STOP SPEAKING
  ========================================================== */

  const stopSpeaking = () => {
    if (
      typeof window !== "undefined" &&
      window.speechSynthesis
    ) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  /* ==========================================================
     SPEAK RESPONSE
  ========================================================== */

  const speakResponse = (
    text,
    language = "Hindi"
  ) => {
    stopSpeaking();

    if (mute) {
      return;
    }

    if (
      typeof window === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang =
      language === "English"
        ? "en-IN"
        : "hi-IN";

    speech.rate = 0.95;
    speech.pitch = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(
      speech
    );
  };

  /* ==========================================================
     SEND MESSAGE
  ========================================================== */

  const sendMessage = async (
    manualText
  ) => {
    const textToProcess =
      manualText ?? input;

    if (!textToProcess.trim()) {
      return;
    }

    stopSpeaking();
    setTranscript("");

    const newMessages = [
      ...messages,
      {
        role: "user",
        text: textToProcess.trim(),
      },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const result =
        await sendAIMessage(
          textToProcess.trim()
        );

      const reply =
        result.data.reply;

      const language =
        result.data.language;

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          text: reply,
        },
      ]);

      speakResponse(
        reply,
        language
      );
    } catch (error) {
      console.error(
        "AI error:",
        error
      );

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          text:
            "Sorry, I could not respond right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     VOICE INPUT
  ========================================================== */

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported in this browser."
      );

      return;
    }

    if (isListening) {
      return;
    }

    stopSpeaking();

    const recognition =
      new SpeechRecognition();

    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onresult = (
      event
    ) => {
      let currentTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        currentTranscript +=
          event.results[i][0]
            .transcript;
      }

      setTranscript(
        currentTranscript
      );

      if (
        event.results[
          event.results.length - 1
        ].isFinal
      ) {
        setInput(
          currentTranscript
        );

        sendMessage(
          currentTranscript
        );
      }
    };

    recognition.onerror = (
      error
    ) => {
      console.error(
        "Speech recognition error:",
        error
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  /* ==========================================================
     MUTE
  ========================================================== */

  const toggleMute = () => {
    if (!mute) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }

    setMute(!mute);
  };

  /* ==========================================================
     EXAMPLE COMMAND
  ========================================================== */

  const handleExample = (
    text
  ) => {
    setInput(text);
    sendMessage(text);
  };

  /* ==========================================================
     STATE LABEL
  ========================================================== */

  const stateTitle = {
    idle: "How can I help?",
    listening: "I'm listening...",
    thinking: "I'm thinking...",
    speaking: "ECO-MITRA is speaking",
  };

  const stateDescription = {
    idle:
      "Ask about prices, recyclers, collections or payments.",
    listening:
      "Speak naturally in Hindi or English.",
    thinking:
      "Processing your request...",
    speaking:
      "You can stop the response anytime.",
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-end
        justify-center
        bg-[var(--background)]
        sm:items-center
        sm:bg-black/35
        sm:p-4
      "
    >
      {/* ======================================================
          BACKDROP
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="
          absolute
          inset-0
          hidden
          bg-black/15
          backdrop-blur-md
          sm:block
        "
        onClick={handleClose}
      />

      {/* ======================================================
          MAIN SHELL
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 45,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
        }}
        className="
          relative
          flex
          h-[100dvh]
          w-full
          flex-col
          overflow-hidden
          border
          border-[var(--border)]
          bg-[var(--surface)]
          shadow-[0_35px_100px_rgba(0,0,0,0.18)]
          sm:h-[min(860px,94vh)]
          sm:max-w-3xl
          sm:rounded-[30px]
        "
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <header
          className="
            relative
            z-30
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-[var(--border)]
            bg-[var(--surface)]
            px-4
            py-3
            sm:px-5
          "
        >
          {/* BRAND */}

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{
                rotate: 2,
                scale: 1.04,
              }}
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-1.5
                shadow-[0_8px_22px_rgba(18,63,45,0.08)]
              "
            >
              <img
                src={Logo}
                alt="ECO-MITRA"
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            </motion.div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1
                  className="
                    text-base
                    font-black
                    tracking-tight
                    text-[var(--foreground)]
                  "
                >
                  ECO-MITRA
                </h1>

                <Sparkles
                  size={14}
                  className="text-[var(--primary)]"
                />
              </div>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[var(--success)]
                    shadow-[0_0_8px_rgba(41,148,95,0.35)]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    text-[var(--muted)]
                  "
                >
                  AI Voice Assistant
                </span>
              </div>
            </div>
          </div>

          {/* CLOSE */}

          <motion.button
            type="button"
            onClick={handleClose}
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.94,
            }}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--muted)]
              shadow-[0_5px_15px_rgba(18,63,45,0.05)]
              transition-all
              duration-300
              hover:text-[var(--foreground)]
              hover:shadow-[0_9px_22px_rgba(18,63,45,0.08)]
            "
          >
            <X size={18} />
          </motion.button>
        </header>

        {/* ====================================================
            AI HERO
        ==================================================== */}

        <section
          className="
            relative
            shrink-0
            overflow-hidden
            border-b
            border-[var(--border)]
            bg-[linear-gradient(145deg,#03100a_0%,#071b12_35%,#0b3020_68%,#12523a_100%)]
            px-4
            py-7
            sm:py-8
          "
        >
          {/* LARGE AURORA */}

          <motion.div
            animate={{
              scale:
                aiState === "idle"
                  ? 1
                  : [1, 1.1, 1],
              opacity:
                aiState === "idle"
                  ? 0.18
                  : [0.16, 0.28, 0.16],
            }}
            transition={{
              duration: 2.2,
              repeat:
                aiState === "idle"
                  ? 0
                  : Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-64
              w-64
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-emerald-300/20
              blur-[90px]
            "
          />

          {/* SECOND GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-20
              h-56
              w-56
              rounded-full
              bg-teal-300/10
              blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-16
              h-52
              w-52
              rounded-full
              bg-emerald-500/10
              blur-[80px]
            "
          />

          {/* GRID */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.07]
              [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)]
              [background-size:32px_32px]
            "
          />

          {/* HERO CONTENT */}

          <div className="relative z-10 flex flex-col items-center">
            {/* LABEL */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.06]
                px-3
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-white/65
                backdrop-blur-md
              "
            >
              <Sparkles
                size={12}
                className="text-emerald-300"
              />

              Your collection assistant
            </div>

            {/* ==================================================
                VOICE ORB
            ================================================== */}

            <div
              className="
                relative
                mt-5
                flex
                h-44
                w-44
                items-center
                justify-center
              "
            >
              {/* LISTENING RINGS */}

              <AnimatePresence>
                {isListening && (
                  <>
                    <motion.div
                      initial={{
                        scale: 0.65,
                        opacity: 0,
                      }}
                      animate={{
                        scale: [
                          0.75,
                          1.2,
                          1.4,
                        ],
                        opacity: [
                          0.42,
                          0.16,
                          0,
                        ],
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.7,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="
                        absolute
                        h-40
                        w-40
                        rounded-full
                        border
                        border-teal-300/50
                        bg-teal-300/5
                      "
                    />

                    <motion.div
                      initial={{
                        scale: 0.7,
                        opacity: 0,
                      }}
                      animate={{
                        scale: [
                          0.75,
                          1.15,
                          1.3,
                        ],
                        opacity: [
                          0.35,
                          0.10,
                          0,
                        ],
                      }}
                      transition={{
                        duration: 1.7,
                        repeat: Infinity,
                        delay: 0.45,
                        ease: "easeOut",
                      }}
                      className="
                        absolute
                        h-36
                        w-36
                        rounded-full
                        border
                        border-emerald-300/40
                      "
                    />
                  </>
                )}
              </AnimatePresence>

              {/* SPEAKING RINGS */}

              <AnimatePresence>
                {isSpeaking && (
                  <>
                    <motion.div
                      initial={{
                        scale: 0.9,
                        opacity: 0,
                      }}
                      animate={{
                        scale: [
                          1,
                          1.18,
                          1,
                        ],
                        opacity: [
                          0.40,
                          0.08,
                          0.40,
                        ],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        absolute
                        h-40
                        w-40
                        rounded-full
                        border
                        border-emerald-300/50
                      "
                    />

                    <motion.div
                      initial={{
                        scale: 0.95,
                        opacity: 0,
                      }}
                      animate={{
                        scale: [
                          1,
                          1.28,
                          1,
                        ],
                        opacity: [
                          0.28,
                          0.04,
                          0.28,
                        ],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        absolute
                        h-44
                        w-44
                        rounded-full
                        border
                        border-teal-300/25
                      "
                    />
                  </>
                )}
              </AnimatePresence>

              {/* THINKING RING */}

              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{
                      scale: 0.85,
                      opacity: 0,
                    }}
                    animate={{
                      scale: [
                        0.95,
                        1.15,
                        0.95,
                      ],
                      opacity: [
                        0.20,
                        0.45,
                        0.20,
                      ],
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      absolute
                      h-40
                      w-40
                      rounded-full
                      border
                      border-white/15
                    "
                  />
                )}
              </AnimatePresence>

              {/* ORB CORE */}

              <motion.button
                type="button"
                onClick={startVoiceInput}
                animate={{
                  scale:
                    isListening
                      ? [1, 1.04, 1]
                      : 1,
                }}
                transition={{
                  duration: 0.9,
                  repeat:
                    isListening
                      ? Infinity
                      : 0,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  z-10
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-[linear-gradient(145deg,#0c3d29_0%,#18794e_52%,#35a873_100%)]
                  text-white
                  shadow-[0_20px_55px_rgba(0,0,0,0.35),0_0_45px_rgba(53,168,115,0.18)]
                  transition-transform
                  duration-300
                  hover:scale-105
                  active:scale-95
                "
              >
                {/* CORE INNER */}

                <span
                  className="
                    absolute
                    inset-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                  "
                />

                {/* ICON */}

                {isSpeaking ? (
                  <Activity
                    size={34}
                    strokeWidth={2}
                    className="
                      relative
                      z-10
                      animate-pulse
                    "
                  />
                ) : (
                  <Mic
                    size={34}
                    strokeWidth={2}
                    className="
                      relative
                      z-10
                    "
                  />
                )}

                {/* STATUS DOT */}

                <motion.span
                  animate={{
                    scale:
                      isActiveVoice
                        ? [1, 1.35, 1]
                        : 1,
                    opacity:
                      isActiveVoice
                        ? [0.8, 1, 0.8]
                        : 0.8,
                  }}
                  transition={{
                    duration: 1,
                    repeat:
                      isActiveVoice
                        ? Infinity
                        : 0,
                  }}
                  className="
                    absolute
                    bottom-4
                    right-4
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-white
                    shadow-[0_0_12px_rgba(255,255,255,0.75)]
                  "
                />
              </motion.button>
            </div>

            {/* STATE */}

            <motion.div
              key={aiState}
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="text-center"
            >
              <h2
                className="
                  text-xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                {stateTitle[aiState]}
              </h2>

              <p
                className="
                  mt-1
                  max-w-sm
                  text-xs
                  leading-5
                  text-white/60
                "
              >
                {stateDescription[aiState]}
              </p>
            </motion.div>

            {/* ==================================================
                LIVE WAVEFORM
            ================================================== */}

            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                  }}
                  className="
                    mt-5
                    flex
                    h-8
                    items-center
                    gap-1
                  "
                >
                  {waveform.map(
                    (
                      height,
                      index
                    ) => (
                      <motion.span
                        key={index}
                        animate={{
                          height: [
                            5,
                            height,
                            7,
                            height * 0.7,
                          ],
                        }}
                        transition={{
                          duration:
                            0.5 +
                            index *
                              0.025,
                          repeat:
                            Infinity,
                          delay:
                            index *
                            0.04,
                          ease: "easeInOut",
                        }}
                        className="
                          w-1
                          rounded-full
                          bg-teal-200/80
                        "
                      />
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* TRANSCRIPT */}

            <AnimatePresence>
              {isListening &&
                transcript && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                    }}
                    className="
                      mt-4
                      max-w-md
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.06]
                      px-4
                      py-2.5
                      text-center
                      text-xs
                      leading-5
                      text-white/80
                      backdrop-blur-md
                    "
                  >
                    "{transcript}"
                  </motion.div>
                )}
            </AnimatePresence>

            {/* STOP OUTPUT */}

            <div
              className="
                mt-4
                flex
                h-8
                justify-center
              "
            >
              <AnimatePresence>
                {isSpeaking && (
                  <motion.button
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    type="button"
                    onClick={stopSpeaking}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.07]
                      px-3
                      py-1.5
                      text-[10px]
                      font-bold
                      text-white/80
                      backdrop-blur-md
                      transition-all
                      hover:bg-white/10
                    "
                  >
                    <Square
                      size={10}
                      fill="currentColor"
                    />

                    Stop response
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ====================================================
            QUICK COMMANDS
        ==================================================== */}

        {messages.length <= 1 && (
          <section
            className="
              relative
              z-20
              shrink-0
              border-b
              border-[var(--border)]
              bg-[var(--surface)]
              px-4
              py-4
              sm:px-5
            "
          >
            <div className="mb-3 flex items-center gap-2">
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-[var(--border)]
                  bg-[var(--surface-soft)]
                  text-[var(--primary)]
                "
              >
                <MessageCircle
                  size={14}
                />
              </div>

              <span
                className="
                  text-xs
                  font-black
                  text-[var(--foreground)]
                "
              >
                Try asking
              </span>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-2
                sm:grid-cols-3
              "
            >
              {[
                "What is today's e-waste price?",
                "Find recyclers near me",
                "How can I create a lot?",
              ].map(
                (command) => (
                  <motion.button
                    key={command}
                    type="button"
                    onClick={() =>
                      handleExample(
                        command
                      )
                    }
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.985,
                    }}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      px-3
                      py-2.5
                      text-left
                      text-xs
                      text-[var(--foreground)]
                      shadow-[0_6px_18px_rgba(18,63,45,0.04)]
                      transition-all
                      duration-300
                      hover:shadow-[0_12px_25px_rgba(18,63,45,0.08)]
                    "
                  >
                    <span className="line-clamp-2">
                      {command}
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="
                        shrink-0
                        text-[var(--muted)]
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-[var(--foreground)]
                      "
                    />
                  </motion.button>
                )
              )}
            </div>
          </section>
        )}

        {/* ====================================================
            CHAT
        ==================================================== */}

        <div
          ref={scrollRef}
          className="
            min-h-0
            flex-1
            overflow-y-auto
            bg-[var(--background)]
            px-4
            py-5
            sm:px-5
          "
        >
          <div
            className="
              mx-auto
              max-w-2xl
              space-y-4
            "
          >
            {messages.map(
              (
                message,
                index
              ) => {
                const isUser =
                  message.role ===
                  "user";

                const isLatestAssistant =
                  !isUser &&
                  index ===
                    messages.length -
                      1 &&
                  !loading;

                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={`
                      flex
                      ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >
                    {!isUser && (
                      <motion.div
                        animate={
                          isLatestAssistant
                            ? {
                                boxShadow: [
                                  "0 5px 16px rgba(18,63,45,0.05)",
                                  "0 8px 24px rgba(24,121,78,0.14)",
                                  "0 5px 16px rgba(18,63,45,0.05)",
                                ],
                              }
                            : undefined
                        }
                        transition={{
                          duration: 2,
                          repeat:
                            isLatestAssistant
                              ? Infinity
                              : 0,
                        }}
                        className="
                          mr-2
                          mt-1
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-[var(--border)]
                          bg-[var(--surface)]
                          text-[var(--primary)]
                        "
                      >
                        <Sparkles
                          size={14}
                        />
                      </motion.div>
                    )}

                    <motion.div
                      animate={
                        isLatestAssistant
                          ? {
                              boxShadow: [
                                "0 6px 18px rgba(18,63,45,0.045)",
                                "0 10px 28px rgba(24,121,78,0.10)",
                                "0 6px 18px rgba(18,63,45,0.045)",
                              ],
                            }
                          : undefined
                      }
                      transition={{
                        duration: 2,
                        repeat:
                          isLatestAssistant
                            ? Infinity
                            : 0,
                      }}
                      className={`
                        max-w-[88%]
                        rounded-[20px]
                        px-4
                        py-3
                        text-sm
                        leading-relaxed
                        ${
                          isUser
                            ? `
                              rounded-br-md
                              bg-[linear-gradient(135deg,#07150f_0%,#0b2a1c_55%,#176343_100%)]
                              text-white
                              shadow-[0_10px_24px_rgba(3,18,12,0.16)]
                            `
                            : `
                              rounded-bl-md
                              border
                              border-[var(--border)]
                              bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface-soft)_100%)]
                              text-[var(--foreground)]
                            `
                        }
                      `}
                    >
                      {message.text}
                    </motion.div>
                  </motion.div>
                );
              }
            )}

            {/* THINKING */}

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 5,
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      text-[var(--primary)]
                    "
                  >
                    <Sparkles
                      size={14}
                    />
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      rounded-bl-md
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      px-4
                      py-3
                      shadow-[0_7px_20px_rgba(18,63,45,0.05)]
                    "
                  >
                    <div className="flex gap-1">
                      {[1, 2, 3].map(
                        (item) => (
                          <motion.span
                            key={item}
                            animate={{
                              y: [
                                0,
                                -4,
                                0,
                              ],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat:
                                Infinity,
                              delay:
                                item *
                                0.1,
                            }}
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-[var(--foreground)]
                            "
                          />
                        )
                      )}
                    </div>

                    <span
                      className="
                        text-xs
                        font-medium
                        text-[var(--muted)]
                      "
                    >
                      ECO-MITRA is thinking...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ====================================================
            INPUT DOCK
        ==================================================== */}

        <div
          className="
            relative
            z-30
            shrink-0
            border-t
            border-[var(--border)]
            bg-[var(--surface)]
            p-3
            sm:p-4
          "
        >
          <motion.div
            animate={{
              boxShadow:
                inputFocused ||
                input.trim()
                  ? "0 12px 35px rgba(18,63,45,0.11)"
                  : "0 7px 22px rgba(18,63,45,0.06)",
            }}
            className="
              mx-auto
              flex
              max-w-2xl
              items-center
              gap-1.5
              rounded-[20px]
              border
              border-[var(--border)]
              bg-[linear-gradient(135deg,var(--surface)_0%,var(--surface-soft)_100%)]
              p-1.5
              transition-all
              duration-300
            "
          >
            {/* INPUT */}

            <input
              value={input}
              onChange={(event) =>
                setInput(
                  event.target.value
                )
              }
              onFocus={() =>
                setInputFocused(true)
              }
              onBlur={() =>
                setInputFocused(false)
              }
              onKeyDown={(event) => {
                if (
                  event.key ===
                    "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask ECO-MITRA..."
              className="
                min-w-0
                flex-1
                bg-transparent
                px-3
                text-sm
                font-medium
                text-[var(--foreground)]
                outline-none
                placeholder:text-[var(--muted)]
              "
            />

            {/* MIC */}

            <motion.button
              type="button"
              onClick={
                startVoiceInput
              }
              whileTap={{
                scale: 0.9,
              }}
              className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                transition-all
                duration-300
                ${
                  isListening
                    ? `
                      bg-[linear-gradient(145deg,#0b4f3a,#188b67)]
                      text-white
                      shadow-[0_8px_22px_rgba(24,139,103,0.25)]
                    `
                    : `
                      border
                      border-transparent
                      text-[var(--foreground)]
                      hover:border-[var(--border)]
                      hover:bg-[var(--surface)]
                      hover:shadow-[0_7px_18px_rgba(18,63,45,0.06)]
                    `
                }
              `}
            >
              <Mic size={17} />
            </motion.button>

            {/* SEND */}

            <motion.button
              type="button"
              onClick={() =>
                sendMessage()
              }
              disabled={
                !input.trim() ||
                loading
              }
              whileTap={{
                scale: 0.9,
              }}
              className="
                relative
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                bg-[linear-gradient(145deg,#07150f,#0b2a1c,#176343)]
                text-white
                shadow-[0_8px_20px_rgba(3,18,12,0.18)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_11px_25px_rgba(3,18,12,0.24)]
                disabled:cursor-not-allowed
                disabled:opacity-25
              "
            >
              <Send size={16} />
            </motion.button>

            {/* MUTE */}

            <motion.button
              type="button"
              onClick={toggleMute}
              whileTap={{
                scale: 0.9,
              }}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-transparent
                text-[var(--muted)]
                transition-all
                duration-300
                hover:border-[var(--border)]
                hover:bg-[var(--surface)]
                hover:text-[var(--foreground)]
              "
            >
              {mute ? (
                <VolumeX size={17} />
              ) : (
                <Volume2 size={17} />
              )}
            </motion.button>
          </motion.div>

          <p
            className="
              mt-2
              text-center
              text-[9px]
              font-medium
              text-[var(--muted-foreground)]
            "
          >
            Press Enter to send · Tap the
            microphone to speak
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AIChatbot;