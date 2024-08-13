import { FC, useEffect, useState } from "react";

import { slideColors } from "../consts";

export const SlideComponent: FC<{
  active: number;
  ranges: number[][];
  propLengths: number[];
  setRanges: React.Dispatch<React.SetStateAction<number[][]>>;
}> = ({
  active, ranges, propLengths, setRanges
}) => {
  const [totalLen, setTotalLen] = useState<string>('0\' 0"');
  const [lengths, setLengths] = useState<number[]>([]);
  const [parts, setParts] = useState<number[][]>([]);
  const [originPosition, setOriginPosition] = useState<number>(0);

  useEffect(() => {
    const total = propLengths.reduce((len, a) => len + a, 0);
    setParts(ranges.map(part => [part[0] / total * 100, part[1] / total * 100]));
    setLengths(propLengths.map(len => len / total * 100));
    setTotalLen(`${Math.ceil(total / 60)}' ${total % 60}"`);
  }, [propLengths, ranges]);

  const onDrag = (e: React.DragEvent<HTMLDivElement>, isFirst: boolean) => {
    if (!e.pageX) return;
    const total = propLengths.reduce((len, a) => len + a, 0);
    const slidebar = document.getElementById('slidebar') as HTMLDivElement;
    const parts = [...ranges];
    const newValue = parts[active][isFirst ? 0 : 1] + (e.pageX - originPosition) / slidebar.offsetWidth * total;
    if (newValue < 0 || newValue > total) return;
    if (isFirst && newValue >= parts[active][1]) return;
    if (!isFirst && newValue <= parts[active][0]) return;
    parts[active][isFirst ? 0 : 1] = newValue;
    setOriginPosition(e.pageX);
    setRanges(parts);
  }

  return (
    <div className="flex w-full px-5 items-center">
      <div className="flex bg-white flex-grow relative">
        <div className="flex w-full h-1 relative z-20" id="slidebar">
          {lengths.map((len, index) => (
            <div key={`slide${index}`} className='flex h-2 -mt-0.5 bg-transparent border-[#092c10] [&:not(:last-child)]:border-r-4' style={{ width: `${len}%` }}></div>
          ))}
        </div>
        {parts.map((part, index) => (
          <div key={`part${index}`} className={`absolute ${active === index ? 'z-10 h-2 -mt-0.5' : 'h-full'}`} style={{ left: `${part[0]}%`, width: `${part[1] - part[0]}%`, backgroundColor: slideColors[index % slideColors.length] }}></div>
        ))}
        {(() => {
          if (parts.length > active && active >= 0) {
            const part = parts[active];
            return <>
              <div
                className='absolute h-3 -mt-1 w-1.5 cursor-grab z-30 hover:contrast-50 active:contrast-50 active:cursor-grabbing'
                draggable={true}
                onDragStart={e => setOriginPosition(e.pageX)}
                onDrag={e => onDrag(e, true)}
                style={{ left: `${part[0]}%`, backgroundColor: slideColors[active % slideColors.length] }}
              ></div>
              <div
                className='absolute h-3 -mt-1 w-1.5 cursor-grab z-30 hover:contrast-50 active:contrast-50 active:cursor-grabbing'
                draggable={true}
                onDragStart={e => setOriginPosition(e.pageX)}
                onDrag={e => onDrag(e, false)}
                style={{ left: `${part[1]}%`, backgroundColor: slideColors[active % slideColors.length] }}
              ></div>
            </>
          }
          return <></>
        })()}
      </div>
      <div className="flex mr-0 h-0 w-0 border-t-[12px] border-b-[12px] border-t-transparent border-b-transparent border-r-0 border-l-white border-l-[20px]"></div>
      <div className="flex mr-0 text-white font-bold text-3xl px-2">{totalLen}</div>
    </div>
  )
}