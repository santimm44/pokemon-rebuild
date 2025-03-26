'use client'

import React, { createContext, useContext, useState } from "react"

interface Context {
    searchPokemon: string,
    setSearchPokemon: (pokemon: string) => void
}

const SearchContext = createContext<Context>({
    searchPokemon: "ditto",
    setSearchPokemon: (pokemon: string) => ""
})

export function AppWrapper({children}: {children: React.ReactNode}){
    const [searchPokemon, setSearchPokemon]= useState("ditto");

    return(
        <SearchContext.Provider value={{searchPokemon, setSearchPokemon}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useAppContext() {
    return useContext(SearchContext)
}