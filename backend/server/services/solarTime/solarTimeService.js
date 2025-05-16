const Timer = require('../../solarTime/time.js');

class SolarTimeService {
    constructor() {
        const date = new Date();
        const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        this.timer = new Timer(currentDate);
    }

    async initializeSolarPhases(lat, lon) {
        try {
            const response = await this.timer.getTimes(lat, lon);
            const phases = response.data.results[0];
            const cronStrings = this.timer.formatTimePhases(phases);
            this.timer.setCromJobTimes(cronStrings);
            return phases;
        } catch (error) {
            console.error('Error initializing solar phases:', error);
            this.timer.setCromJobTimes([]);
            throw error;
        }
    }

    setupPhaseJobs(io, socketId) {
        const jobCallback = (phaseInfo) => {
            console.log('Phase change:', phaseInfo);
            io.to(socketId).emit('phase_change', phaseInfo);
        };

        try {
            const cronTimes = this.timer.getCronJobTimes();
            this.timer.createNamedSolarCronJobs(cronTimes, jobCallback);
        } catch (error) {
            console.error('Error setting up phase jobs:', error);
            throw error;
        }
    }
}

module.exports = SolarTimeService; 