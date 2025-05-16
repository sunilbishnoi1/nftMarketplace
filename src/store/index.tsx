import { createGlobalState } from 'react-hooks-global-state'

export interface NftType {
  id: string | number;
  owner: string;
  image: string;
  title: string;
  description: string;
  price: string | number; 
  // Add other NFT props, e.g., metadata, tokenId, etc.
}

interface GlobalState {
  modal: string;
  updateModal: string;
  showModal: string; 
  alert: { show: boolean; msg: string; color: string };
  loading: { show: boolean; msg: string };
  connectedAccount: string;
  nft: NftType | null; // Use NftType for now but we might have to change it later
  nfts: NftType[]; // Using NftType array for now but we might have to change it later
  transactions: any[]; // Define TransactionType when structure is known
  contract: any | null; // Define ContractType if using ethers.js or similar
}

const initialState: GlobalState = {
  modal: 'scale-0',
  updateModal: 'scale-0',
  showModal: 'scale-0',
  alert: { show: false, msg: '', color: '' },
  loading: { show: false, msg: '' },
  connectedAccount: '',
  nft: null,
  nfts: [],
  transactions: [],
  contract: null,
};

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState(initialState);

const setAlert = (msg:string, color = 'green') => {
  setGlobalState('loading', {show:false, msg: ''}); 
  setGlobalState('alert', { show: true, msg, color });
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: '', color: '' });
  }, 6000);
};

const setLoadingMsg = (msg:string) => {
  setGlobalState('loading', { show: true, msg });
};

const truncate = (text:string, startChars:number, endChars:number, maxLength:number): string => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars);
    const end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength && start.length < (maxLength - end.length)) { 
      start = start + '.';
    }
    return start + end;
  }
  return text;
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setAlert,
  setLoadingMsg,
  truncate,
};