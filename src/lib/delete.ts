import { toast } from "sonner";

export async function deleteFile(fileName: string) {
    try {
        const response = await fetch(`/api/delete?fileName=${encodeURIComponent(fileName)}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        console.log(result);
        
        if (response.ok) {
           toast.success("file deleted")
           return true
        } else {
           toast.success("file deletion failed")
           return false
        }
    } catch (error) {
        toast.error(`Request failed:${error}`);
        return false
    }
}

// Usage example:
// deleteFile('example.txt');
