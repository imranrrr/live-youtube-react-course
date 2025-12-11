export default function InputField({label, type, name, value, handleChange}){
    return (
        <div className="input-field">
            <label>
                {label}
            </label>
            
            <br/>
            <input className="input-field-input" type={type} name={name}
            value={value} onChange={handleChange} />
        </div>
    )
}