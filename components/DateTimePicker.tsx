import { createElement, useState } from "react";

interface Props {
    value: Date;
    onChange: any;
}

export default function DateTimePicker({ value, onChange }: Props) {
    const [date, setDate] = useState(new Date(value));

    return createElement('input', {
        type: 'date',
        value: date.toISOString().split("T")[0],
        onChange: (event) => {
            setDate(new Date(event.target.value))
            onChange(new Date(event.target.value))
        },
        style: { padding: 5, border: "2px solid #677788", borderRadius: 5, fontFamily: "sans-serif" }
    })
}