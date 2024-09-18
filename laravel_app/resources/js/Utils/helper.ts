export const encodeBase64 = (input: string): string => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    return btoa(String.fromCharCode(...data));
};

export const decodeBase64 = (input: string): string => {
    const binaryString = atob(input);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
};
