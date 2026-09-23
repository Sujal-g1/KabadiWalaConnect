import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Mic,
  Send,
  X,
  Square,
  Activity,
  VolumeX,
  Volume2,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import Logo from "../../assets/images/logo.webp";

import {
  sendAIMessage,
} from "../../services/ai/aiApi";


const AIChatbot = () => {

  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Namaste! I'm ECO-MITRA. I can help you with e-waste prices, collections, recyclers and more.",
    },
  ]);

  const [input, setInput] = useState("");

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

  const scrollRef =
    useRef(null);


  // --------------------------------
  // AUTO SCROLL
  // --------------------------------

  useEffect(() => {

    if (scrollRef.current) {

      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });

    }

  }, [messages, loading]);


  // --------------------------------
  // STOP SPEAKING
  // --------------------------------

  const stopSpeaking = () => {

    if (window.speechSynthesis) {

      window.speechSynthesis.cancel();

      setIsSpeaking(false);

    }

  };


  // --------------------------------
  // SPEAK RESPONSE
  // --------------------------------

  const speakResponse = (
    text,
    language = "Hindi"
  ) => {

    stopSpeaking();

    if (mute) {
      return;
    }

    if (!window.speechSynthesis) {
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


  // --------------------------------
  // SEND MESSAGE
  // --------------------------------

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
        text: textToProcess,
      },
    ];

    setMessages(newMessages);

    setInput("");

    setLoading(true);

    try {

      const result =
        await sendAIMessage(
          textToProcess
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


  // --------------------------------
  // VOICE INPUT
  // --------------------------------

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
          event.results[i][0].transcript;

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


  // --------------------------------
  // MUTE
  // --------------------------------

  const toggleMute = () => {

    if (!mute) {

      window.speechSynthesis?.cancel();

      setIsSpeaking(false);

    }

    setMute(!mute);

  };


  // --------------------------------
  // CLOSE
  // --------------------------------

  const handleClose = () => {

    stopSpeaking();

    navigate(-1);

  };


  // --------------------------------
  // EXAMPLE COMMAND
  // --------------------------------

  const handleExample = (
    text
  ) => {

    setInput(text);

    sendMessage(text);

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
        sm:bg-black/30
        sm:p-4
      "
    >

      {/* BACKDROP */}

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
          backdrop-blur-sm
          sm:block
        "
        onClick={handleClose}
      />


      {/* MAIN */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 280,
        }}
        className="
          relative
          flex
          h-[100dvh]
          w-full
          flex-col
          overflow-hidden

          bg-[var(--background)]

          sm:h-[min(820px,94vh)]
          sm:max-w-2xl
          sm:rounded-3xl
          sm:border
          sm:border-[var(--border)]
          sm:bg-[var(--surface)]
          sm:shadow-2xl
        "
      >

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <header
          className="
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

          <div className="flex items-center gap-3">

            <div
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                bg-[var(--accent)]
              "
            >

              <img
                src={Logo}
                alt="ECO-MITRA"
                className="
                  h-8
                  w-8
                  object-contain
                "
              />

            </div>

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >

                <h1
                  className="
                    text-base
                    font-bold
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

              <div
                className="
                  mt-0.5
                  flex
                  items-center
                  gap-1.5
                "
              >

                <motion.span
                  animate={{
                    opacity: [1, 0.4, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[var(--success)]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[var(--muted)]
                  "
                >
                  AI Voice Assistant
                </span>

              </div>

            </div>

          </div>


          <button
            type="button"
            onClick={handleClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              text-[var(--muted)]
              transition
              hover:bg-[var(--surface-soft)]
              hover:text-[var(--foreground)]
              active:scale-95
            "
          >
            <X size={19} />
          </button>

        </header>


        {/* ========================= */}
        {/* AI HERO */}
        {/* ========================= */}

        <section
          className="
            relative
            shrink-0
            overflow-hidden
            border-b
            border-[var(--border)]
            bg-[var(--surface)]
            px-4
            py-6
          "
        >

          {/* DECORATIVE GRID */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-30
              [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)]
              [background-size:32px_32px]
            "
          />


          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-center
            "
          >

            {/* AI LABEL */}

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--surface-soft)]
                px-3
                py-1.5
              "
            >

              <Sparkles
                size={12}
                className="text-[var(--primary)]"
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-widest
                  text-[var(--muted)]
                "
              >
                Your collection assistant
              </span>

            </div>


            {/* ORB */}

            <div
              className="
                relative
                flex
                h-36
                w-36
                items-center
                justify-center
              "
            >

              {/* OUTER RING */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-1
                  rounded-full
                  border
                  border-dashed
                  border-[var(--primary)]/30
                "
              />


              {/* PULSE */}

              <AnimatePresence>

                {(isListening ||
                  isSpeaking ||
                  loading) && (

                  <motion.div
                    initial={{
                      scale: 0.8,
                      opacity: 0,
                    }}
                    animate={{
                      scale: [
                        0.95,
                        1.35,
                        0.95,
                      ],
                      opacity: [
                        0.25,
                        0.05,
                        0.25,
                      ],
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                    }}
                    className="
                      absolute
                      h-28
                      w-28
                      rounded-full
                      bg-[var(--primary)]
                      blur-2xl
                    "
                  />

                )}

              </AnimatePresence>


              {/* CORE */}

              <motion.button
                type="button"
                onClick={startVoiceInput}
                animate={
                  isListening
                    ? {
                        scale: [
                          1,
                          1.08,
                          1,
                        ],
                      }
                    : {
                        scale: 1,
                      }
                }
                transition={{
                  duration: 0.8,
                  repeat:
                    isListening
                      ? Infinity
                      : 0,
                }}
                className={`
                  relative
                  z-10
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full

                  border-4

                  transition-all

                  active:scale-95

                  ${
                    isListening
                      ? "border-[var(--danger)] bg-[var(--danger)] text-white shadow-[0_0_50px_rgba(220,38,38,0.35)]"
                      : isSpeaking
                        ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_0_50px_rgba(23,107,77,0.35)]"
                        : "border-[var(--accent)] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_0_40px_rgba(23,107,77,0.25)] hover:scale-105"
                  }
                `}
              >

                {isSpeaking ? (

                  <Activity
                    size={32}
                    className="animate-pulse"
                  />

                ) : (

                  <Mic size={32} />

                )}

              </motion.button>

            </div>


            {/* STATUS */}

            <div className="mt-3 text-center">

              <h2
                className="
                  text-lg
                  font-bold
                  text-[var(--foreground)]
                "
              >

                {isListening
                  ? "I'm listening..."
                  : isSpeaking
                    ? "ECO-MITRA is speaking"
                    : loading
                      ? "ECO-MITRA is thinking..."
                      : "Tap the mic to speak"}

              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[var(--muted)]
                "
              >

                {isListening
                  ? "Speak naturally in Hindi or English"
                  : isSpeaking
                    ? "You can stop the response anytime"
                    : "Ask me anything about your e-waste work"}

              </p>

            </div>


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
                      max-w-sm
                      rounded-xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface-soft)]
                      px-4
                      py-2.5
                      text-center
                      text-xs
                      text-[var(--foreground)]
                    "
                  >
                    "{transcript}"
                  </motion.div>

                )}

            </AnimatePresence>


            {/* WAVEFORM */}

            <AnimatePresence>

              {isListening && (

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="
                    mt-4
                    flex
                    h-6
                    items-center
                    gap-1
                  "
                >

                  {[...Array(11)].map(
                    (_, index) => (

                      <motion.span
                        key={index}
                        animate={{
                          height: [
                            4,
                            10 +
                              Math.random() *
                                15,
                            5,
                          ],
                        }}
                        transition={{
                          duration:
                            0.45 +
                            index * 0.03,
                          repeat: Infinity,
                          delay:
                            index * 0.04,
                        }}
                        className="
                          w-1
                          rounded-full
                          bg-[var(--danger)]
                        "
                      />

                    )
                  )}

                </motion.div>

              )}

            </AnimatePresence>


            {/* STOP */}

            <div className="mt-3 h-7">

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
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-[var(--border)]
                      bg-[var(--surface-soft)]
                      px-3
                      py-1.5
                      text-[10px]
                      font-bold
                      text-[var(--foreground)]
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


        {/* ========================= */}
        {/* QUICK COMMANDS */}
        {/* ========================= */}

        {messages.length <= 1 && (

          <section
            className="
              shrink-0
              border-b
              border-[var(--border)]
              bg-[var(--surface)]
              px-4
              py-4
            "
          >

            <div
              className="
                mb-3
                flex
                items-center
                gap-2
              "
            >

              <MessageCircle
                size={15}
                className="text-[var(--primary)]"
              />

              <span
                className="
                  text-xs
                  font-semibold
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

                  <button
                    key={command}
                    type="button"
                    onClick={() =>
                      handleExample(
                        command
                      )
                    }
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface-soft)]
                      px-3
                      py-2.5
                      text-left
                      text-xs
                      text-[var(--foreground)]
                      transition
                      hover:border-[var(--primary)]
                      hover:bg-[var(--accent)]
                    "
                  >

                    <span>
                      {command}
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="
                        shrink-0
                        text-[var(--muted)]
                        transition
                        group-hover:text-[var(--primary)]
                      "
                    />

                  </button>

                )
              )}

            </div>

          </section>

        )}


        {/* ========================= */}
        {/* CHAT */}
        {/* ========================= */}

        <div
          ref={scrollRef}
          className="
            min-h-0
            flex-1
            overflow-y-auto
            bg-[var(--background)]
            px-4
            py-4
          "
        >

          <div
            className="
              mx-auto
              max-w-xl
              space-y-3
            "
          >

            {messages.map(
              (message, index) => (

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
                  className={`
                    flex
                    ${
                      message.role ===
                      "user"
                        ? "justify-end"
                        : "justify-start"
                    }
                  `}
                >

                  <div
                    className={`
                      max-w-[86%]
                      rounded-2xl
                      px-4
                      py-3
                      text-sm
                      leading-relaxed

                      ${
                        message.role ===
                        "user"
                          ? "rounded-br-md bg-[var(--primary)] text-[var(--primary-foreground)]"
                          : "rounded-bl-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
                      }
                    `}
                  >

                    {message.text}

                  </div>

                </motion.div>

              )
            )}


            {/* THINKING */}

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
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-[var(--muted)]
                "
              >

                <div
                  className="
                    flex
                    gap-1
                  "
                >

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
                          repeat: Infinity,
                          delay:
                            item * 0.1,
                        }}
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-[var(--primary)]
                        "
                      />

                    )
                  )}

                </div>

                ECO-MITRA is thinking...

              </motion.div>

            )}

          </div>

        </div>


        {/* ========================= */}
        {/* INPUT */}
        {/* ========================= */}

        <div
          className="
            shrink-0
            border-t
            border-[var(--border)]
            bg-[var(--surface)]
            p-3
            sm:p-4
          "
        >

          <div
            className="
              mx-auto
              flex
              max-w-xl
              items-center
              gap-2
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface-soft)]
              p-1.5
            "
          >

            <input
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={(event) => {

                if (
                  event.key ===
                  "Enter"
                ) {

                  sendMessage();

                }

              }}
              placeholder="Ask ECO-MITRA..."
              className="
                min-w-0
                flex-1
                bg-transparent
                px-2
                text-sm
                text-[var(--foreground)]
                outline-none
                placeholder:text-[var(--muted)]
              "
            />


            <button
              type="button"
              onClick={startVoiceInput}
              className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                transition
                active:scale-95

                ${
                  isListening
                    ? "bg-[var(--danger)] text-white"
                    : "text-[var(--primary)] hover:bg-[var(--surface)]"
                }
              `}
            >

              <Mic size={17} />

            </button>


            <button
              type="button"
              onClick={() =>
                sendMessage()
              }
              disabled={
                !input.trim() ||
                loading
              }
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]
                text-[var(--primary-foreground)]
                transition
                hover:opacity-90
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >

              <Send size={16} />

            </button>


            <button
              type="button"
              onClick={toggleMute}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-[var(--muted)]
                transition
                hover:bg-[var(--surface)]
                hover:text-[var(--foreground)]
              "
            >

              {mute ? (
                <VolumeX size={17} />
              ) : (
                <Volume2 size={17} />
              )}

            </button>

          </div>

        </div>

      </motion.div>

    </div>

  );

};

export default AIChatbot;