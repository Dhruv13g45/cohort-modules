import ImageKit from "imageKit"

export const imagekit = new ImageKit({
    publicKey: process.env.IMGKIT_PUBLIC_KEY!,
    privateKey: process.env.IMGKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMGKIT_URL!
})