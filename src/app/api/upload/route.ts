import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path to the /public/bin/ directory
    const dirPath = join(process.cwd(), 'public2', 'bin');

    // Ensure the directory exists, creating it if necessary
    await mkdir(dirPath, { recursive: true });

    // Generate a unique file name and path
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const filePath = join(dirPath, uniqueFileName);

    // Write the file to the /public/bin/ directory
    await writeFile(filePath, buffer);
    console.log(`File uploaded to ${filePath}`);

    // Generate the URL to access the uploaded file
    const url = `/bin/${uniqueFileName}`;

    return NextResponse.json({ success: true, url });
}
