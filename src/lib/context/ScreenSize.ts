import { createContext } from "react";

export enum Device {
  MOBILE = "mobile",
  DESKTOP = "desktop",
  NONE = "none",
}

export const ScreenSizeContext = createContext({
  deviceType: Device.NONE,
});
