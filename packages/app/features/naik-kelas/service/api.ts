
import { ApiResponse, getUserJWT, STAGING_API_URL } from 'app/utils/helper'
import axios from 'axios';

export const uploadFile = async (file: any) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${STAGING_API_URL}/upload`, formData, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getUserJWT()}`
            }
        });

        console.log('Response:', response.data);
        return response.data; // Return the actual data, not a Promise
    } catch (e) {
        if (e.response) {
            console.error('Response Error:', e.response.data);
            console.error('Response Status:', e.response.status);
            console.error('Response Headers:', e.response.headers);

            // Handle Set-Cookie if available
            const setCookieHeader = e.response.headers['set-cookie'];
            if (setCookieHeader) {
                const accessTokenCookie = setCookieHeader.find(cookie => cookie.startsWith('accessToken='));
                if (accessTokenCookie) {
                    const accessToken = accessTokenCookie.split(';')[0].split('=')[1];
                    console.log('Extracted Access Token:', accessToken);
                }
            }
        } else if (e.request) {
            console.error('Request Error (No response received):', e.request);
        } else {
            console.error('Error Message:', e.message);
        }

        console.error('Error Config:', e.config);

        // Check if e.toJSON exists before calling it
        if (typeof e.toJSON === 'function') {
            console.error('Error Details (toJSON):', e.toJSON());
        } else {
            console.error('Error Details:', e);
        }

        // Avoid using `throw e` to prevent unhandled errors, unless you want it to bubble up
        return null;
    }
};

