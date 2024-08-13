import { FC } from "react";

export const LabelComponent: FC<{ active: boolean, label: string, onClick: () => void, color: string }> = ({ active, label, onClick, color }) => {
  return (
    <div className="table-cell">
      <div
        className={`relative w-56 h-20 border-2 border-green-400 cursor-pointer rounded-md content-center mx-3 duration-300 hover:scale-105 ${active ? 'bg-green-400 text-black' : 'text-green-400'}`}
        onClick={onClick}
      >
        {label}
        <div className="w-4 h-4 rounded-full absolute top-0 -mt-2 ml-3" style={{ backgroundColor: color }}></div>
      </div>
    </div>
  )
}
