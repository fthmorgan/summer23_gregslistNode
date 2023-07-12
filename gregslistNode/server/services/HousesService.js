import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
  async updateHouse(houseId, userId, houseData) {
    const originalHouse = await this.getHouseById(houseId)

    if (originalHouse.creatorId.toString() != userId) {
      throw new Forbidden(`You are not the owner of the house.`)
    }

    originalHouse.bathrooms = houseData.bathrooms || originalHouse.bathrooms
    originalHouse.bedrooms = houseData.bedrooms || originalHouse.bedrooms
    originalHouse.description = houseData.description || originalHouse.description
    originalHouse.imgUrl = houseData.imgUrl || originalHouse.imgUrl

    await originalHouse.save()

    return originalHouse
  }
  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)

    if (!house) {
      throw new BadRequest(`No house found with this id: ${houseId}`)
    }

    return house
  }
  async removeHouse(houseId, userId) {
    const houseToDelete = await this.getHouseById(houseId)

    if (houseToDelete.creatorId.toString() != userId) {
      throw new Forbidden(`You are not the owner of the house`)
    }
    await houseToDelete.remove()
  }
  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)

    return house
  }
  async getHouses() {
    const houses = await dbContext.Houses.find()

    return houses
  }

}

export const housesService = new HousesService()