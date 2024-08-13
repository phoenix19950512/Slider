import { FC } from "react";

export const PreviewVideoComponent: FC<{ preview: any }> = props => {
  return (
    <div className="mx-3 border-2 border-[#42ff3b] border-dashed rounded-md h-32 w-56">
      <img src={props.preview} alt="Preview" className="w-full h-full" />
    </div>
  )
}