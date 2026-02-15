import { createGlobalState } from 'react-hooks-global-state'

export interface NftType {
  id: number;
  owner: string;
  creator: string;
  cost: string; 
  title: string;
  description: string;
  metadataURI: string;
  timestamp: string | number;
  image: string;
}

interface GlobalState {
  modal: string;
  updateModal: string;
  showModal: string; 
  alert: { show: boolean; msg: string; color: string };
  loading: { show: boolean; msg: string };
  connectedAccount: string;
  nft: NftType | null; 
  nfts: NftType[]; 
  transactions: any[]; 
  contract: any | null; 
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