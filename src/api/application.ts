import axios from "axios";
import {getApplicationsResourceEndpoints} from "../configs/endpoints.ts";

export const getApplicationDetails = (appId:string|null) : Promise<any> => {
    return axios.get(
        `${getApplicationsResourceEndpoints().applications}${appId}`,
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
        getApplicationsResourceEndpoints().authenticators,
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
        getApplicationsResourceEndpoints().identityProviders,
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

export const updateAuthenticationSequence = (requestBody: any, appId: string|null) : Promise<any> => {
    return axios.patch(
        `${getApplicationsResourceEndpoints().applications}${appId}`,
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