import SlideDeck from "@/components/deck/SlideDeck";
import { slides } from "@/data/slides";

export default function Page() {
  return <SlideDeck slides={slides} />;
}