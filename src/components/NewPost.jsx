import { useAuth } from "../context/auth-context";

export const NewPost = () => {
  const { authState } = useAuth();
  return (
    <>
      <div>
        <div className="flex w-full">
          <img
            src={authState?.user?.avatarUrl}
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full"
          />
          <input className="py-[10px] px-[15px] text-sm outline-none w-[70%]" placeholder="What's happening?" />
        </div>
      </div>
    </>
  );
};