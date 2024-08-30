"use client"
import { Loader2 } from "lucide-react";
import Logo from "../_components/Logo";
import { FormEvent, useState } from "react";

export default function Loading() {
    const [file, setFile] = useState<File>()
    const onSubmit = async (e:FormEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!file) return
        try {
            const data = new FormData()
            data.set("file", file)
            const res = await fetch("api/upload", {
                method: "POST",
                body: data
            })
            console.log(await res.json());
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className="w-full h-full flex justify-around items-center dark:bg-slate-950">
            <form onSubmit={onSubmit}>
                <input type="file" name="" id="" onChange={e => setFile(e.target.files?.[0])} />
                <button type="submit">Upload</button>
            </form>
            <img src="./bin/f426e47d-d906-4802-82db-827c5e85cf50-IMG_1545.jpg" alt="img" />
        </div>
    )
}