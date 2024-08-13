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
  const [videoLengths, setVideoLengths] = useState<number[]>([]);

  useEffect(() => {
    setParts([
      { label: 'Hey, Andi', range: [10, 50] },
      { label: 'Wonderful!', range: [90, 130] },
    ]);
    setVideoLengths([68, 80, 140]);
  }, []);
  useEffect(() => {
    setRanges(parts.map(part => part.range));
    setLabels(parts.map(part => part.label));
  }, [parts]);

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const last = ranges[ranges.length - 1][1];
      const total = videoLengths.reduce((len, a) => len + a, 0);
      setParts([
        ...parts,
        { label: e.currentTarget.value, range: [(last * 2 + total) / 3, (last + 2 * total) / 3] }
      ]);
      e.currentTarget.value = '';
      setActivePart(parts.length);
    }
  }

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
      <SlideComponent active={activePart} propLengths={videoLengths} ranges={ranges} setRanges={setRanges} />
      <div className="flex w-full">
        <div className="flex items-center px-2">
          <span className="px-5 py-3 w-fit h-fit -rotate-90 rounded-md border-2 border-[#42ff3b] text-[#42ff3b]">
            TEXT
          </span>
        </div>
        <div className="flex">
          <div className="grid grid-cols-4 gap-4">
            {labels.map((label, index) => <LabelComponent key={`label${index}`} active={index === activePart} onClick={() => setActivePart(activePart === index ? -1 : index)} label={label} color={slideColors[index % slideColors.length]} />)}
            <div className="">
              <div
                className={`relative w-56 h-20 border-2 border-green-400 border-dashed cursor-pointer rounded-md content-center mx-1 duration-300 hover:scale-105 text-green-400`}
                onClick={() => setActivePart(-2)}
              >
                {activePart !== -2 ? <>Add Label</> : <>
                  <input type="text" onKeyDown={e => handleEdit(e)} className="border-0 focus-visible:outline-none px-3 py-2 text-black text-sm rounded-md" />
                </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}