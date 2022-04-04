export type Habit = {
    id: number,
    name: string,
    days: Array<number>
}

export type TodayHabit = {
    id: number,
    name: string,
    done: boolean,
    currentSequence: number,
    highestSequence: number
}

export type HistoryHabit = {
    id: number,
    name: string,
    date: string,
    weekDay: number,
    historyId: number,
    done: boolean
}

export type Historyc = {
    day: string,
    habits: Array<HistoryHabit>
}