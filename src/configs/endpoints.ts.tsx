const serverHost = 'https://localhost:9443/t/carbon.super';

export const getApplicationsResourceEndpoints = () => {

    return {
        applications: `${serverHost}/api/server/v1/applications/`,
        authenticators: `${serverHost}/api/server/v1/configs/authenticators`,
        identityProviders: `${serverHost}/api/server/v1/identity-providers?filter=isEnabled eq "true"`
        //        identityProviders: `${serverHost}/api/server/v1/identity-providers?filter=isEnabled eq "true"&requiredAttributes=federatedAuthenticators`
    };

};