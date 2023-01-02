import create from 'zustand'

interface UiStore {
  isChatOpen: boolean
  openChat: () => void
  closeChat: () => void
}

const useUiStore = create<UiStore>((set) => ({
  isChatOpen: false,

  openChat: () => set(() => ({ isChatOpen: true })),
  closeChat: () => set(() => ({ isChatOpen: false })),
}))

export default useUiStore
