//The class for controlling the state of substances & objects
export class Ingredient {
    constructor(record, instance) {
        this.temperature = record.temperature
        this.ph = record.ph
        this.mass = record.mass
        this.volume = record.volume
        this.density = record.density
        this.time = 0
    }

    advanceTime = (seconds) => {
        this.time += seconds
    }

    stateOfMatter = () => {
        if(this.temperature < this.record.low_temp_point) {
            return 'solid'
        } else if (this.temperature > this.record.low_temp_point && this.temperature < this.record.high_temp_point) {
            return 'liquid'
        } else {
            return 'gas'
        }
    }

}