import axios from "axios";
import { openNotificationWithIcon, TYPE } from "../utils/notificationToast";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 452:
        case 453:
        case 454:
        case 456:
        case 512:
        case 515:
        case 516:
          var title = error.response.data.message;
          var errors = error.response.data.errorMessages.map((e) => e.error);
          openNotificationWithIcon(TYPE.ERROR, title, errors);
          return Promise.reject({
            statusCode: error.response.status,
            title,
            errors,
          });
        case 460:
        case 513:
        case 514:
          var title = error.response.data.message;
          var errors = error.response.data.message;
          openNotificationWithIcon(TYPE.ERROR, title, errors);
          return Promise.reject({
            statusCode: error.response.status,
            title,
            errors,
          });
        default:
          var title = error.response.data.message;
          var errors = [];
          openNotificationWithIcon(TYPE.ERROR, title, errors);
          return Promise.reject({
            statusCode: error.response.status,
            title,
            errors,
          });
      }
    } else if (error.request) {
      openNotificationWithIcon(TYPE.ERROR, "Request error", error.request);
    } else {
      openNotificationWithIcon(TYPE.ERROR, "Unhandled error", error.message);
    }
  }
);

export default axiosInstance;
