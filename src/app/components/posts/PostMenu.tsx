import { Edit, Trash } from "../icons";
import "@/_css/_components/post-menu.css";

export default function PostMenu({ deletePostFn }: { deletePostFn: () => void }) {
   return (
      <div className="post-menu">
         <PostMenuButton onClick={() => {}}>
            <Edit />
            Edit
         </PostMenuButton>
         <PostMenuButton onClick={deletePostFn} className="destructive">
            <Trash />
            Delete Post
         </PostMenuButton>
      </div>
   );
}

function PostMenuButton({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className?: string }) {
   return (
      <button className={`btn-stripped post-menu-button ${className}`} onClick={onClick}>
         {children}
      </button>
   );
}
