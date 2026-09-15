import prisma from "../../config/prisma.js";

const syncUser = async (firebaseUser, body) => {
  const {
    mode = "login",
    firstName,
    lastName,
    phoneNumber,
    city,
    language,
  } = body;

  const firebaseUid = firebaseUser.uid;

  // Check whether this Firebase identity already has an account
  const existingUser = await prisma.user.findUnique({
    where: {
      firebaseUid,
    },
  });

  // =========================
  // LOGIN
  // =========================
  if (mode === "login") {
    if (!existingUser) {
      throw new Error(
        "No account found. Please create an account first."
      );
    }

    return {
      user: existingUser,
      isNewUser: false,
    };
  }

  // =========================
  // SIGNUP
  // =========================
  if (mode === "signup") {
    if (existingUser) {
      throw new Error(
        "An account already exists. Please sign in instead."
      );
    }

    // Required signup information
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !phoneNumber?.trim() ||
      !city?.trim() ||
      !language
    ) {
      throw new Error(
        "All required profile information must be provided."
      );
    }

    // Prevent duplicate mobile numbers
    const existingPhone = await prisma.user.findUnique({
      where: {
        phoneNumber: phoneNumber.trim(),
      },
    });

    if (existingPhone) {
      throw new Error(
        "This mobile number is already registered."
      );
    }

    const user = await prisma.user.create({
      data: {
        firebaseUid,

        email: firebaseUser.email || null,

        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber.trim(),

        operatingLocation: city.trim(),
        preferredLanguage: language,

        // Collector signup currently
        role: "COLLECTOR",
      },
    });

    return {
      user,
      isNewUser: true,
    };
  }

  throw new Error("Invalid authentication mode.");
};

export default {
  syncUser,
};