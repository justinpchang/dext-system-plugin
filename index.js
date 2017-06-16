// Power Icon by Freepik <http://www.flaticon.com/free-icon/power_148774>
// Charging Icon by Freepik <http://www.flaticon.com/free-icon/battery_149245>
// Battery Icon by Freepik <http://www.flaticon.com/free-icon/battery_149253>

const osxInfo = require('osx-info');
const osxBattery = require('osx-battery');

module.exports = {
    query: q => new Promise((resolve) => {
        let items = [];
        if(q === 'system') {
            osxInfo().then(data => {
                items = [
                    {
                        title: data.name,
                        subtitle: 'Name',
                        icon: {
                            path: './power.png'
                        }
                    },
                    {
                        title: data.identifier,
                        subtitle: 'Identifier',
                        icon: {
                            path: './power.png'
                        }
                    },
                    {
                        title: data.core + ' (' + data.core + ')',
                        subtitle: 'Core (Speed)',
                        icon: {
                            path: './power.png'
                        }
                    },
                    {
                        title: data.memory,
                        subtitle: 'Memory',
                        icon: {
                            path: './power.png'
                        }
                    },
                    {
                        title: data.rom,
                        subtitle: 'ROM',
                        icon: {
                            path: './power.png'
                        }
                    },
                    {
                        title: data.smc,
                        subtitle: 'SMC',
                        icon: {
                            path: './power.png'
                        }
                    },
                    {
                        title: data.sn,
                        subtitle: 'SN',
                        icon: {
                            path: './power.png'
                        }
                    },
                    {
                        title: data.uuid,
                        subtitle: 'UUID',
                        icon: {
                            path: './power.png'
                        }
                    }
                ];
                resolve({ items });
            })
            .catch(() => resolve({ items }));
        } else if(q === 'battery') {
            osxBattery().then(data => {
                var batteryIcon = data.externalConnected ? './batteryCharging.png' : './battery.png';
                var hours = Math.floor(data.timeRemaining/60);
                var time = (data.timeRemaining>60)
                    ? (hours + 'h ' + (data.timeRemaining-hours*60)%60 +'m')
                    : (data.timeRemaining + 'm');
                items = [
                    {
                        title: time,
                        subtitle: 'Time until ' + (data.externalConnected?'full':'empty'),
                        icon: {
                            path: batteryIcon
                        }
                    },
                    {
                        title: (data.currentCapacity/data.maxCapacity*100).toFixed(2) + '%',
                        subtitle: 'Charge ratio',
                        icon: {
                            path: './icon.png'
                        }
                    },
                    {
                        title: data.temperature/100 + ' °C',
                        subtitle: 'Temperature',
                        icon: {
                            path: './icon.png'
                        }
                    },
                    {
                        title: (data.maxCapacity/data.designCapacity*100).toFixed(2) + '%',
                        subtitle: 'Wear ratio',
                        icon: {
                            path: './icon.png'
                        }
                    }
                ];
                resolve({ items });
            })
            .catch(() => resolve({ items }));
        } else {
            resolve({ items });
        }
    })
};
