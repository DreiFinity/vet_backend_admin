// application/use-cases/user/GetPetOwnersUseCase.js
export default class GetPetOwnersUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    return await this.userRepository.getPetOwners();
  }
}
