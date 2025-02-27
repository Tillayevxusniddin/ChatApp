// import { authOptions } from "@/lib/auth-options";
// import { getServerSession } from "next-auth";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

// const f = createUploadthing();

// export const ourFileRouter = {
//     imageUploader: f({ image: {maxFileSize: '4MB'}})
//     .middleware(async () => {
//         const token = await getServerSession(authOptions)
//         if (!token) {
//             throw new UploadThingError('UnAuthorized')
//         }
//         return { token };
//     })
//     .onUploadComplete( async ({ metadata, file }) => {
//         return { file, metadata};
//     }),
// } satisfies FileRouter

// export type ourFileRouter = typeof ourFileRouter

import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async () => {
            const token = await getServerSession(authOptions);
            if (!token) {
                throw new UploadThingError("UnAuthorized"); 
            }
            return { token };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { file, metadata }; 
        }),
} satisfies FileRouter;

export type OurFileRouterType = typeof ourFileRouter;
