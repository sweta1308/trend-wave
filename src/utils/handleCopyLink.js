import { toast } from "react-toastify";

export const handleCopyLink = (postId) => {
  navigator.clipboard
    .writeText(`https://trend-wave.vercel.app/post/${postId}`)
    .then(() => {
      console.log("Link copied to clipboard!");
      toast.success("Link copied successfully!");
    })
    .catch((error) => {
      console.error("Failed to copy link to clipboard", error);
      toast.success("Failed to copy link...Try again.");
    });
};
