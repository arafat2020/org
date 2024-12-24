// Import the Prisma client instance for database operations
import prisma from "@/lib/db";

// Import procedures and routing utilities from the TRPC (Type-safe RPC) setup
import { adminProcedure, route } from "../trpc";

// Import Zod for schema validation
import { z } from "zod";

// Import a utility function to delete files from the server
import { deleteFileFromServer } from "@/lib/deleteFormServer";

// Define a TRPC route for managing bucket-related operations
export const bucketRoute = route({
    // Mutation to create a new bucket with a default name "Untitled"
    createBucket: adminProcedure.mutation(async () => {
        const created = await prisma.bucket.create({
            data: {
                name: "Untitled" // Default name for the new bucket
            }
        });
        return created; // Return the created bucket
    }),

    // Mutation to update an existing bucket's name by its ID
    updateBucket: adminProcedure.input(
        z.object({
            id: z.string().min(1),  // Validate ID is a non-empty string
            name: z.string().min(1) // Validate name is a non-empty string
        })
    ).mutation(async ({ input }) => {
        const { id, ...data } = input; // Destructure ID and other data from input
        const updated = await prisma.bucket.update({
            where: {
                id // Match the bucket by its ID
            },
            data // Update the bucket with new data
        });
        return updated; // Return the updated bucket
    }),

    // Mutation to delete a bucket and perform cleanup for associated media files
    deleteBucket: adminProcedure.input(
        z.object({
            id: z.string().min(1) // Validate ID is a non-empty string
        })
    ).mutation(async ({ input }) => {
        const deleted = await prisma.$transaction(async ctx => {
            // Find the bucket to delete, including its associated media
            const bucket = await ctx.bucket.findUnique({
                where: input,
                include: {
                    media: true // Include associated media files
                }
            });
            
            // Delete associated media files from the server
            await bucket?.media.map(async e => await deleteFileFromServer(e.url));
            
            // Delete the bucket from the database
            const cleanUp = await ctx.bucket.delete({
                where: input
            });
            return cleanUp; // Return the deleted bucket
        });
        return deleted; // Return the result of the deletion
    }),

    // Query to fetch all buckets from the database
    getAllBucket: adminProcedure.query(async () => {
        const allBucket = await prisma.bucket.findMany(); // Fetch all buckets
        return allBucket; // Return the list of buckets
    }),

    // Query to fetch a single bucket by its ID
    getBucketById: adminProcedure.input(
        z.object({
            id: z.string().min(1) // Validate ID is a non-empty string
        })
    ).query(async ({ input }) => {
        const getBucket = await prisma.bucket.findMany({ where: input }); // Fetch bucket by ID
        return getBucket; // Return the fetched bucket
    })
});
