'use client'

import React, { createContext, useContext, useState } from "react"

interface Context {
    searchPokemon: Santiago,
    setSearchPokemon: (pokemon: Santiago) => void
}

export type Santiago = string | number

const SearchContext = createContext<Context>({
    searchPokemon: "",
    setSearchPokemon: (pokemon: Santiago) => ""
})

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [searchPokemon, setSearchPokemon] = useState<Santiago>("ditto");

    return (
        <SearchContext.Provider value={{ searchPokemon, setSearchPokemon }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useAppContext() {
    return useContext(SearchContext)
}