import axios from "axios";

export const getApplicationDetails = (appId:string) : Promise<any> => {
    return axios.get(
        `https://localhost:9443/api/server/v1/applications/${appId}`,
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
}

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

export const getIdentityProviders = () : Promise<any> => {
    return axios.get(
        'https://localhost:9443/api/server/v1/identity-providers?filter=isEnabled eq "true"&requiredAttributes=federatedAuthenticators',
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

export const updateAuthenticationSequence = (requestBody: any, appId: string) : Promise<any> => {
    return axios.patch(
        `https://localhost:9443/t/carbon.super/api/server/v1/applications/${appId}`,
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