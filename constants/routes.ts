export interface NavRoute {
  id: string;
  href: string;
  text: string;
}

export const navRoutes: NavRoute[] = [
  {
    id: 'property_delete',
    href: 'property-delete',
    text: 'propertyDelete',
  },
  {
    id: 'new_property',
    href: 'new-property',
    text: 'newProperty',
  },
  {
    id: 'statistics_new_properties',
    href: 'statistics-new-properties',
    text: 'statisticsNewProperties',
  },
  {
    id: 'statistics_existing_properties',
    href: 'statistics-existing-properties',
    text: 'statisticsExistingProperties',
  },
  {
    id: 'migration_error',
    href: 'migration_error',
    text: 'migrationError',
  },
  {
    id: 'search',
    href: 'search',
    text: 'search',
  },
];
