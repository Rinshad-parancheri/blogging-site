type Props = {
  placeHolder: string;
  className: string
}

const Input = ({ placeHolder, className }: Props) => {
  return (
    <div>
      <input className={`w-8 h-3 border-black cursor-pointer ${className ? className : ''}`} type="text" placeholder={placeHolder} />
    </div>
  )
}

export default Input
