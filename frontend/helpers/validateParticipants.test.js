import {validParticipants} from './validateParticipants'
import {participants} from './testFixtures'

describe("validateParticipants", () => {
    it("should return false if a participant email is empty", () => {
        let copy = JSON.parse(JSON.stringify(participants))
        copy[0].email = ""
        const {valid, message} = validParticipants(copy)
        expect(valid).toBe(false)
        expect(message).toBe("Oops! Someone's email is empty. Try again")
    })
    it("should return false if participants length is less than three", () => {
        let copy = JSON.parse(JSON.stringify(participants))
        const {valid, message} = validParticipants(copy.slice(0,2))
        expect(valid).toBe(false)
        expect(message).toBe("Oops! You need at least 3 participants. Try again")
    })
    it("should return false if a participant email is invalid", () => {
        let copy = JSON.parse(JSON.stringify(participants))
        copy[0].email = "test"
        const {valid, message} = validParticipants(copy)
        expect(valid).toBe(false)
        expect(message).toBe("Oops! Someone's email is not valid. Try again")
    })
    it("should return false if a participant email is not unique", () => {
        let copy = JSON.parse(JSON.stringify(participants))
        copy[1].email = copy[0].email
        const {valid, message} = validParticipants(copy)
        expect(valid).toBe(false)
        expect(message).toBe("Oops! Someone's email is duplicated. Try again")
    })
    it("should return true if participants length is greater than three", () => {
        const {valid, message} = validParticipants(participants)
        expect(valid).toBe(true)
        expect(message).toBe("")
    })
    it("should return true if participants length is three", () => {
        let copy = JSON.parse(JSON.stringify(participants))
        const {valid, message} = validParticipants(copy.slice(1))
        expect(valid).toBe(true)
        expect(message).toBe("")
    })
})