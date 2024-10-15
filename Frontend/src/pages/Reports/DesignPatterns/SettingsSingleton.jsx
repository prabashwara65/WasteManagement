// SettingsSingleton.jsx
class SettingsSingleton {
    constructor() {
        if (!SettingsSingleton.instance) {
            // Default settings
            this.settings = {
                reportFormat: 'PDF', // Default format
            };
            SettingsSingleton.instance = this;
        }
        return SettingsSingleton.instance;
    }

    // Static method to get settings
    static getSettings() {
        if (!SettingsSingleton.instance) {
            new SettingsSingleton(); // Ensure instance is created
        }
        return SettingsSingleton.instance.settings;
    }

    // Static method to set settings
    static setSettings(newSettings) {
        if (!SettingsSingleton.instance) {
            new SettingsSingleton(); // Ensure instance is created
        }
        Object.assign(SettingsSingleton.instance.settings, newSettings);
    }
}

// Export the single instance of the class
const instance = new SettingsSingleton();
export default instance;
