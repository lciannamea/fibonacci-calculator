class Calculation {
    timestamp: number;
    position: string;
    result: string;

    constructor(timestamp: number, position: string, result: string) {
        this.timestamp = timestamp;
        this.position = position;
        this.result = result;
    }
}