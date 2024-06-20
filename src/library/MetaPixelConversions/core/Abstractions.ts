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

// Parameters to improve the rate of deduplication:
// - Event ID is not selected
// Parameters to improve event matching:
// - Phone number is not selected
// - Email address is not selected
// - IP address is not selected

export enum EventType {
  Standard = "standard",
  Custom = "custom",
}

export abstract class BaseEvent {
  public eventType: EventType = EventType.Standard;

  protected get getUserData(): UserDataSchema {
    return this.userData;
  }
  protected set setUserData(value: UserDataSchema) {
    this.userData = value;
  }
  protected get getCustomData(): CustomDataSchema {
    return this.customData;
  }
  protected set setCustomData(value: CustomDataSchema) {
    this.customData = value;
  }
  protected constructor(protected userData?: UserDataSchema, protected customData?: CustomDataSchema) {}
  abstract buildEvent(): any;
  abstract isValid(): boolean;
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
