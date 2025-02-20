interface FormFieldProps {
   label: string;
   name: string;
   type: string;
   placeholder?: string | undefined;
   defaultValue?: string | undefined;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   error?: string[] | undefined;
   autoFocus?: boolean;
}

export default function FormField({ label, name, type = "text", placeholder, defaultValue, onChange, error, autoFocus = false }: FormFieldProps) {
   return (
      <div className="form-field">
         <label htmlFor={name}>{label}</label>
         <input type={type} id={name} name={name} placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} autoFocus={autoFocus} />
         {error &&
            error.map((e, i) => (
               <p className="field-error" key={i}>
                  {e}
               </p>
            ))}
      </div>
   );
}
