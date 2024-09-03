import { ChangeEvent } from "react";

interface labbledInput {
  label: string;
  placeHolder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const LabbledInput = ({ label, placeHolder, type, onChange }: labbledInput) => {
  return <div>
    <label className="block my-2 text-lg font-semibold text-black">{label}</label>
    <input
      onChange={onChange}
      type={type || 'text'} id="first_name"
      className="bg-gray-50 text-lg border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      placeholder={placeHolder}
      required />
  </div>
}

export default LabbledInput
