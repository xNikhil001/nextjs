import create from 'zustand'

const useStore = create(set => ({
  coins: [],
  setCoins: function(data){
    set({coins:data})
  }
}));

export default useStore;