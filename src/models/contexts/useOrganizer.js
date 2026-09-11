import { useContext } from 'react';
import { OrganizerContext } from './contexts';

/** Model accessor: read organizer state. Mutations go through controllers/. */
export const useOrganizer = () => {
  const context = useContext(OrganizerContext);
  if (!context) {
    throw new Error('useOrganizer must be used within an OrganizerProvider');
  }
  return context;
};