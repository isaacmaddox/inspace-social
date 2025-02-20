import { Checkmark, EditCircle, LetterMark, NoPhone } from "../components/icons";

export default function FeatureList() {
   return (
      <div className="feature-list-container">
         <LetterMark style={{ maxWidth: "150px" }} />
         <ul className="feature-list" role="list">
            <li>
               <p className="text-bold">
                  <Checkmark height={"24"} width={"24"} />
                  Choose what you want to see
               </p>
               <p className="text-sm text-muted">
                  On InSpace, you choose what you see. We don't have a recommendation engine. It's a feature, not a bug.
               </p>
            </li>
            <li>
               <p className="text-bold">
                  <NoPhone height={"24"} width={"24"} />
                  No more doomscrolling
               </p>
               <p className="text-sm text-muted">
                  When you use InSpace, you only see what you ask to. No recommendation engine: a feature, not a bug.
               </p>
            </li>
            <li>
               <p className="text-bold">
                  <EditCircle height={"24"} width={"24"} />
                  Customizable Posts
               </p>
               <p className="text-sm text-muted">InSpace posts support Markdown, so you can write in your own style.</p>
            </li>
         </ul>
      </div>
   );
}
