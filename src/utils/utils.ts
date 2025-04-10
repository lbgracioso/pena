/**
 * Generates a RFC4122 version 4 compliant UUID -- same as crypto.randomUUID().
 * It uses crypto.randomUUID() if available and acts as a
 * fallback for environments where it is not available.
 */
export const generateId = (): string => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
