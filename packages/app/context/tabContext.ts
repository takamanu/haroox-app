import React, { createContext, useState, useContext } from 'react'

interface TabContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const TabContext = createContext<TabContextType>({
  activeTab: '',
  setActiveTab: () => {},
})
