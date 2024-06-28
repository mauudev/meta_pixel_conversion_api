import { CustomData, UserData, ServerEvent } from 'facebook-nodejs-business-sdk'
import { BaseException } from './Exceptions'
import { v4 as uuid } from 'uuid'

/**
 * Event Data Schema
 */

type ContentSchema = {
	id?: string
	quantity?: number
	item_price?: number
	title?: string
	description?: string
	category?: string
	brand?: string
	delivery_category?: string
}

export interface UserDataSchema {
	emails?: string[]
	phones?: string[]
	genders?: string[]
	first_names?: string[]
	last_names?: string[]
	dates_of_birth?: string[]
	cities?: string[]
	states?: string[]
	zips?: string[]
	countries?: string[]
	external_ids?: string[]
	client_ip_address?: string
	client_user_agent?: string
	fbc?: string
	fbp?: string
	subscription_id?: string
	fb_login_id?: string
	lead_id?: string
	f5first?: string
	f5last?: string
	fi?: string
	dobd?: string
	dobm?: string
	doby?: string
	madid?: string
	anon_id?: string
	app_user_id?: string
}

export interface CustomDataSchema {
	[key: string]: any
	value?: number
	currency?: string
	content_name?: string
	content_category?: string
	content_ids?: string[]
	contents?: ContentSchema[]
	content_type?: string
	order_id?: string
	predicted_ltv?: number
	num_items?: number
	search_string?: string
	status?: string
	item_number?: string
	delivery_category?: string
	custom_properties?: Record<any, any>
}

export enum EventName {
	PageView = 'PageView',
	ViewCategory = 'ViewCategory',
	ViewContent = 'ViewContent',
	AddToCart = 'AddToCart',
	InitiateCheckout = 'InitiateCheckout',
	Purchase = 'Purchase',
	CompleteRegistration = 'CompleteRegistration',
	Lead = 'Lead',
	Contact = 'Contact',
	AbandonedCheckout = 'AbandonedCheckout',
}

/**
 * Framework Abstractions
 */

export abstract class BaseEvent {
	eventId: string = uuid()
	eventName: string = ''
	protected constructor(
		protected userData: UserDataSchema,
		protected customData: CustomDataSchema
	) {}

	getUserData(): UserDataSchema {
		return this.userData
	}
	getCustomData(): CustomDataSchema {
		return this.customData
	}
	abstract validate(): void
	abstract composeUserData(): UserData
	abstract composeCustomData(): CustomData

	buildEvent(): ServerEvent {
		this.validate()
		return new ServerEvent()
			.setEventId(this.eventId)
			.setEventName(this.eventName)
			.setEventTime(Math.floor(new Date().getTime() / 1000))
			.setUserData(this.composeUserData())
			.setCustomData(this.composeCustomData())
			.setActionSource('website')
	}
}

export abstract class MetaStandardEvent extends BaseEvent {
	composeUserData(): UserData {
		return Object.assign(new UserData(), this.userData)
	}

	composeCustomData(): CustomData {
		return Object.assign(new CustomData(), this.customData)
	}
}

export abstract class MetaCustomEvent extends BaseEvent {
	composeUserData(): UserData {
		return Object.assign(new UserData(), this.userData)
	}

	composeCustomData(): CustomData {
		const customData = new CustomData()
		for (const key in this.customData) {
			customData.setCustomProperties({ [key]: this.customData[key] })
		}
		return customData
	}
}

export type EventHandler<T extends BaseEvent> = (event: T, metaSdkclient: any) => Promise<any>
export type ErrorHandler<T extends BaseEvent, K extends BaseException> = (
	retryFn: () => Promise<any>,
	event: T,
	error: K
) => void

export abstract class BaseBus {
	protected constructor(
		protected metaPixelAccessToken: string,
		protected pixelId: string,
		protected testEventCode?: string
	) {}

	abstract register<T extends BaseEvent>(eventClass: new () => T, handler: EventHandler<T>): void
	abstract registerErrorHandler<T extends BaseEvent, K extends BaseException>(
		errorClass: new () => K,
		errHandler: ErrorHandler<T, K>
	): void
	abstract handle(event: BaseEvent): Promise<any>
	abstract handleErrors(error: BaseException): void
}
