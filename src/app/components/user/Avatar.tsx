import "@/_css/_components/avatar.css";

export default function Avatar({ username }: { username: string }) {
   return <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>;
}
