import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ButtonDarkMode from '@/components/ui/button-dark-mode'
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Helllo</Button>
      <ButtonDarkMode />
      <Input placeholder="Hello" />
      <Image src={'/images/be.jpg'} alt="hele" width={200} height={200} quality={100}/>
    </main>
  );
}
