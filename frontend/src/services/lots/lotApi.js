// import { auth } from "../../config/firebase";

// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5003";

// const getAuthToken = async () => {
//   const user = auth.currentUser;

//   if (!user) {
//     throw new Error(
//       "User is not authenticated"
//     );
//   }

//   return await user.getIdToken();
// };

// const createLot = async (lotData) => {
//   const token = await getAuthToken();

//   const response = await fetch(
//     `${API_URL}/api/lots`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type":
//           "application/json",

//         Authorization:
//           `Bearer ${token}`,
//       },

//       body: JSON.stringify(lotData),
//     }
//   );

//   const data =
//     await response.json();

//   if (!response.ok) {
//     throw new Error(
//       data.message ||
//         "Failed to create lot"
//     );
//   }

//   return data;
// };

// const uploadLotPhoto = async (
//   lotId,
//   file
// ) => {
//   const token =
//     await getAuthToken();

//   const formData =
//     new FormData();

//   formData.append(
//     "photo",
//     file
//   );

//   const response =
//     await fetch(
//       `${API_URL}/api/lots/${lotId}/photos`,
//       {
//         method: "POST",

//         headers: {
//           Authorization:
//             `Bearer ${token}`,
//         },

//         body: formData,
//       }
//     );

//   const data =
//     await response.json();

//   if (!response.ok) {
//     throw new Error(
//       data.message ||
//         "Failed to upload photo"
//     );
//   }

//   return data;
// };

// const finalizeLot = async (lotId, token) => {
//   const response = await fetch(
//     `${API_URL}/api/lots/${lotId}/finalize`,
//     {
//       method: "POST",

//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(
//       data.message ||
//       "Failed to finalize lot."
//     );
//   }

//   return data;
// };

// export {
//   createLot,
//   uploadLotPhoto,
//   finalizeLot,
// };


import { auth } from "../../config/firebase";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5003";

const getAuthToken = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "User is not authenticated"
    );
  }

  return await user.getIdToken();
};

const createLot = async (lotData) => {
  const token = await getAuthToken();

  const response = await fetch(
    `${API_URL}/api/lots`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(lotData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to create lot"
    );
  }

  return data;
};

const uploadLotPhoto = async (
  lotId,
  file
) => {
  const token = await getAuthToken();

  const formData = new FormData();

  formData.append(
    "photo",
    file
  );

  const response = await fetch(
    `${API_URL}/api/lots/${lotId}/photos`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to upload photo"
    );
  }

  return data;
};

const finalizeLot = async (lotId) => {
  const token = await getAuthToken();

  const response = await fetch(
    `${API_URL}/api/lots/${lotId}/finalize`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to finalize lot"
    );
  }

  return data;
};

 const getLots = async () => {
  const token = await getAuthToken();

  const response = await fetch(
    `${API_URL}/api/lots`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch lots"
    );
  }

  return data;
};

const getLotById = async (lotId) => {
  const token = await getAuthToken();

  const response = await fetch(
    `${API_URL}/api/lots/${lotId}`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch lot"
    );
  }

  return data;
};

export {
  createLot,
  uploadLotPhoto,
  finalizeLot,
  getLots,
  getLotById,
};