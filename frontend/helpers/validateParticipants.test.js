import {validParticipants} from './validateParticipants'
import {participants} from './testFixtures'
describe("validateParticipants", () => {
    it("should return false if a participant email is empty", () => {
        let copy = JSON.parse(JSON.stringify(participants))
        copy[0].email = ""
        const result = validParticipants(copy)
        expect(result).toBe(false)
    })
    it("should return false if participants length is less than three", () => {
        let copy = JSON.parse(JSON.stringify(participants))
        const result = validParticipants(copy.slice(0,2))
        expect(result).toBe(false)
    })
    it("should return true if participants length is greater than three", () => {
        const result = validParticipants(participants)
        expect(result).toBe(true)
    })
    it("should return true if participants length is three", () => {
        let copy = JSON.parse(JSON.stringify(participants))
        const result = validParticipants(copy.slice(1))
        expect(result).toBe(true)
    })
})