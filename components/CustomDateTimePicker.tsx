import { createElement, useState } from "react";
import { Platform, StyleProp, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
    value: Date;
    onChange: any;
}

export default function CustomDateTimePicker({ value, onChange }: Props) {
    const [date, setDate] = useState(new Date(value));
    if (!['android', 'ios'].includes(Platform.OS))
        return createElement('input', {
            type: 'date',
            value: date.toISOString().split("T")[0],
            onChange: (event) => {
                setDate(new Date(event.target?.value ?? Date.now()))
                onChange(new Date(event.target?.value ?? Date.now()))
            },
            style: { padding: 5, borderRadius: 5, fontFamily: "sans-serif" }
        })
    return <DateTimePicker value={value} onChange={(event) => {
        setDate(new Date(event.nativeEvent?.timestamp ?? Date.now()))
        onChange(new Date(event.nativeEvent?.timestamp ?? Date.now()))
    }} />
}