export type CloudProps = {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
};

export type CloudImageProps = CloudProps & {
  src: string;
  width: number;
  height: number;
};

export type PodiumType = { 
  name: string; 
  xp: number; 
  ghost: string 
};

export type TableRow = {
  name: string;
  xp: number;
  tag?: string;
  id: string;
  dept: string;
};

export type ControlType = {
  type: 'joystick' | 'button';
  left: number;
  top: number;
  label: string;
  key: string;
};

export type TabType = {
  label: string;
  key: string;
}; 