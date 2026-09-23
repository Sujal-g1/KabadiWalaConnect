import aiController from "./ai.controller.js";

// const aiRoutes = async (app) => {
//   app.post(
//     "/chat",
//     {
//       preHandler: async (
//         request,
//         reply
//       ) => {
//         await app.authenticate(
//           request,
//           reply
//         );
//       },
//     },
//     aiController.chat
//   );
// };


const aiRoutes = async (app) => {
  app.post(
    "/chat",
    aiController.chat
  );
};


export default aiRoutes;