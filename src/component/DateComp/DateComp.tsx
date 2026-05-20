


import { useState } from 'react';
import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type Props = {
    date: Date | undefined
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    setOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Calendar({ date, setDate, setOpenCalendar }: Props) {
    const [selected, setSelected] = useState<Date>();

    //   let footer = <p>Please pick a day.</p>;
    if (selected) {
        // footer = <p>You picked {format(selected, 'PP')}.</p>;
    }
    return (
        <div className="scale-80 border-2 border-[#8c8c8c] p-3 absolute top-7.5 left-[-30]">
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(value) => {
                    setDate(value)
                    setOpenCalendar(false)
                }}
            //   footer={footer}
            />
        </div>
    );
}




