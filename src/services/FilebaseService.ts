import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const projectId = process.env.REACT_APP_FILEBASE_IPFS_ACCESS_KEY;
const projectSecret = process.env.REACT_APP_FILEBASE_IPFS_SECRET_KEY;
const bucketName = process.env.REACT_APP_FILEBASE_BUCKET_NAME || "nft-marketplace-ipfs";
const gatewayUrl = process.env.REACT_APP_IPFS_GATEWAY_URL || "https://ipfs.filebase.io/ipfs";

if (!projectId || !projectSecret) {
    throw new Error('Filebase credentials are not configured');
}

const client = new S3Client({
    region: 'us-east-1',
    endpoint: 'https://s3.filebase.com',
    credentials: {
        accessKeyId: projectId,
        secretAccessKey: projectSecret,
    },
    forcePathStyle: true,
});

export const uploadFileToIPFS = async (fileOrBuffer: File | Buffer | string, key: string, contentType: string) => {
    try {
        let body;
        if (fileOrBuffer instanceof File) {
            const arrayBuffer = await fileOrBuffer.arrayBuffer();
            body = new Uint8Array(arrayBuffer);
        } else if (typeof fileOrBuffer === 'string') {
            body = Buffer.from(fileOrBuffer);
        } else {
            body = fileOrBuffer;
        }

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: body,
            ContentType: contentType,
        });

        await client.send(command);

        const getObjectCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        const objectData = await client.send(getObjectCommand);
        const cid = objectData.Metadata ? objectData.Metadata['cid'] : null;

        if (!cid) {
            throw new Error("Failed to retrieve CID from Filebase");
        }

        const url = `${gatewayUrl}/${cid}`;
        return { cid, url };
    } catch (error) {
        console.error('Error uploading file to Filebase:', error);
        throw error;
    }
};

/**
 * Uploads an image to IPFS via Filebase
 * @param file The image file to upload
 * @returns Object containing CID, Gateway URL, and the generated Key
 */
// Uploads an image to IPFS via Filebase
export const uploadNFTImage = async (file: File) => {
    const key = `images/${Date.now()}-${file.name}`;
    const result = await uploadFileToIPFS(file, key, file.type);
    return { ...result, key };
};

/**
 * Uploads NFT metadata JSON to IPFS via Filebase
 * @param metadata The metadata object (compliant with ERC721 metadata standard)
 * @returns Object containing CID and Gateway URL of the metadata file
 */
export const uploadNFTMetadata = async (metadata: object) => {
    const jsonString = JSON.stringify(metadata);
    const key = `metadata/${Date.now()}-metadata.json`;
    return await uploadFileToIPFS(jsonString, key, 'application/json');
};

/**
 * High-level function to handle the full NFT upload process
 * 1. Upload Image
 * 2. Create Metadata with Image URI
 * 3. Upload Metadata
 * @returns The Metadata URI (e.g., ipfs://<CID> or gateway URL) to be used for minting
 */
export const uploadNFT = async (file: File, name: string, description: string, attributes: any[] = []) => {
    const imageUpload = await uploadNFTImage(file);

    const metadata = {
        name,
        description,
        image: `ipfs://${imageUpload.cid}`, // Standard IPFS URI
        external_url: imageUpload.url, // Gateway URL as fallback/external link
        attributes,
    };

    const metadataUpload = await uploadNFTMetadata(metadata);

    return metadataUpload.url;
};

export const getIPFSGatewayURL = (cid: string) => {
    return `${gatewayUrl}/${cid}`;
};

