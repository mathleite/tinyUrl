export default class HealthCheck {
    async respond(): Promise<object> {
        return {
            status: 'OK',
            timestamp: new Date().getTime()
        }
    }
}