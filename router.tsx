import { type RouteObject, createBrowserRouter, redirect, Outlet } from 'react-router-dom';

import { PageNotFound } from '@/pages/404';
import { ConsumptionUnitDetailsPage } from '@/pages/ConsumptionUnitDetails';
import { EnrichNewPropertyPage } from '@/pages/EnrichNewProperty';
import { MigrationErrorPage } from '@/pages/MigrationError';
import { NewPropertyPage } from '@/pages/NewProperty';
import { PropertyDeletePage } from '@/pages/PropertyDelete';
import { SearchPage } from '@/pages/Search';
import { StatisticsExistingPropertiesPage } from '@/pages/StatisticsExistingProperties';
import { StatisticsNewPropertiesPage } from '@/pages/StatisticsNewProperties';

import { HeaderLayout } from '@/components/HeaderLayout';

export const routes: RouteObject[] = [
  {
    id: 'root',
    Component: HeaderLayout,
    ErrorBoundary: PageNotFound,
    children: [
      {
        id: '/',
        path: '/',
        element: <Outlet />,
        loader: (): Response => {
          return redirect('new-property');
        },
      },
      {
        id: 'property_delete',
        path: 'property-delete',
        Component: PropertyDeletePage,
      },
      {
        id: 'new_property',
        path: 'new-property',
        children: [
          {
            index: true,
            id: 'new_property_root',
            Component: NewPropertyPage,
          },
          {
            id: 'enrich_new_property',
            path: ':propertyId',
            children: [
              {
                index: true,
                id: 'enrich_new_property_root',
                Component: EnrichNewPropertyPage,
              },
              {
                id: 'consumption_unit_details',
                path: ':consumptionUnitId',
                Component: ConsumptionUnitDetailsPage,
              },
            ],
          },
        ],
      },
      {
        id: 'statistics_new_properties',
        path: 'statistics-new-properties',
        Component: StatisticsNewPropertiesPage,
      },
      {
        id: 'statistics_existing_properties',
        path: 'statistics-existing-properties',
        Component: StatisticsExistingPropertiesPage,
      },
      {
        id: 'search',
        path: 'search',
        Component: SearchPage,
      },
      {
        id: 'migration_error',
        path: 'migration_error',
        Component: MigrationErrorPage,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
