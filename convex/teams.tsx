import {v} from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeams=query({
    args:{email:v.string()},
    handler:async(ctx,args)=>{
    const result=await ctx.db.query('teams').filter(q=>q.eq(q.field('createby'),args.email)).collect();
     return result;
    },
})

export const createTeam=mutation({
    args:{teamName:v.string(),createby:v.string()},
    handler:async(ctx, args)=>{
        const result=await ctx.db.insert('teams',args)
        return result
    }
})