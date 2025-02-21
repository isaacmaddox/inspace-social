import { Session } from "@/_actions/auth/session";
import Avatar from "./Avatar";
import "@/_css/_components/profile-card.css";

export default function NavProfileCard({ user, onClick }: { user: Session; onClick?: () => void }) {
   return (
      <div className="profile-card" role="button" onClick={onClick}>
         <Avatar username={user.displayName} />
         <span>
            <p className="text-normal text-bold">{user.displayName}</p>
            <small className="text-sm text-muted">{user.email}</small>
         </span>
      </div>
   );
}
