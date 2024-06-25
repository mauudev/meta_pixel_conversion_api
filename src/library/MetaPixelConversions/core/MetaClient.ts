import { EventRequest, ServerEvent, FacebookAdsApi, EventResponse } from 'facebook-nodejs-business-sdk'
import { MetaClientInitializationError } from './Exceptions'

export class MetaConversionsClient {
	private static instance: MetaConversionsClient
	private _api: FacebookAdsApi | undefined
	private _metaAccessToken: string
	private _pixelId: string
	private _testEventCode: string | undefined
	private _initialized: boolean = false

	private constructor(metaAccessToken: string, pixelId: string, testEventCode: string | undefined) {
		this._metaAccessToken = metaAccessToken
		this._pixelId = pixelId
		this._testEventCode = testEventCode
	}

	static getInstance(
		metaAccessToken: string,
		pixelId: string,
		testEventCode: string | undefined
	): MetaConversionsClient {
		if (!MetaConversionsClient.instance) {
			if (!metaAccessToken || !pixelId) {
				throw new MetaClientInitializationError('MetaConversionsClient: Missing required parameters')
			}
			MetaConversionsClient.instance = new MetaConversionsClient(metaAccessToken, pixelId, testEventCode)
		}
		return MetaConversionsClient.instance
	}

	init(): void {
		if (this._initialized) {
			return
		}
		this._api = FacebookAdsApi.init(this._metaAccessToken)
		this._initialized = true
	}

	async sendEvent(eventData: ServerEvent | ServerEvent[]): Promise<EventResponse> {
		this.init()
		const eventsData = Array.isArray(eventData) ? eventData : [eventData]
		const eventRequest = new EventRequest(
			this._metaAccessToken,
			this._pixelId,
			eventsData,
			undefined, // partner id
			this._testEventCode
		)

		return await eventRequest.execute()
	}
}
