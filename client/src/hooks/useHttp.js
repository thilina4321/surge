import axios from "axios";

const useHttp = ({ url, method, body }) => {
  const doRequest = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      global.setIsLoading(true);
      const response = await axios({
        url: "http://localhost:4000" + url,
        method,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: body,
      });

      global.setIsLoading(false);

      return { data: response.data };
    } catch (err) {
      global.setIsLoading(false);
      global.showAlert(err.response.data.message);

      return { error: true };
    }
  };

  return doRequest;
};

export default useHttp;
