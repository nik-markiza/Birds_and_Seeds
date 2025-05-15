import { create } from 'zustand';

const currentYear = `${new Date().getFullYear()}`;

const defaultOption = {
  type: 'All',
  auction: 'Ending soon',
  transmission: 'All',
  startDate: '1900',
  endDate: currentYear,
};

type Options = {
  type: string;
  auction: string;
  transmission: string;
  startDate: string;
  endDate: string;
};

type OptionsState = {
  options: Options;
  setOptions: (user: Options) => void;
  clearOptions: () => void;
};

export const optionsStore = create<OptionsState>((set) => ({
  options: defaultOption,
  setOptions: (options) => set({ options }),
  clearOptions: () => set({ options: defaultOption }),
}));
