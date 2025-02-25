interface FormFieldProps {
   label?: string | undefined;
   name: string;
   type: string;
   placeholder?: string | undefined;
   defaultValue?: string | undefined;
   onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
   error?: string[] | undefined;
   autoFocus?: boolean;
   maxLength?: number;
}

export default function FormField({
   label,
   name,
   type = "text",
   placeholder,
   defaultValue,
   onChange,
   error,
   autoFocus = false,
   maxLength,
}: FormFieldProps) {
   return (
      <div className="form-field">
         <label htmlFor={name}>{label}</label>
         {type === "textarea" ? (
            <textarea
               id={name}
               name={name}
               placeholder={placeholder}
               defaultValue={defaultValue}
               autoFocus={autoFocus}
               onChange={onChange}
               maxLength={maxLength}
            />
         ) : (
            <input
               type={type}
               id={name}
               name={name}
               placeholder={placeholder}
               defaultValue={defaultValue}
               onChange={onChange}
               autoFocus={autoFocus}
               maxLength={maxLength}
            />
         )}
         {error &&
            error.map((e, i) => (
               <p className="field-error" key={i}>
                  {e}
               </p>
            ))}
      </div>
   );
}
