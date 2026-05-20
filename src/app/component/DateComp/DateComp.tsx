"use client"

import { useState } from "react"
import { DayPicker } from "react-day-picker"

export default function Calendar() {

  const [selected, setSelected] = useState<Date>()

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}