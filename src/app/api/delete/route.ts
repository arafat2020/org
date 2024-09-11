import { unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
        return NextResponse.json({ success: false, message: 'File name is required' }, { status: 400 });
    }

    try {
        // Define the path to the file in the /public/bin/ directory
        const filePath = join(process.cwd(), 'public2', fileName);

        // Delete the file
        await unlink(filePath);
        console.log(`File deleted: ${filePath}`);

        return NextResponse.json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
        console.error(`Error deleting file: ${error}`);
        return NextResponse.json({ success: false, message: 'Error deleting file' }, { status: 500 });
    }
}
