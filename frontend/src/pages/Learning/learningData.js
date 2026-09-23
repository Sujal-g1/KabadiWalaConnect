import {
  CircleHelp,
  LogIn,
  Package,
  IndianRupee,
  Recycle,
  Truck,
  WalletCards,
  ShieldCheck,
  WifiOff,
  Sparkles,
} from "lucide-react";

export const LEARNING_STEPS = [
  {
    id: "what",
    icon: CircleHelp,

    titleKey: "learning.steps.what.title",

    descriptionKey:
      "learning.steps.what.description",

    points: [
      "learning.steps.what.point1",
      "learning.steps.what.point2",
      "learning.steps.what.point3",
    ],

    voice: {
      intro:
        "learning.voice.what.intro",

      sections: [
        "learning.voice.what.explain",
        "learning.voice.what.how",
        "learning.voice.what.benefit",
        "learning.voice.what.example",
        "learning.voice.what.remember",
      ],
    },
  },

  {
    id: "login",
    icon: LogIn,

    titleKey: "learning.steps.login.title",

    descriptionKey:
      "learning.steps.login.description",

    points: [
      "learning.steps.login.point1",
      "learning.steps.login.point2",
      "learning.steps.login.point3",
    ],

    voice: {
      intro:
        "learning.voice.login.intro",

      sections: [
        "learning.voice.login.first",
        "learning.voice.login.mobile",
        "learning.voice.login.account",
        "learning.voice.login.example",
        "learning.voice.login.remember",
      ],
    },
  },

  {
    id: "lot",
    icon: Package,

    titleKey: "learning.steps.lot.title",

    descriptionKey:
      "learning.steps.lot.description",

    points: [
      "learning.steps.lot.point1",
      "learning.steps.lot.point2",
      "learning.steps.lot.point3",
    ],

    voice: {
      intro:
        "learning.voice.lot.intro",

      sections: [
        "learning.voice.lot.photo",
        "learning.voice.lot.category",
        "learning.voice.lot.weight",
        "learning.voice.lot.example",
        "learning.voice.lot.remember",
      ],
    },
  },

  {
    id: "price",
    icon: IndianRupee,

    titleKey: "learning.steps.price.title",

    descriptionKey:
      "learning.steps.price.description",

    points: [
      "learning.steps.price.point1",
      "learning.steps.price.point2",
      "learning.steps.price.point3",
    ],

    voice: {
      intro:
        "learning.voice.price.intro",

      sections: [
        "learning.voice.price.current",
        "learning.voice.price.history",
        "learning.voice.price.offers",
        "learning.voice.price.example",
        "learning.voice.price.remember",
      ],
    },
  },

  {
    id: "recycler",
    icon: Recycle,

    titleKey:
      "learning.steps.recycler.title",

    descriptionKey:
      "learning.steps.recycler.description",

    points: [
      "learning.steps.recycler.point1",
      "learning.steps.recycler.point2",
      "learning.steps.recycler.point3",
    ],

    voice: {
      intro:
        "learning.voice.recycler.intro",

      sections: [
        "learning.voice.recycler.material",
        "learning.voice.recycler.location",
        "learning.voice.recycler.compare",
        "learning.voice.recycler.example",
        "learning.voice.recycler.remember",
      ],
    },
  },

  {
    id: "handover",
    icon: Truck,

    titleKey:
      "learning.steps.handover.title",

    descriptionKey:
      "learning.steps.handover.description",

    points: [
      "learning.steps.handover.point1",
      "learning.steps.handover.point2",
      "learning.steps.handover.point3",
    ],

    voice: {
      intro:
        "learning.voice.handover.intro",

      sections: [
        "learning.voice.handover.pickup",
        "learning.voice.handover.weight",
        "learning.voice.handover.record",
        "learning.voice.handover.example",
        "learning.voice.handover.remember",
      ],
    },
  },

  {
    id: "payment",
    icon: WalletCards,

    titleKey:
      "learning.steps.payment.title",

    descriptionKey:
      "learning.steps.payment.description",

    points: [
      "learning.steps.payment.point1",
      "learning.steps.payment.point2",
      "learning.steps.payment.point3",
    ],

    voice: {
      intro:
        "learning.voice.payment.intro",

      sections: [
        "learning.voice.payment.amount",
        "learning.voice.payment.status",
        "learning.voice.payment.history",
        "learning.voice.payment.example",
        "learning.voice.payment.remember",
      ],
    },
  },

  {
    id: "safety",
    icon: ShieldCheck,

    titleKey:
      "learning.steps.safety.title",

    descriptionKey:
      "learning.steps.safety.description",

    points: [
      "learning.steps.safety.point1",
      "learning.steps.safety.point2",
      "learning.steps.safety.point3",
    ],

    voice: {
      intro:
        "learning.voice.safety.intro",

      sections: [
        "learning.voice.safety.battery",
        "learning.voice.safety.burning",
        "learning.voice.safety.acid",
        "learning.voice.safety.example",
        "learning.voice.safety.remember",
      ],
    },
  },

  {
    id: "offline",
    icon: WifiOff,

    titleKey:
      "learning.steps.offline.title",

    descriptionKey:
      "learning.steps.offline.description",

    points: [
      "learning.steps.offline.point1",
      "learning.steps.offline.point2",
      "learning.steps.offline.point3",
    ],

    voice: {
      intro:
        "learning.voice.offline.intro",

      sections: [
        "learning.voice.offline.network",
        "learning.voice.offline.saved",
        "learning.voice.offline.sync",
        "learning.voice.offline.example",
        "learning.voice.offline.remember",
      ],
    },
  },

  {
    id: "ai",
    icon: Sparkles,

    titleKey:
      "learning.steps.ai.title",

    descriptionKey:
      "learning.steps.ai.description",

    points: [
      "learning.steps.ai.point1",
      "learning.steps.ai.point2",
      "learning.steps.ai.point3",
    ],

    voice: {
      intro:
        "learning.voice.ai.intro",

      sections: [
        "learning.voice.ai.seva",
        "learning.voice.ai.photo",
        "learning.voice.ai.help",
        "learning.voice.ai.example",
        "learning.voice.ai.remember",
      ],
    },
  },
];