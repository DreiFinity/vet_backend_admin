export default async function GetDashboardStats(
  clientRepository,
  userRepository
) {
  const petOwners = await clientRepository.countClients();
  const clinics = await userRepository.countClinics();

  return { petOwners, clinics };
}
