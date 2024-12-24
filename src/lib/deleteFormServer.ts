import { unlink } from 'fs/promises';
import { join } from 'path';

interface DeleteFileResult {
    success: boolean;
    message: string;
}

/**
 * Deletes a file from the specified directory on the server.
 *
 * @param fileName - The name of the file to delete.
 * @param directory - The directory where the file is located (default is 'public2').
 * @returns A promise that resolves with the result of the file deletion operation.
 */
export async function deleteFileFromServer(
    fileName: string,
    directory: string = 'public2'
): Promise<DeleteFileResult> {
    if (!fileName) {
        return { success: false, message: 'File name is required' };
    }

    try {
        // Define the full path to the file
        const filePath = join(process.cwd(), directory, fileName);

        // Delete the file
        await unlink(filePath);
        console.log(`File deleted: ${filePath}`);

        return { success: true, message: 'File deleted successfully' };
    } catch (error) {
        console.error(`Error deleting file: ${error}`);
        return { success: false, message: 'Error deleting file' };
    }
}
