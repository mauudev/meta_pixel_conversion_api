/**
 * Standard Events
 */

type Availability =
  | "available_soon"
  | "for_rent"
  | "for_sale"
  | "off_market"
  | "recently_sold"
  | "sale_pending";

type BodyStyle =
  | "CONVERTIBLE"
  | "COUPE"
  | "HATCHBACK"
  | "MINIVAN"
  | "TRUCK"
  | "SUV"
  | "SEDAN"
  | "VAN"
  | "WAGON"
  | "CROSSOVER"
  | "OTHER";

type ContentType = "product" | "product_group";
type DeliveryCategory = "curbside" | "in_store" | "home_delivery";
type ActionSource =
  | "website"
  | "app"
  | "chat"
  | "email"
  | "phone_call"
  | "physical_store"
  | "system_generated"
  | "business_messaging"
  | "other";

type UserData = {
  email?: string | string[]; // -> em | hash required
  phone?: string | string[]; // -> ph | hash required
  first_name?: string | string[]; // -> fn | hash required
  last_name?: string | string[]; // -> ln | hash required
  date_of_birth?: string | string[]; // -> db | hash required
  gender?: string | string[]; // -> ge | hash required
  city?: string | string[]; // -> ct | hash required
  state?: string | string[]; // -> st | hash required
  zip?: string | string[]; // -> zp | hash required
  country?: string | string[]; // -> country | hash required
  external_id?: string | string[]; // -> external_id | hash recomended
  client_ip_address?: string; // -> client_ip_address | hash NOT required
  client_user_agent?: string; // -> client_user_agent | hash NOT required
  fbp?: string; // -> fbp | hash NOT required
  fbc?: string; // -> fbc | hash NOT required
  subscription_id?: string; // -> subscription_id | hash NOT required
  fb_login_id?: string; // -> fb_login_id | hash NOT required
  lead_id?: string; // -> lead_id | hash NOT required
  anon_id?: string; // -> anon_id | hash NOT required
  madid?: string; // -> madid | hash NOT required
  page_id?: string; // -> page_id | hash NOT required
  page_scoped_user_id?: string; // -> page_scoped_user_id | hash NOT required
  ctwa_clid?: string; // -> ctwa_clid | hash NOT required
  ig_account_id?: string; // -> ig_account_id | hash NOT required
  ig_sid?: string; // -> ig_sid | hash NOT required
};

type ContentProduct = {
  id: string;
  quantity?: number;
  item_price?: number;
  delivery_category?: string;
};

type CustomData = {
  availability?: Availability;
  body_style?: BodyStyle;
  checkin_date?: Date | string;
  city?: string;
  condition_of_vehicle?: string;
  content_category?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: ContentType;
  contents?: ContentProduct[];
  country?: string;
  currency?: string;
  delivery_category?: DeliveryCategory;
  num_items?: number;
  price?: number;
  value?: number;
  region?: string;
  status?: number;
};

type ServerEvent = {
  event_id?: string;
  event_name: string;
  event_time: number;
  event_source_url?: string;
  user_data?: UserData;
  custom_data?: CustomData;
  opt_out?: boolean;
  action_source?: ActionSource;
  referrer_url?: string;
};

type ConversionsEvent = {
  data: ServerEvent[];
  test_event_code?: string;
};

// Parameters to improve the rate of deduplication:
// - Event ID is not selected
// Parameters to improve event matching:
// - Phone number is not selected
// - Email address is not selected
// - IP address is not selected

export abstract class BaseEvent implements ConversionsEvent {
  data: ServerEvent[];
  event_name: string;
  event_time: number;
  user_data: UserData;

  abstract parseDataForConversions(): object;
  abstract toObject(): object;
}

/**
 * Handler & Bus abstractions
 */
export abstract class BaseHandler {
  abstract handle(event: BaseEvent): void;
}

export abstract class BaseBus {
  abstract register(handler: BaseHandler, event: BaseEvent): void;
  abstract handle(): void;
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
