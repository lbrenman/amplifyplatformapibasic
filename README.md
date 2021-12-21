# Using Amplify Platform API's in API Builder using Swagger

This blog post describes how to make Amplify Platform API calls in an API Builder flow.

For example, the Amplify Unified Catalog API's can be found [**here**](http://apidocs.axway.com/swagger-ui-NEW/index.html?productname=UnifiedCatalog&productversion=1.0.0&filename=swagger.json) with their swagger definition [**here**](http://apidocs.axway.com/api_documentation/UnifiedCatalog/1.0.0/swagger.json).

While you can use the REST plugin in API builder, the Swagger definition provides a more user friendly way to access the resources and parameters associated with each API.

Save the swagger definition and drop the file in the `/swagger` folder of an API Builder project and (re)start the project. First you will see an unauthorized credential entry in the Credentials tab.

![](https://i.imgur.com/OV5kTSN.png)

If you click on that you will need to use your service account clientId and clientSecret to get an access token from the token server as described [**here**](https://blog.axway.com/apis/axway-amplify-platform-api-calls). You can see that below:

![](https://i.imgur.com/VR4lJdf.png)

![](https://i.imgur.com/YicRcuR.png)

The access token will eventually expire so that is not so convenient but if you do that, then when you use the API in your flow, you will select that Credential as shown below:

![](https://i.imgur.com/A1Jzc1M.png)

Alternatively, you can ignore the Credential altogether and retrieve an access token in your flow as shown below:

![](https://i.imgur.com/JE86rRp.png)

> Note that the **X-Axway-Tenant-ID** is not required for API calls even though it is listed as a required parameter. You can put any value in there.

## Flow-Nodes

**Concatenate clientId and Secret**

```
async function code(data, logger) {
  return process.env.clientId + ':' + process.env.clientSecret;
}
```

**Base64 encode clientId and Secret**

![](https://i.imgur.com/IAnL310.png)

**PrepareGetAccessToken**

```
async function code(data, logger) {
  var qs = require('qs');

  let headers = {
	'Authorization': 'Basic '+data.b64data,
	'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  };

  let body = qs.stringify({
 	grant_type: 'client_credentials'
  });

  console.log(headers);
  console.log(body);

  return {headers,body};
}
```

> Note that I'm using the [**qs**](https://www.npmjs.com/package/qs) node package module so you'll need to install that in your API Builder project

**GetAccessToken**

![](https://i.imgur.com/LIErceD.png)

**CreateCredentials**

```
async function code(data, logger) {
  return 'Bearer '+data.GetAccessTokenResponse.body.access_token;
}
```

**GET_catalogItems**

![](https://i.imgur.com/GDC2RMv.png)

When you debug the flow, you will see the results of your platform API call (e.g. get catalog items):

![](https://i.imgur.com/LnPru9k.png)

This simple API Builder test project can be found [**here**](https://github.com/lbrenman/amplifyplatformapibasic)
