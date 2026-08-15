import React from 'react';
import OrganizerLayout from '../components/organizer/OrganizerLayout';
import OrganizerDashboard from './organizer/OrganizerDashboard';

export const Organizer = () => {
  return (
    <OrganizerLayout>
      <OrganizerDashboard />
    </OrganizerLayout>
  );
};

export default Organizer;
