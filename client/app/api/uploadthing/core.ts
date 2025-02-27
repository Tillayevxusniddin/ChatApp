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



// import { authOptions } from "@/lib/auth-options";
// import { getServerSession } from "next-auth";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

// const f = createUploadthing();

// export const ourFileRouter = {
//     imageUploader: f({ image: { maxFileSize: "4MB" } })
//         .middleware(async () => {
//             const token = await getServerSession(authOptions);
//             if (!token) {
//                 throw new UploadThingError("UnAuthorized"); 
//             }
//             return { token };
//         })
//         // @ts-expect-error
//         .onUploadComplete(async ({ file }) => {
//             return file.ufsUrl; 
//         }),
// } satisfies FileRouter;

// export type OurFileRouterType = typeof ourFileRouter;

import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async () => {
            const session = await getServerSession(authOptions);
            if (!session) {
                throw new UploadThingError("Unauthorized"); 
            }
            return { user: session.user }; 
        })
        .onUploadComplete(async ({ file }) => {
            return { fileUrl: file.ufsUrl }; 
        }),
} satisfies FileRouter;

export type OurFileRouterType = typeof ourFileRouter;
