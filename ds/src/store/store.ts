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
}

export const useDrawerState = create<DrawerState>((set) => ({
    isOpen: false,
    open: () => set((state) => ({ isOpen: true})),
    close: () => set((state) => ({ isOpen: false })),
    flip: () => set((state) => ({ isOpen: !state.isOpen})),
}))

export const useClassState = create<ClassState>((set) => ({
    classID: 0,
    change: (id) => set((state) => ({classID: id}))
}))