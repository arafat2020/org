import { initTRPC, TRPCError } from "@trpc/server";
import { appRouter } from ".";
import { auth } from "@/auth/helper";
import { UserRole } from "@/lib/userRole";
const t = initTRPC.create()

export const route = t.router
export const procedure = t.procedure
export const adminProcedure = procedure.use(async ({ctx, next}) => {
    const isAuth = await auth()
    if (isAuth !== null && isAuth.user.role !== UserRole.VISITOR) {
        return next({
            ctx:{
                user: isAuth.user
            }
        })
    } else {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
})