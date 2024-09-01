import { toast } from "sonner"

export async function upload(file: File | undefined): Promise<string | undefined> {
    if (!file) return undefined
    toast("Uploading")
    try {
        const data = new FormData()
        data.set("file", file)
        const res = await fetch("/api/upload", {
            method: "POST",
            body: data
        }).then(res => res.json())
        toast.success("File Uploaded")
        return res.url
    } catch (error) {
        console.log(error);
        toast.error("Fail to upload file")
        return undefined
    }
}