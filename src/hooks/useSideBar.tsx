import React from 'react'
import { create } from 'zustand'

type Sidebar = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

export const useSideBar = create<Sidebar>((set) => ({
    isOpen: false,
    onOpen() {
        set({
            isOpen: true
        })
    },
    onClose() {
        set({
            isOpen: false
        })
    },
}))