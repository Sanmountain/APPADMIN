import axios from "axios";

// NOTE app admin API
export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/AppAdmin`,
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },

  (error) => {
    console.log(error);
  },
);

// NOTE 알림톡 API
export const alimtokInstance = axios.create({
  baseURL: `${process.env.REACT_APP_ALIMTOK_API_URL}`,
});

alimtokInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },

  (error) => {
    console.log(error);
  },
);
