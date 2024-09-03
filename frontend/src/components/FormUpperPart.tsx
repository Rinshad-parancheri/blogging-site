import { Link } from 'react-router-dom'

type UpperPartProp = {
  tittle: string;
  description: string;
  route: string
}

const UpperPart = ({ tittle, description, route }: UpperPartProp) => {
  return (
    <div className="upperPart px-9 mb-9">
      <div className=" text-3xl font-extrabold mb-2">{tittle}</div>
      <div className="text-center text-slate-400 text-lg">
        {description}
        <Link
          className="pl-2 underline text-black hover:text-slate-800"
          to={route}>
          Login
        </Link>
      </div>
    </div>
  )
}

export default UpperPart
