import { z } from "zod";
import { adminProcedure, procedure, route } from "../trpc";
import prisma from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const productRouter = route({
    postProduct: adminProcedure.input(z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        primaryImg: z.string().min(1),
        catagoryId: z.string().min(1),
        subCategoryId: z.string().min(1),
    })).mutation(async ({ input }) => {
        const data = await prisma.product.create({
            data: input,
            select: {
                name: true,
                id: true,
                primaryImg: true,
                showcaseImg: true,
                published: true,
                description: true,
                SubCategory: {
                    select: {
                        id: true,
                        name: true,
                        Category: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return data
    }),

    deleteProduct: adminProcedure.input(z.object({
        id: z.string(),
        origin: z.string().min(1)
    })).mutation(async ({ input }) => {
        const product = await prisma.product.findUnique({
            where: {
                id: input.id
            },
            include: {
                showcaseImg: true
            }
        })
        if (!product) return
        try {
            await fetch(`${input.origin}/api/delete?fileName=${encodeURIComponent(product.primaryImg)}`, {
                method: 'DELETE',
            });
            await product.showcaseImg.map( async e => {
                await fetch(`${input.origin}/api/delete?fileName=${encodeURIComponent(e.img)}`, {
                    method: 'DELETE',
                });
            })
        } catch (error) {
            console.log(error);
            
            throw new TRPCError({ code:"INTERNAL_SERVER_ERROR" })
        }
        const data = await prisma.$transaction(async ctx => {
            await ctx.product.delete({
                where: {
                    id: input.id
                }
            })
            await ctx.showcaseImage.deleteMany({
                where: {
                    productId: input.id
                }
            })
        })
        return data
    }),

    inactiveProduct: adminProcedure.input(z.object({
        id: z.string().min(1),
        status: z.boolean()
    })).mutation(async ({ input }) => {
        const data = await prisma.product.update({
            where: {
                id: input.id
            },
            data: {
                published: input.status
            }
        })
        return data
    }),

    getProducts: adminProcedure.input(
        z.object({
            page: z.optional(z.number())
        })
    ).query(async ({ input }) => {
        const data = await prisma.product.findMany({
            include: {
                SubCategory: true,
            },
            take: 6,
            skip: 6 * (input.page ? input.page : 0)
        })
        const count = await prisma.product.count()
        return {
            data,
            count
        }
    }),

    getProductById: procedure.input(z.object({
        id: z.string().min(1)
    })).query(async ({ input }) => {
        const data = await prisma.product.findUnique({
            where: {
                id: input.id
            },
            include: {
                showcaseImg: true
            }
        })
        return data
    }),

    updateProduct: adminProcedure.input(z.object({
        id: z.string().min(1),
        name: z.optional(z.string()),
        description: z.optional(z.string()),
        primaryImg: z.optional(z.string()),
    })).mutation(async ({ input }) => {
        const data = await prisma.product.update({
            where: {
                id: input.id
            },
            data: {
                name: input.name,
                description: input.description,
                primaryImg: input.primaryImg
            },
            include: {
                showcaseImg: {
                    select: {
                        id: true,
                        img: true
                    }
                }
            }
        })

        return data
    }),

    addShowCaseImage: adminProcedure.input(z.object({
        id: z.string().min(1),
        img: z.string().min(1)
    })).mutation(async ({ input }) => {
        const data = await prisma.showcaseImage.create({
            data: {
                img: input.img,
                productId: input.id
            }
        })
        return data
    }),

    removeShowCaseImage: adminProcedure.input(z.object({
        id: z.string().min(1),
        productId: z.string().min(1),
    })).mutation(async ({ input }) => {
        const data = prisma.showcaseImage.delete({
            where: {
                id: input.id,
                productId: input.productId
            }
        })
        return data
    }),

    setForHomePage: adminProcedure.input(z.object({
        id: z.string().min(1),
        setForHome: z.boolean()
    })).mutation(async ({ input }) => {
        const data = await prisma.product.update({
            where: {
                id: input.id
            },
            data: {
                showInHomePage: input.setForHome
            }
        })

        return data
    }),

    searchOrFilter: procedure.input(z.object({
        title: z.optional(z.string()),
        categoryID: z.optional(z.string()),
        subCategoryId: z.optional(z.string()),
    })).mutation(async ({ input }) => {
        const {
            categoryID,
            subCategoryId,
            title
        } = input
        const data = await prisma.product.findMany({
            where: {
                name: {
                    contains: title
                },
                catagoryId: categoryID,
                subCategoryId: subCategoryId
            },
            include: {
                SubCategory: true
            }
        })

        return data
    }),

    getProductForShowById: procedure.input(z.object({
        productId: z.string().min(1)
    })).mutation(async ({ input }) => {
        const product = await prisma.product.findUnique({
            where: {
                id: input.productId
            },
            include: {
                showcaseImg: true
            }
        })

        const simileProduct = await prisma.product.findMany({
            where: {
                subCategoryId: product?.subCategoryId
            },
            include: {
                SubCategory: true
            }
        })

        return {
            product,
            simileProduct
        }
    }),

    getProductForShowBySubcategory: procedure.input(z.object({
        subcategoryId: z.string().min(1),
        searchTerm: z.optional(z.string())
    })).mutation(async ({ input }) => {
        const products = await prisma.product.findMany({
            where: {
                subCategoryId: input.subcategoryId,
                name: {
                    contains: input.searchTerm
                },
                published: true
            },
            include: {
                SubCategory: {
                    include: {
                        Category: true
                    }
                }
            }
        })

        const subCategory = await prisma.subCategory.findUnique({
            where: {
                id: input.subcategoryId
            },
            include: {
                Category: true
            }
        })

        return {
            products,
            subCategory
        }
    })
})