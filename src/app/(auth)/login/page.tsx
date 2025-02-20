import AuthBackground from "@/app/components/AuthBackground";
import LoginForm from "./LoginForm";
import FeatureList from "../FeatureList";

export default function Login() {
   return (
      <>
         <FeatureList />
         <div className="auth-form-container">
            <LoginForm />
         </div>
      </>
   );
}
