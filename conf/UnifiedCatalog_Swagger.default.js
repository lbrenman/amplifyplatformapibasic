module.exports = {
	// The configuration settings for the OAS2 flow-node: Amplify Unified Catalog APIs
	pluginConfig: {
		'@axway/api-builder-plugin-fn-swagger': {
			'UnifiedCatalog_Swagger': {
				// It is possible to override URI options when constructing
				// outbound requests to this service.
				uri: {
					// protocol: 'https',
					// host: 'hostname',
					// port: 443,
					// basePath: '/api'
				}
			}
		}
	},
	// The following authorization credentials needed to use this service.
	// Please follow this guide to manually configure these credentials:
	// https://docs.axway.com/bundle/api-builder/page/docs/developer_guide/credentials/index.html
	authorization: {
		credentials: {
			'Amplify Unified Catalog APIs Bearer': {
				type: 'apiKey',
				key: null
			}
		}
	}
};
