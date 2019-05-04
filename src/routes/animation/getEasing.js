import { Easing } from 'react-native';
import { SLIDE_HORIZONTAL, SLIDE_VERTICAL, FADE_VERTICAL, CUBE, EXPAND, FADE } from './animationTypes';

export default function getEasing(animationType) {
  switch (animationType) {
    case SLIDE_HORIZONTAL:
    case SLIDE_VERTICAL:
      return Easing.bezier(0.2833, 0.99, 0.31833, 0.99);
    case FADE_VERTICAL:
      return Easing.in(Easing.poly(4));
    case FADE:
      return Easing.in(Easing.poly(4));
    case EXPAND:
      return Easing.in(Easing.poly(4));
    case CUBE:
    default:
      return Easing.inOut(Easing.ease);
  }
}
