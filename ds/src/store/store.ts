import { PrismaClient } from "@prisma/client"
import { create } from "zustand"

const prisma = new PrismaClient()

type DrawerState = {
    isOpen: boolean
    open: () => void
    close: () => void
    flip: () => void
}

type ClassState = {
    classID: number
    change: (id:number) => void
    highlight: string | null
    setHighlight: (id: string | null) => void
}

export const useDrawerState = create<DrawerState>((set) => ({
    isOpen: false,
    open: () => set((state) => ({ isOpen: true})),
    close: () => set((state) => ({ isOpen: false })),
    flip: () => set((state) => ({ isOpen: !state.isOpen})),
}))

export const useClassState = create<ClassState>((set) => ({
    classID: 0,
    change: (id) => set((state) => ({classID: id})),
    highlight: null,
    setHighlight: (id) => set(() => ({ highlight: id }))
}))


interface AbsenceState {
    map: Record<string, boolean>;
    set: (id:string, state:boolean) => void;
    multiSet: (list: {id:string, state:boolean}[]) => void;
}

export const useAbsenceState = create<AbsenceState>((set) => ({
    map: {},
    set: (id,state) => 
        set((s) => ({ map: { ...s.map, [id]: state } })),
    multiSet: (list) =>
        set(() => ({
        map: Object.fromEntries(list.map((x) => [x.id, x.state])),
    })),
}))
