import { MouseEvent } from "react";

type btnProp = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  content: string
}
const Button = ({ onClick, content }: btnProp) => {
  return <button className="w-full text-white text-lg bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 me-2 mt-9 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    onClick={onClick}>{content}</button>
}

export default Button

