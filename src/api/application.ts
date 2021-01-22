import axios from "axios";

export const getAuthenticators = () : Promise<any> => {
    return axios.get(
        'https://localhost:9443/api/server/v1/configs/authenticators',
        {
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic YWRtaW46YWRtaW4="
            }
        }
    ).then((response) => {
        if (response.status !== 200) {
            return Promise.reject(new Error("Failed to update authentication sequence"));
        }
        return Promise.resolve(response);
    }).catch((error) => {
        return Promise.reject(error);
    });
};

export const updateAuthenticationSequence = (requestBody: any) : Promise<any> => {
    return axios.patch(
        'https://localhost:9443/t/carbon.super/api/server/v1/applications/54fb8709-6aed-4bd5-8a97-9edb7cb70049',
        requestBody,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic YWRtaW46YWRtaW4="
            }
        }
    ).then((response) => {
        if (response.status !== 200) {
            return Promise.reject(new Error("Failed to update authentication sequence"));
        }
        return Promise.resolve(response);
    }).catch((error) => {
        return Promise.reject(error);
    });
};