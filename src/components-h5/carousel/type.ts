export enum SLIDER_TYPE {
  normal = 'normal',
  swipe = 'swipe',
}
export interface Data extends CarouselProps {
  items: any[];
  slideIndex?: number;
  style?: object;
  dotStyle?: object;
  dotActiveStyle?: object;
}
interface carousel {
  slideTo: (index: number) => void;
  ref: any;
}

export interface CarouselProps {
  autoplay?: any;
  pagination?: any;
  touchable?: boolean;
  loop?: boolean;
  duration?: number;
  showIndicators?: boolean;
  indicatorDots?: boolean;
  onInit?: (carousel: carousel) => void;
  onChange?: (params: any) => void;
  children?: any;
  width?: number | string;
  height?: number | string;
  style?: any;
  dotStyle?: any;
  dotActiveStyle?: any;
  dotColGap?: number;
  dotOffset?: number;
  type?: SLIDER_TYPE;
  cardWidth?: number | string;
}
