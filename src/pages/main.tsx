import { FC, useEffect, useState } from "react";
import { PreviewVideoComponent } from "../components/preview-video";
import { SlideComponent } from "../components/slides";
import { LabelComponent } from "../components/labels";
import { slideColors } from "../consts";

export const MainPage: FC = () => {
  const [activePart, setActivePart] = useState<number>(-1);
  const [parts, setParts] = useState<{ label: string; range: number[] }[]>([]);
  const [ranges, setRanges] = useState<number[][]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    setParts([
      { label: 'Hey, Andi', range: [10, 50] },
      { label: 'Wonderful!', range: [90, 130] },
    ]);
  }, []);
  useEffect(() => {
    setRanges(parts.map(part => part.range));
    setLabels(parts.map(part => part.label));
  }, [parts])

  return (
    <div className="flex bg-[#092c10] w-full h-fit px-10 py-16 flex-col">
      <div className="flex w-full">
        <div className="flex items-center">
          <span className="px-5 py-3 w-fit h-fit -rotate-90 rounded-md border-2 border-[#42ff3b] text-[#42ff3b]">
            VIDEO
          </span>
        </div>
        <div className="flex">
          {Array(4).fill(0).map((_, index) => <PreviewVideoComponent key={`preview${index}`} preview={null} />)}
        </div>
      </div>
      <SlideComponent active={activePart} propLengths={[68, 80, 140]} ranges={ranges} setRanges={setRanges} />
      <div className="flex w-full">
        <div className="flex items-center px-2">
          <span className="px-5 py-3 w-fit h-fit -rotate-90 rounded-md border-2 border-[#42ff3b] text-[#42ff3b]">
            TEXT
          </span>
        </div>
        <div className="flex">
          <div className="-ml-1 table-row">
            {labels.map((label, index) => <LabelComponent key={`label${index}`} active={index === activePart} onClick={() => setActivePart(activePart === index ? -1 : index)} label={label} color={slideColors[index % slideColors.length]} />)}
          </div>
        </div>
      </div>
    </div>
  )
}