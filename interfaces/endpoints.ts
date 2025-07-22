type MigrationStatus =
  | 10
  | 20
  | 30
  | 31
  | 200
  | 300
  | 401
  | 402
  | 403
  | 411
  | 421
  | 430
  | 900
  | 950;

export interface PropertyDelete {
  id: string;
  propertyNumber?: string;
  externalCode?: string;
  address?: string;
  partnerCode?: string;
  startDate?: string;
  migrationStatus: MigrationStatus;
}

export interface NewProperty {
  id: string;
  propertyNumber?: string;
  address?: string;
  importDate: string;
}

export interface Property {
  id: string;
  propertyNumber?: string;
  externalCode?: string;
  postCode?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  partnerCode?: string;
  startDate?: string;
  migrationStatus: MigrationStatus;
}

export interface StatisticsProperty {
  id: string;
  propertyNumber?: string;
  externalCode?: string;
  postCode?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  partnerCode?: string;
  activeDevicesCount: number;
  receivedConsumptionsPercentage: number;
  lastConsumptionReceivedDate?: string;
  startDate?: string;
  migrationStatus: MigrationStatus;
}

export interface ConsumptionUnit {
  id: string;
  name?: string;
  consumptionUnitNumber?: string;
  propertyNumber?: string;
  area: number;
  street?: string;
  houseNumber?: string;
  block?: string;
  staircase?: string;
  floor?: string;
  door?: string;
  isMainMeter: boolean;
  migrationStatus: MigrationStatus;
  property: Property;
}

interface DeliveryAddress {
  city?: string;
  street?: string;
  postCode?: string;
  houseNumber?: string;
  staircase?: string;
  floor?: string;
  door?: string;
}

export interface Tenant {
  id: string;
  consumptionUnitId: string;
  tenantName?: string;
  moveInDate: string;
  moveOutDate?: string;
  deliveryAddress?: DeliveryAddress;
  migrationStatus: MigrationStatus;
  propertyNumber?: string;
}

export interface ConsumptionUnitWithTenant extends ConsumptionUnit {
  city?: string;
  postCode?: string;
  lastConsumptionReceivedDate?: string;
  devicePositionUUIDS?: string[];
  tenant: Tenant | undefined;
}

export interface Device {
  id: string;
  deviceNumber?: string;
  articleNumber?: string;
  deviceSerialNumber?: string;
  devicePositionUUID: string;
  consumptionUnitId: string;
  active: boolean;
  migrationStatus: MigrationStatus;
  propertyNumber?: string;
}

export interface DeviceConsumption {
  id: string;
  devicePositionUUID: string;
  date: string;
  isExtrapolated: boolean;
  heatingDegreeDays: number;
  hgtPercentage: number;
  extrapolationFailureCause?: number;
  hgtAdjusted: number;
  updateState: number;
  lastValue: number;
  createDate: string;
  monthlyConsumption: number;
  actionIndex: number;
}

export interface Partner {
  name?: string;
  street?: string;
  postCode?: string;
  city?: string;
  partnerCode?: string;
  migrationStatus: MigrationStatus;
}

export interface EnrichNewProperty {
  id: string;
  propertyNumber?: string;
  externalCode?: string;
  postCode?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  contractNumber?: string;
  partnerCode?: string;
  startDate?: string | null;
  migrationStatus: MigrationStatus;
  istaSpecialistId: string;
  partner: Partner;
  mainMeters?: Device[];
  consumptionUnits?: ConsumptionUnit[];
  dueDateDay: number;
  dueDateMonth: number;
  gpsLatitude?: number | undefined | null;
  gpsLongitude?: number | undefined | null;
}

export interface SavePropertyMutationProps {
  propertyId: string;
  city?: string | undefined;
  street?: string | undefined;
  postCode?: string | undefined;
  houseNumber?: string | undefined;
  contractNumber: string | undefined;
  startDate: string | undefined | null;
  endDate: string | null;
  dueDateDay: number;
  dueDateMonth: number;
  gpsLatitude: number;
  gpsLongitude: number;
}

export interface SaveTenantDeliveryAddressProps {
  consumptionUnitId: string;
  tenantId: string;
  city?: string | undefined;
  street?: string | undefined;
  postCode?: string | undefined;
  houseNumber?: string | undefined;
  staircase?: string | undefined;
  floor?: string | undefined;
  door?: string | undefined;
}
