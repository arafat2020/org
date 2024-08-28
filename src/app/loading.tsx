import { Loader2 } from "lucide-react";
import Logo from "./_components/Logo";

export default function Loading() {
    return(
        <div className="w-full h-full flex justify-around items-center dark:bg-slate-950">
            <div className="w-[200px] flex flex-col items-center space-y-4">
                <Logo/>
                <Loader2 className="w-10 h-10 animate-spin"/>
            </div>
        </div>
    )
  }