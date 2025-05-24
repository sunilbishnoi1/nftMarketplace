import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const projectId = process.env.REACT_APP_FILEBASE_IPFS_ACCESS_KEY;
const projectSecret = process.env.REACT_APP_FILEBASE_IPFS_SECRET_KEY;

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

export const uploadToIPFS = async (file: File) => {
    try {
        // Convert File to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Generate a unique key for the file
        const key = `${Date.now()}-${file.name}`;
        
        const command = new PutObjectCommand({
            Bucket: 'nft-marketplace-ipfs',
            Key: key,
            Body: uint8Array,
            ContentType: file.type,
        });

        await client.send(command);
        
        // Return the Filebase IPFS gateway URL
        return `https://ipfs.filebase.io/ipfs/${key}`;
    } catch (error) {
        console.error('Error uploading to Filebase:', error);
        throw error;
    }
};

export const getIPFSGatewayURL = (url: string) => {
    // If it's already a Filebase URL, return as is
    if (url.includes('filebase.com') || url.includes('filebase.io')) {
        return url;
    }
    // If it's an IPFS hash, convert to Filebase gateway URL
    if (url.includes('ipfs://')) {
        const hash = url.replace('ipfs://', '');
        return `https://ipfs.filebase.io/ipfs/${hash}`;
    }
    return url;
};

export const listAllIPFSObjects = async () => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: 'nft-marketplace-ipfs',
        });
        const response = await client.send(command);
        return response.Contents?.map(obj => ({
            key: obj.Key,
            url: `https://ipfs.filebase.io/ipfs/${obj.Key}`,
        })) || [];
    } catch (error) {
        console.error('Error listing objects from Filebase:', error);
        return [];
    }
}; 