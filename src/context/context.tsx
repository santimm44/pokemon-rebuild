'use client'

import React, { createContext, useContext, useState } from "react"
export type Santiago = string | number

interface Context {
    searchPokemon: Santiago;
    setSearchPokemon: (pokemon: Santiago) => void;
    switchOn: boolean;
    setSwitchOn: (toggle: boolean) => void;
    showFavorites: boolean
    setShowFavorites: (favorites: boolean) => void
}


const SearchContext = createContext<Context>({
    searchPokemon: "",
    setSearchPokemon: () => { },
    switchOn: false,
    setSwitchOn: () => { },
    showFavorites: false,
    setShowFavorites: () => { }
})


export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [searchPokemon, setSearchPokemon] = useState<Santiago>("ditto");
    const [switchOn, setSwitchOn] = useState<boolean>(false);
    const [showFavorites, setShowFavorites] = useState<boolean>(false)
    return (
        <SearchContext.Provider value={{ searchPokemon, setSearchPokemon, switchOn, setSwitchOn, showFavorites, setShowFavorites }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useAppContext() {
    return useContext(SearchContext)
}