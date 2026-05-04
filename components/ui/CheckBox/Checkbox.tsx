type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
}

export default function Checkbox({id, label}: CheckboxProps){
  return (
    <div className="flex items-center justify-center gap-1">
      <input type="checkbox" id={id}  />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}