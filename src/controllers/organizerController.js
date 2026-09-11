import { useOrganizer } from "../models/contexts/useOrganizer";
import { useAuthController } from "./authController";

/**
 * Controller: organizer profile flows.
 * Orchestrates organizer state (model) and auth (model).
 * Views only call these functions — they never mutate state directly.
 */
export function useOrganizerController() {
  const { organizer, setOrganizer, showToast } = useOrganizer();
  const { logout: authLogout } = useAuthController();

  /** Merge the freshly registered account into the organizer profile. */
  const registerOrganizer = (accountData) => {
    const newOrg = {
      ...organizer,
      ...accountData,
      organizationName: accountData.organizationName || organizer.organizationName || 'New Organization',
      organizationType: accountData.organizationType || organizer.organizationType || 'Organization',
      contactPerson: accountData.contactPerson || organizer.contactPerson || 'Contact Person',
      name: accountData.contactPerson || organizer.name || 'Organizer',
      phone: accountData.phone || '',
      email: accountData.email || '',
      website: accountData.website || '',
      description: accountData.description || '',
      verified: true
    };
    setOrganizer(newOrg);
    showToast('Organizer application submitted and account created!');
  };

  /** Merge the signed-in organizer's profile data into local state. */
  const loginOrganizer = (organizerData) => {
    if (organizerData) {
      const updatedOrg = {
        ...organizer,
        ...organizerData,
        name: organizerData.contactPerson || organizerData.name || organizer.name
      };
      setOrganizer(updatedOrg);
    }
    showToast('Signed in successfully!');
  };

  /** Sign out of auth and show the toast. */
  const logoutOrganizer = async () => {
    await authLogout();
    showToast('Signed out.', 'info');
  };

  /** Persist the organization profile form. */
  const updateOrganizationProfile = (updatedProfile) => {
    setOrganizer(prev => ({ ...prev, ...updatedProfile }));
    showToast('Organization profile saved successfully!');
  };

  return { registerOrganizer, loginOrganizer, logoutOrganizer, updateOrganizationProfile };
}