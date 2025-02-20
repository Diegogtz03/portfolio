import { create } from "zustand";

export interface MouseDistanceStore {
  distance: number;
  x: number;
  y: number;
  targetRef: React.RefObject<HTMLElement> | null;
  setDistance: (distance: number) => void;
  setTargetRef: (ref: React.RefObject<HTMLElement> | null) => void;
  setX: (x: number) => void;
  setY: (y: number) => void;
}

const useMouseDistanceStore = create<MouseDistanceStore>((set) => ({
  distance: 0,
  x: 0,
  y: 0,
  targetRef: null,

  setDistance: (distance) => set(() => ({ distance })),
  setTargetRef: (ref) => set(() => ({ targetRef: ref })),
  setX: (x: number) => set(() => ({ x })),
  setY: (y: number) => set(() => ({ y })),
}));

export default useMouseDistanceStore;