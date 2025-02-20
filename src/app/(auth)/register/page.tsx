import RegisterForm from "./RegisterForm";
import FeatureList from "../FeatureList";

export default function Login() {
   return (
      <>
         <FeatureList />
         <div className="auth-form-container">
            <RegisterForm />
         </div>
      </>
   );
}
