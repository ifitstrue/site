import {
  FiCircle,
  FiDribbble,
  FiEye,
  FiFrown,
  FiGift,
  FiHeart,
  FiMeh,
  FiSmile,
  FiX,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { Player } from "./types";

export const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export const AVAILABLE_ICONS: { id: number; name: string; icon: IconType }[] = [
  { id: 0, name: "X", icon: FiX },
  { id: 1, name: "O", icon: FiCircle },
  { id: 2, name: "Basketball", icon: FiDribbble },
  { id: 3, name: "Eye", icon: FiEye },
  { id: 4, name: "Gift", icon: FiGift },
  { id: 5, name: "Heart", icon: FiHeart },
  { id: 6, name: "Smile", icon: FiSmile },
  { id: 7, name: "Meh", icon: FiMeh },
  { id: 8, name: "Frown", icon: FiFrown },
];

export const DEFAULT_PLAYERS: Player[] = [
  { id: 0, name: "Player 1", icon: FiX, color: "#C62828" },
  { id: 1, name: "Player 2", icon: FiCircle, color: "#1565C0" },
];

export const AVAILABLE_PLAYER_COLORS = [
  { name: "Red", value: "#C62828" },
  { name: "Blue", value: "#1565C0" },
  { name: "Green", value: "#1B6E45" },
  { name: "Purple", value: "#6A3D9A" },
  { name: "Brown", value: "#795548" },
] as const;
