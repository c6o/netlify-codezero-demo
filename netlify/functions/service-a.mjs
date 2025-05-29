import fetch from 'node-fetch'
import { CodezeroAgent } from '@c6o/codezero-agent'

const agent = new CodezeroAgent();

const api = async (request, context) => {
    const response = await fetch('http://service-a.tutorial:8080/', { agent });

    if (!response.ok) {
        return new Response('Failed to fetch data', {
            status: response.status,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    }

    return new Response(await response.text(), {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
};

export const config = {
  path: ["/service-a"]
};

export default api;