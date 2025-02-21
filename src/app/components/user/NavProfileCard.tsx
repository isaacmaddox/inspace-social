import { Session } from "@/_actions/auth";
import Avatar from "./Avatar";
import "@/_css/_components/profile-card.css";
import Link from "next/link";

export default function NavProfileCard({ user, onClick }: { user: Session; onClick?: () => void }) {
   return (
      <Link href={`/user/${user.handle}`} className="profile-card" role="button" onClick={onClick}>
         <Avatar username={user.displayName} />
         <span>
            <p className="text-normal text-bold">{user.displayName}</p>
            <small className="text-sm text-muted">{user.email}</small>
         </span>
      </Link>
   );
}
