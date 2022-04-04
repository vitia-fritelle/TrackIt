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