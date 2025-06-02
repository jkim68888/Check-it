import { Priority } from "./Priority";

export type PrioritySelectProps = {
  item: Priority;
  selectedItem: Priority | null;
  onPress: (item: Priority) => void;
}