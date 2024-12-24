import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Handles file uploads by saving the file to the specified directory.
 * 
 * @param {File | Buffer} file - The file to be uploaded, either a `File` or `Buffer`.
 * @param {string} [uploadDir='public/bin'] - The directory where the file will be uploaded (relative to the project root).
 * @returns {Promise<{ success: boolean; url?: string; error?: string }>} - The result of the upload.
 */
export async function uploadForServer(
    file: File | Buffer,
    uploadDir: string = 'public/bin'
): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!(file instanceof Buffer) && !(file instanceof File)) {
        return { success: false, error: 'No valid file provided' };
    }

    try {
        // If it's a File, convert it to a Buffer
        let buffer: Buffer;
        if (file instanceof File) {
            const bytes = await file.arrayBuffer();
            buffer = Buffer.from(bytes);
        } else {
            buffer = file;
        }

        // Define the full path to the upload directory
        const dirPath = join(process.cwd(), uploadDir);

        // Ensure the directory exists, creating it if necessary
        await mkdir(dirPath, { recursive: true });

        // If it's a File, sanitize its name
        let sanitizedFileName: string;
        if (file instanceof File) {
            sanitizedFileName = file.name
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/[^a-zA-Z0-9.-]/g, ''); // Remove non-alphanumeric characters except dots and hyphens
        } else {
            sanitizedFileName = 'uploaded-file'; // Default name for buffer uploads
        }

        // Generate a unique file name and path
        const uniqueFileName = `${uuidv4()}-${sanitizedFileName}`;
        const filePath = join(dirPath, uniqueFileName);

        // Write the file to the directory
        await writeFile(filePath, buffer);
        console.log(`File uploaded to ${filePath}`);

        // Generate the URL to access the uploaded file
        const url = `/${uploadDir.split('/').slice(1).join('/')}/${uniqueFileName}`;

        return { success: true, url };
    } catch (error) {
        console.error('File upload failed:', error);
        return { success: false, error: 'File upload failed' };
    }
}
