import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid';


export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const path = join(process.cwd(), 'public','bin', uniqueFileName);  
    await writeFile(path, buffer)
    console.log(`File uploaded to ${path}`);

    // Generate the URL to access the uploaded file
    const url = `/bin/${uniqueFileName}`;
  
    return NextResponse.json({ success: true, url });
}