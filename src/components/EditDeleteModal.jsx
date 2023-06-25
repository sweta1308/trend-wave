export const EditDeleteModal = ({ editPost, deletePost }) => {
  return (
    <div className="text-sm bg-white p-3 w-[120px] shadow-lg absolute right-2 top-12">
      <p className="my-2 cursor-pointer hover:text-primary-color">
        <i onClick={editPost} className="fa-solid fa-pencil"></i> Edit Post
      </p>
      <hr />
      <p
        className="my-2 cursor-pointer hover:text-primary-color"
        onClick={deletePost}
      >
        <i className="fa-solid fa-trash-can"></i> Delete Post
      </p>
    </div>
  );
};
