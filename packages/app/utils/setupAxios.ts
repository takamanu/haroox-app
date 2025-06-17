// // import { Modal } from "antd";
// // import { resetUserData } from "../redux/auth/action";
// // import store from "../redux/store";

// export default function setupAxios(axios, dispatch) {
//   // setup axios interceptors
//   axios.interceptors.request.use(
//     (request) => {
//       const token = store.getState().auth.user.token;
//       if (!request.url.includes("auth") && token) {
//         request.headers["Authorization"] = token;
//       }
//       return request;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axios.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       const isAuthRoute = error.response.config.url.includes("auth");
//       if (
//         !isAuthRoute &&
//         (error.response.status === 401 ||
//           error.response.statusText === "Unauthorized")
//       ) {
//         Modal.error({
//           title: "Session Anda telah berakhir,",
//           content: "Anda akan diarahkan ke Halaman Login !",
//           onOk: () => {
//             dispatch(resetUserData());
//             Modal.destroyAll();
//           },
//         });
//       }
//       return Promise.reject(error.response);
//     }
//   );
// }
