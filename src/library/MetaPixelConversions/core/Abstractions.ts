import { CustomData, UserData, ServerEvent } from "facebook-nodejs-business-sdk";
import { v4 as uuid } from "uuid";

/**
 * Standard Events
 */

type ContentSchema = {
  id?: string;
  quantity?: number;
  item_price?: number;
  title?: string;
  description?: string;
  category?: string;
  brand?: string;
  delivery_category?: string;
};

export interface UserDataSchema {
  emails?: string[];
  phones?: string[];
  genders?: string[];
  first_names?: string[];
  last_names?: string[];
  dates_of_birth?: string[];
  cities?: string[];
  states?: string[];
  zips?: string[];
  countries?: string[];
  external_ids?: string[];
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string;
  fbp?: string;
  subscription_id?: string;
  fb_login_id?: string;
  lead_id?: string;
  f5first?: string;
  f5last?: string;
  fi?: string;
  dobd?: string;
  dobm?: string;
  doby?: string;
  madid?: string;
  anon_id?: string;
  app_user_id?: string;
}

export interface CustomDataSchema {
  [key: string]: any;
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  contents?: ContentSchema[];
  content_type?: string;
  order_id?: string;
  predicted_ltv?: number;
  num_items?: number;
  search_string?: string;
  status?: string;
  item_number?: string;
  delivery_category?: string;
  custom_properties?: Record<any, any>;
}

export enum EventName {
  PageView = "PageView",
  ViewCategory = "ViewCategory",
  ViewContent = "ViewContent",
  AddToCart = "AddToCart",
  InitiateCheckout = "InitiateCheckout",
  Purchase = "Purchase",
  CompleteRegistration = "CompleteRegistration",
  Lead = "Lead",
  Contact = "Contact",
  AbandonedCheckout = "AbandonedCheckout",
}
// Parameters to improve the rate of deduplication:
// - Event ID is not selected
// Parameters to improve event matching:
// - Phone number is not selected
// - Email address is not selected
// - IP address is not selected

export abstract class BaseEvent {
  protected eventName: string;
  protected constructor(protected userData: UserDataSchema, protected customData: CustomDataSchema) {}

  abstract validate(): void;
  abstract composeUserData(): UserData;
  abstract composeCustomData(): CustomData;

  buildEvent(): ServerEvent {
    this.validate();
    return new ServerEvent()
      .setEventId(uuid())
      .setEventName(this.eventName)
      .setEventTime(Math.floor(new Date().getTime() / 1000))
      .setUserData(this.composeUserData())
      .setCustomData(this.composeCustomData())
      .setActionSource("website");
  }
}

export abstract class MetaStandardEvent extends BaseEvent {
  composeUserData(): UserData {
    return Object.assign(new UserData(), this.userData);
  }

  composeCustomData(): CustomData {
    return Object.assign(new CustomData(), this.customData);
  }
}

export abstract class MetaCustomEvent extends BaseEvent {
  composeUserData(): UserData {
    return Object.assign(new UserData(), this.userData);
  }

  composeCustomData(): CustomData {
    const customData = new CustomData();
    for (const key in this.customData) {
      customData.setCustomProperties({ [key]: this.customData[key] });
    }
    return customData;
  }
}

/**
 * Handler & Bus abstractions
 */
export abstract class BaseHandler {
  protected client: any;
  protected constructor(client: any) {
    this.client = client;
  }
  abstract handle(event: BaseEvent): Promise<any>;
}

export interface BaseBus {
  register(eventName: string, handler: new (client: any) => BaseHandler): void;
  handle(event: BaseEvent): void;
}

/**
 * Cosas a considerar al implementar las abstracciones:
 * - Como debemos crear el evento para que sea manejable?
 * - Que pasa si el formulario falla al enviar el submit, no debemos enviar el evento?
 * - Como vamos a interactuar con el ORM?
 * - Como vamos a integrar el SDK en el bus/handlers?
 * - Que planes de contingencia manejaremos cuando falle el envio del evento?
 *
 * Features en ADMIN:
 * - Crear eventos y activarlos/deactivarlos
 * - Crear custom events
 * - Definicion de modelos y tablas para standard events y custom events
 *
 * Flow:
 * - Importar el hook de eventos
 * - Crear un evento con los datos del formulario
 * - Si el submit del form es correcto, enviar el evento
 * - El evento es manejado por el bus y obtenemos el evento de la BD para ver si esta activo (a travez de un ID o el nombre del evento)
 * - Si esta activo, se envia el evento al SDK
 */
