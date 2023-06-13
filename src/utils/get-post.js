import axios from "axios";

export const getPost = async (postID) => {
  try {
    const { data, status } = await axios.get(`/api/posts/${postID}`);
    if (status === 200 || status === 201) {
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};
