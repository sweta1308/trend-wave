export const handleShare = async (_id) => {
  try {
    await navigator.share({
      title: "Trend wave",
      text: "Check out this post",
      url: `https://trend-wave.vercel.app/post/${_id}`,
    });
  } catch (error) {
    console.error("Error sharing:", error);
  }
};
