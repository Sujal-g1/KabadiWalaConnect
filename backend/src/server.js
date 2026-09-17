import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";

import { auth } from "./config/firebase.js";
import authPlugin from "./plugins/auth.js";
import authRoutes from "./modules/auth/auth.routes.js";
import priceRoutes from "./modules/prices/price.routes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import lotRoutes from "./modules/lots/lot.routes.js";
import multipart from "@fastify/multipart";
import handoverRoutes from "./modules/handovers/handover.routes.js";

const app = Fastify({ logger: true,});

// CORS
await app.register(cors, { origin: true,});

// Authentication plugin
await app.register(authPlugin);
// cloudinary
await app.register(multipart);

await app.register( authRoutes, { prefix: "/api/auth", });
await app.register( priceRoutes, { prefix: "/api/prices", });
await app.register( aiRoutes, { prefix: "/api/ai",});
await app.register(lotRoutes,{ prefix: "/api/lots", });
await app.register(handoverRoutes, { prefix: "/api/handovers",});

// Basic health check
app.get("/api/health", async () => {
  return {
    success: true,
    message: "Kabadiwala Connect backend is running",
  };
});

// Firebase health check
app.get("/api/health/firebase", async () => {
  try {
    const firebaseUsers = await auth.listUsers(1);

    return {
      success: true,
      message: "Firebase Admin is connected",
      usersFound: firebaseUsers.users.length,
    };
  } catch (error) {
    app.log.error(error);

    return {
      success: false,
      message: "Firebase Admin connection failed",
    };
  }
});

// Start server
const startServer = async () => {
  try {
    await app.listen({
      port: 5003,
      host: "0.0.0.0",
    });

    console.log("🚀 Server running on http://localhost:5003");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();